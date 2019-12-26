import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Users from '../components/Users'
import Register from './Register/index'
import Login from './Login'
import CreateTeam from './CreateTeam'
import Teams from './Teams'
const Routes =  () => {


    return <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Users}></Route>
            <Route exact path='/Register' component={Register}></Route>
            <Route exact path='/Login' component={Login}></Route>
            <Route exact path='/createTeam' component={CreateTeam}></Route>
            <Route exact path='/teams' component={Teams}></Route>
        </Switch>
    </BrowserRouter>
}
export default Routes