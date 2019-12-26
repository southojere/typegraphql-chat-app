import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Users from '../components/Users'
import Register from './Register/index'
import Login from './Login'
const Routes =  () => {


    return <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Users}></Route>
            <Route exact path='/Register' component={Register}></Route>
            <Route exact path='/Login' component={Login}></Route>
        </Switch>
    </BrowserRouter>
}
export default Routes