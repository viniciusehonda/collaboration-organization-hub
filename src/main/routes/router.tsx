import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import { makeLogin as Login } from '../factories/pages/login-factory'
import { makeHome as Home } from '../factories/pages/home-factory'
import PrivateRoute from '../proxies/privateRoute'

const Router: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={<PrivateRoute>
            <Route path="/" element={<Home />} />
          </PrivateRoute>}>
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" exact component={makeSignUp} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
          <PrivateRoute path="/surveys/:id" component={makeSurveyResult} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default Router