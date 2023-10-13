<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import PatientDetail from "./components/PatientDetail";
import HistoryTable from "./components/HistoryTable";

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  console.log("ahihi");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}>
            <Route path="/patient_detail" element={<PatientDetail />} />
          </Route>
          <Route path="/history_table" element={<HistoryTable />} />
        </Routes>
      </BrowserRouter>
    </>
=======
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
>>>>>>> a9f051a557aab60e256f92a3b13e46a3324649ae
  );
};

App.propTypes = {
  layout: PropTypes.any
};

export default App;
