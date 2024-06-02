import React from "react";
import Layoutt from "../../components/Layout/Layoutt";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import "../Admin/AdminDashboard.css"
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <div className="allPage">

    <Layoutt title={"Dashboard - The Beauty Store"}>
 
       <div className="container-flui m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card admincard w-75 p-4">
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div> 
    </Layoutt>
    </div>

  );
};

export default Dashboard;