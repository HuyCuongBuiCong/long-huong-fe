import React from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';

import { Container } from 'reactstrap';
import { CLINIC_NAME } from '../../constants/commons';
import MainPage from '../../components/app/MainPage';

const HomePage = () => {
  document.title = 'Home page | ' + CLINIC_NAME;
  return (
    <>
      <div className="page-content">
        <Container fluid className="h-100">
          <MainPage />
        </Container>
      </div>
    </>
  );
};

export default HomePage;
