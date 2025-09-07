type WSMessage =
  | { type: "zone-update"; payload: unknown }
  | { type: "admin-update"; payload: unknown }
  | { type: string; payload?: unknown };

type Listener = (data: unknown) => void;

function buildWsUrl(): string {
    return "ws://localhost:3000/api/v1/ws";
  // if you serve your frontend from another host/origin, feel free to hardcode:
  // return "ws://localhost:3000/api/v1/ws";
  if (typeof window === "undefined") return "ws://localhost:3000/api/v1/ws";
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const host = window.location.hostname || "localhost";
  const port =
    window.location.port && window.location.port !== ""
      ? `:${window.location.port}`
      : ":3000"; // fallback for local dev
  return `${protocol}//${host}${port}/api/v1/ws`;
}

class WSService {
   socket: WebSocket | null = null;
   url: string = buildWsUrl();

  // listeners map by event type
   listeners: Map<string, Set<Listener>> = new Map();

  // remember gate subscriptions to re-subscribe after reconnect
   gateSubs: Set<string> = new Set();

  // reconnect handling
   reconnecting = false;
   backoffMs = 500; // start 0.5s
   readonly backoffMax = 8000;

  // heartbeat
   pingTimer: number | null = null;
   readonly pingEveryMs = 25000;

  connect() {
    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    this.socket = new WebSocket(this.url);

    this.socket.addEventListener("open", () => {
      this.reconnecting = false;
      this.backoffMs = 500;
      this.startHeartbeat();
      // re-subscribe to gates after reconnect
      this.gateSubs.forEach((gateId) =>
        this._send({ type: "subscribe", payload: { gateId } })
      );
      this._emit("open", {});
    });

    this.socket.addEventListener("message", (ev) => {
      let data: WSMessage | null = null;
      try {
        data = JSON.parse(ev.data);
      } catch {
        // ignore non-JSON
      }
      if (!data || typeof data.type !== "string") {
        this._emit("message", ev.data);
        return;
      }
      // forward to specific channels
      this._emit(data.type, data.payload);
      // and also generic
      this._emit("message", data);
    });

    this.socket.addEventListener("close", () => {
      this.stopHeartbeat();
      this._emit("close", {});
      this._scheduleReconnect();
    });

    this.socket.addEventListener("error", (err) => {
      this._emit("error", err);
      // allow close handler to manage reconnect
    });
  }

  disconnect() {
    this.stopHeartbeat();
    this.socket?.close();
    this.socket = null;
    this.reconnecting = false;
  }

  on(event: string, handler: Listener) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(handler);
    return () => this.off(event, handler);
  }

  off(event: string, handler: Listener) {
    this.listeners.get(event)?.delete(handler);
  }

   _emit(event: string, payload: any) {
    const set = this.listeners.get(event);
    if (!set) return;
    set.forEach((fn) => {
      try {
        fn(payload);
      } catch (e) {
        console.error(`[WSService] listener error for ${event}`, e);
      }
    });
  }

   _send(obj: any) {
    const sendIt = () => this.socket?.send(JSON.stringify(obj));
    if (this.socket?.readyState === WebSocket.OPEN) {
      sendIt();
    } else {
      setTimeout(() => {
        if (this.socket?.readyState === WebSocket.OPEN) sendIt();
      }, 150);
    }
  }

   _scheduleReconnect() {
    if (this.reconnecting) return;
    this.reconnecting = true;
    setTimeout(() => {
      this.connect();
      this.backoffMs = Math.min(this.backoffMs * 2, this.backoffMax);
    }, this.backoffMs);
  }

   startHeartbeat() {
    this.stopHeartbeat();
    // send a lightweight ping frame (server ignores unknown types harmlessly)
    this.pingTimer = window.setInterval(() => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        try {
          this.socket.send(JSON.stringify({ type: "ping", t: Date.now() }));
        } catch {}
      }
    }, this.pingEveryMs) as unknown as number;
  }

   stopHeartbeat() {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }
}

export const ws = new WSService();
