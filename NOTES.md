# Project Summary: Tasks and Challenges

## Tasks
- Structure files & setup required libraries
- Create distinct layouts for `admin` and `employee` roles.
- Set up protected routes for `admin` and `employee` layouts, redirecting unauthorized users to the public website.
- Build the `login` page and its API service.
- Build the `gates` page as starter page.
- Create views for `subscribers` and `visitors`.
- Build workflows for `subscription` and `visitor` parking.
- Design printable modal for `ticket`
- Build `checkpoint` screen and protect it
- Develop dashboards for `admin`.
- Implement live logs feature for control panel.
- Ensure layouts are responsive.
- Implement Caching and Data fetching using `React Query`.
- Implement access guards for `admin` and `user` roles.
- Implement Zustand stores for `Auth`, `Zone`, and `User` states.
- Add `real-time` updates using `WebSocket`.
- Add `Error handling` and `user feedback` mechanisms.
- Write `Unit testing` for login page and employee control

## Challenges and Notes

- UI/Flow: Lack of a UI makes it hard to grasp the business flow.
- WebSocket Issues: Tried using socket.io, but it failed due to protocol mismatches with ws.
- WebSocket Subscription: Zone data and subscriptions rely on gateId. Added screens to list gates and select a gateId before navigating to the zone screen.
- No User APIs: No APIs for user creation or retrieval, so used a fake store for the employee page.
- Admin Update Subscription: Initial failure to subscribe to admin-update due to gateId dependency. Fixed by using a static gateId.
