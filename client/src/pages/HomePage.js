import React from 'react'

import Layoutt from '../components/Layout/Layoutt'
import { useAuth } from '../context/auth'

const HomePage = () => {
  const [auth, setAuth] = useAuth()
  return (
    <Layoutt title={"Best Offers - BeautyStore"}>
      <h1>Homepage</h1>
        <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layoutt>
  )
}

export default HomePage
