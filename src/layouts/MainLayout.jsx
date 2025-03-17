import { Outlet, useLocation } from "react-router";

function MainLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default MainLayout;
