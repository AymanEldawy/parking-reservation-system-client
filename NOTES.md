# Project Summary: Tasks and Challenges

## Tasks

- Create distinct layouts for `admin` and `employee` roles.
- Set up protected routes for `admin` and `employee` layouts, redirecting unauthorized users to the public website.
- Build the `login` page and its backend service.
- Design the gates page.
- Create views for `subscribers` and `visitors`.
- Develop dashboards for `admin` and `employee` roles.
- Implement live zone status and ticket management features.
- Build workflows for subscription and visitor parking.
- Add `real-time` updates using WebSocket.
- Ensure layouts are responsive.
- Add `error handling` and `user feedback` mechanisms.
- Implement access guards for `admin` and `user` roles.
- write `unit testing` for login page and employee control

## Challenges and Notes

- UI/Flow: Lack of a UI makes it hard to grasp the business flow.
- WebSocket Issues: Tried using socket.io, but it failed due to protocol mismatches with ws.
- WebSocket Subscription: Zone data and subscriptions rely on gateId. Added screens to list gates and select a gateId before navigating to the zone screen.
- No User APIs: No APIs for user creation or retrieval, so used a fake store for the employee page.
- Admin Update Subscription: Initial failure to subscribe to admin-update due to gateId dependency. Fixed by using a static gateId.
