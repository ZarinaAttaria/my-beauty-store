import React from 'react';
import Layoutt from '../../components/Layout/Layoutt';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <div className='all'>

    <Layoutt>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card admincard w-75 p-4">
              <h3>Admin Name: {auth?.user?.name}</h3>
              <h3>Admin Email: {auth?.user?.email}</h3>
              <h3>Admin Contact: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layoutt>
    </div>

  );
}

export default AdminDashboard;
