import { Outlet, NavLink } from 'react-router';

const Dashboard = () => {

  return (
    <div className="drawer lg:drawer-open drawer-open-top">
      <input type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-200 text-base-content min-h-full">

          <li>
            <NavLink
              to="/dashboard/my-marathons"
              className={({ isActive }) =>
                isActive ? 'text-indigo-500 font-bold' : ''
              }
            >
              My Marathon List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-marathon"
              className={({ isActive }) =>
                isActive ? 'text-indigo-500 font-bold' : ''
              }
            >
              Add Marathon
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/my-applications"
              className={({ isActive }) =>
                isActive ? 'text-indigo-500 font-bold' : ''
              }
            >
              My Apply List
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
