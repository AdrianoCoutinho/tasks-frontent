import { Navigate, Route, Routes } from "react-router-dom";
import Tasks from "../pages/tasks/Tasks";

// export const AuthAppRoutes = () => {
//   return (
//     <Routes>
//       {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// };

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
      {/* <Route path="/users" element={<Users />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/financial" element={<Financial />} />
      <Route path="/affiliates" element={<Affiliates />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/white-label" element={<WhiteLabel />} /> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
