import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Users from '../components/Users'
import Register from './Register/index'
const Routes =  () => {


    return <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Users}></Route>
            <Route exact path='/Register' component={Register}></Route>
        </Switch>
    </BrowserRouter>
}
export default Routes