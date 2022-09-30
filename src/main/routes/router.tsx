import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import { makeLogin as Login } from '../factories/pages/login-factory'
import { makeSignup as Signup } from '../factories/pages/signup-factory'
import { makeHome as Home } from '../factories/pages/home-factory'
import { makeCustomer as Customer } from '../factories/pages/customer-factory'
import { makeSidebar as Sidebar } from '@/main/factories/pages/sidebar-factory'
import PrivateRoute from '../proxies/privateRoute'
import { MainLayout } from '@/presentation/components/mainLayout/mainLayout'
import { MainPage } from '@/presentation/components/mainLayout/mainPage'

const Router: React.FC = () => {

  return (
    <MainLayout>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<PrivateRoute>
            <MainPage>
              <Home />
            </MainPage>
          </PrivateRoute>}>
          </Route>

          <Route path="/customer" element={<PrivateRoute>
            <MainPage>
              <Customer />
            </MainPage>
          </PrivateRoute>}>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  )
}

export default Router