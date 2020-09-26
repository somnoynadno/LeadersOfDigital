import React from 'react';

import {Route, Switch, withRouter} from "react-router-dom"
import AuthIndex from "./pages/auth/AuthIndex";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Applications from "./pages/client/Applications";
import NewApplication from "./pages/client/NewApplication";
import ViewApplication from "./pages/client/ViewApplication";
import Header from "./components/Header";

class App extends React.Component {
  render() {
    const { history } = this.props;

    return (
        <div className="App">
          <Switch>
            {/* Client */}
            <Route history={history} path='/applications' component={Applications} />
            <Route history={history} path='/new_application' component={NewApplication} />
            {/* Employee */}
            <Route history={history} path='/free_applications' component={null} />
            <Route history={history} path='/my_applications' component={null} />
            {/* Authorization */}
            <Route history={history} path='/auth' component={AuthIndex} />
            <Route history={history} path='/login' component={Login} />
            <Route history={history} path='/register' component={Register} />
            {/* Common */}
            <Route history={history} path='/application/:application_id' component={ViewApplication} />
            <Route history={history} path='/header' component={Header} />
            <Route exact history={history} path='/' component={null}/>
            <Route exact history={history} path='/logout'><Logout /></Route>
          </Switch>
        </div>
    );
  }
}

function Logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('IsEmployee');
  window.location.href='/login';
}

export default withRouter(App);
