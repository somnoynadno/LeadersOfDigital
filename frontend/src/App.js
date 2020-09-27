import React from 'react';

import {Route, Switch, withRouter, Redirect} from "react-router-dom"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Applications from "./pages/application/Applications";
import NewApplication from "./pages/application/NewApplication";
import ViewApplication from "./pages/application/ViewApplication";


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
            <Route history={history} path='/free_applications' component={Applications} />
            <Route history={history} path='/my_applications' component={Applications} />
            {/* Authorization */}
            <Route history={history} path='/login' component={Login} />
            <Route history={history} path='/register' component={Register} />
            {/* Common */}
            <Route history={history} path='/application/:application_id' component={ViewApplication} />
            <Route exact history={history} path='/' component={Index}/>
            <Route exact history={history} path='/logout'><Logout /></Route>
          </Switch>
        </div>
    );
  }
}

function Index() {
  if (localStorage.getItem("token")) {
    return <Redirect to={'/applications'} />
  } else {
    return <Redirect to={'/login'} />
  }
}

function Logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('IsEmployee');
  window.location.href='/login';
}

export default withRouter(App);
