import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Users from './Users'
import Register from './Register/index'
import Login from './Login'
import CreateTeam from './CreateTeam'
import Teams from './Teams'
import Layout from '../components/layout'

const Routes =  () => {

    const signedIn = true;

    return <BrowserRouter>
        <Switch>
        <Layout>
            <Route exact path='/' component={Users}></Route>
            <Route exact path='/Register' component={Register}></Route>
            <Route exact path='/Login' component={Login}></Route>
            <Route exact path='/createTeam' component={CreateTeam}></Route>
            <Route exact path='/teams' component={Teams}></Route>
            </Layout>
        </Switch>
    </BrowserRouter>
}
export default Routes