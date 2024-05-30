import React from 'react'
import Layoutt from '../../components/Layout/Layoutt'
import AdminMenu from '../../components/Layout/AdminMenu'

const Users = () => {
  return (
    
    <Layoutt title={"Dashboard - All Users"}>
   <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
          </div>
        </div>
      </div>

    </Layoutt>
    
  )
}

export default Users
