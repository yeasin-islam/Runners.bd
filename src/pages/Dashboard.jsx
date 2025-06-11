import { Outlet, Link } from 'react-router';

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
          <li><Link to="/dashboard/add-marathon">Add Marathon</Link></li>
          <li><Link to="/dashboard/my-marathons">My Marathon List</Link></li>
          <li><Link to="/dashboard/my-applications">My Apply List</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
