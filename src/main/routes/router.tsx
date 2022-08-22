import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import { makeLogin  as Login } from '../factories/pages/login-factory'

const Router: React.FC = () => {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login"  element={<Login />} />
          {/* <Route path="/signup" exact component={makeSignUp} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
          <PrivateRoute path="/surveys/:id" component={makeSurveyResult} /> */}
        </Routes>
      </BrowserRouter>
  )
}

export default Router