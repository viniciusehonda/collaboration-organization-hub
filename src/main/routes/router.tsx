import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import { makeLogin as Login } from '../factories/pages/login-factory'
import { makeSignup as Signup } from '../factories/pages/signup-factory'
import { makeHome as Home } from '../factories/pages/home-factory'
import { makeCustomer as Customer } from '../factories/pages/customer-factory'
import { makeCustomerForm as CustomerForm } from '../factories/pages/customer-form-factory'
import { makeTask as Task } from '../factories/pages/task/task-factory'
import { makeTaskForm as TaskForm } from '../factories/pages/task/task-form-factory'
import { makeTaskUpdate as TaskUpdate } from '../factories/pages/task/task-update-factory'
import { makeCustomerUpdate as CustomerUpdate } from '../factories/pages/customer-update-factory'
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
          
          <Route path="task" element={<PrivateRoute>
            <MainPage>
              <Task />
            </MainPage>
          </PrivateRoute>}>
            <Route path="create" element={<TaskForm />}></Route>
            <Route path="Update/:id" element={<TaskUpdate />}></Route>
          </Route>

          <Route path="customer" element={<PrivateRoute>
            <MainPage>
              <Customer />
            </MainPage>
          </PrivateRoute>}>
            <Route path="create" element={<CustomerForm />}></Route>
            <Route path="Update/:id" element={<CustomerUpdate />}></Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  )
}

export default Router