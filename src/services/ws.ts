type WSMessage =
  | { type: "zone-update"; payload: unknown }
  | { type: "admin-update"; payload: unknown }
  | { type: string; payload?: unknown };

type Listener = (data: unknown) => void;

class WSService {
  socket: WebSocket | null = null;
  url: string = import.meta.env.VITE_WS_URL || "ws://localhost:3000/api/v1/ws";
  backoffMs = 500;

  listeners: Map<string, Set<Listener>> = new Map();

  gateSubs: Set<string> = new Set();

  reconnecting = false;
  readonly backoffMax = 8000;

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
      this.gateSubs.forEach((gateId) =>
        this._send({ type: "subscribe", payload: { gateId } })
      );
      this._emit("open", {});
    });

    this.socket.addEventListener("message", (ev) => {
      let data: WSMessage | null = null;
      try {
        data = JSON.parse(ev.data);
      } catch {}
      if (!data || typeof data.type !== "string") {
        this._emit("message", ev.data);
        return;
      }

      this._emit(data.type, data.payload);

      this._emit("message", data);
    });

    this.socket.addEventListener("close", () => {
      this.stopHeartbeat();
      this._emit("close", {});
      this._scheduleReconnect();
    });

    this.socket.addEventListener("error", (err) => {
      this._emit("error", err);
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
