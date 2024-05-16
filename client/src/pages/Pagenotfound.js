import React from 'react'

import Layoutt from '../components/Layout/Layoutt'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
  return (
   <Layoutt title={"PageNotFound - BeautyStore"}>
   <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
   </Layoutt>
  )
}

export default Pagenotfound
