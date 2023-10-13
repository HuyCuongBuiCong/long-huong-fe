import React from 'react';

//import Breadcrumbs
import Breadcrumbs from '../../components/Common/Breadcrumb';

import { Container } from 'reactstrap';
import { CLINIC_NAME } from '../../constants/commons';

const Dashboard = () => {
  document.title = 'Home page | ' + CLINIC_NAME;
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Home page" breadcrumbItem="Home page" />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
