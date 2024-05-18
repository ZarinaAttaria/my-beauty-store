import React from 'react'
import Layoutt from '../../components/Layout/Layoutt'
import AdminMenu from '../../components/Layout/AdminMenu'

const CreateProduct = () => {
  return (
    <Layoutt title={"Dashboard - Create Products"}>
    <div className="container-fluid m-3 p-3">

    <div className='row'>
    <div className="col md-3">
    <AdminMenu/>
    </div>
    <div className="col md-9">
    <h1>Create Products</h1>
    </div>
  </div>
  </div>

    </Layoutt>
   
  )
}

export default CreateProduct
