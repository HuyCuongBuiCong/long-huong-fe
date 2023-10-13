import PropTypes from 'prop-types';
import React from 'react';

import { Switch, BrowserRouter as Router } from 'react-router-dom';

// Import Routes all
import { userRoutes, authRoutes } from './routes/allRoutes';

// Import all middleware
import Authmiddleware from './routes/middleware/Authmiddleware';

// layouts Format
import VerticalLayout from './components/VerticalLayout/';
import NonAuthLayout from './components/NonAuthLayout';

import Error404 from './pages/Error404';

// Import scss
import './assets/scss/theme.scss';
import './assets/scss/preloader.scss';

const App = () => {
  const Layout = VerticalLayout;
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}
          <Authmiddleware name="Page not found" layout={Layout} component={Error404} isAuthProtected={false} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any
};

export default App;
