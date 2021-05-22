import React, { createContext, useState } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'

const MyContext = createContext();
function App() {

  const [loginuser, setLoginUser] = useState("");

  return (
    <>

      <MyContext.Provider value={{ loginuser, setLoginUser }}>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/dashboard" >
            {loginuser === "" ? <Redirect to="/" /> : <Dashboard />}
          </Route>

          <Route exact path="/register" component={Register}></Route>
      
        </Switch>
      </MyContext.Provider>
    </>
  );
}

export default App;
export { MyContext }