import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'

const Router: React.FC = () => {

  return (
      <BrowserRouter>
      <h2>teste</h2>
        <Routes>
          {/* <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignUp} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
          <PrivateRoute path="/surveys/:id" component={makeSurveyResult} /> */}
        </Routes>
      </BrowserRouter>
  )
}

export default Router