import { Helmet } from 'react-helmet-async';
import { Outlet, NavLink } from 'react-router';

const Dashboard = () => {

  return (
    <div className="fontJakarta drawer lg:drawer-open drawer-open-top">
      <Helmet>
        <title>
          Dashboard | RunFlow
        </title>
      </Helmet>
      <input type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col drawer-content">
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label className="drawer-overlay"></label>
        <ul className="min-h-full p-4 menu w-80 bg-base-200 text-base-content">

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
