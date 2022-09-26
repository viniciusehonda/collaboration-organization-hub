import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import { makeLogin as Login } from '../factories/pages/login-factory'
import { makeSignup as Signup } from '../factories/pages/signup-factory'
import { makeHome as Home } from '../factories/pages/home-factory'
import PrivateRoute from '../proxies/privateRoute'

const Router: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute>
          <Home />
        </PrivateRoute>}>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router