import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({childern}) => {
  return (
    <div>
      <Header/>
      <main style={{minHeight:'80vh'}}> {childern} </main>
    <Footer/>
    </div>
  )
}

export default Layout
