import React from 'react';

import {Route, Switch, withRouter} from "react-router-dom"

class App extends React.Component {
  render() {
    const { history } = this.props;

    return (
        <div className="App">
          <Switch>
            {/* Client */}
            <Route history={history} path='/applications' component={null} />
            <Route history={history} path='/new_application' component={null} />
            {/* Employee */}
            <Route history={history} path='/free_applications' component={null} />
            <Route history={history} path='/my_applications' component={null} />
            {/* Authorization */}
            <Route history={history} path='/auth' component={null} />
            <Route history={history} path='/login' component={null} />
            <Route history={history} path='/register' component={null} />
            {/* Common */}
            <Route history={history} path='/application/:application_id' component={null} />
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
