import React from 'react';
import { Container } from 'reactstrap';
import { CLINIC_NAME } from '../../constants/commons';
import SecondPage from '../../components/app/SecondPage';
const AdminPage = () => {
  document.title = 'Home page | ' + CLINIC_NAME;
  return (
    <>
      <div className="page-content">
        <Container fluid className="h-100">
          <SecondPage />
        </Container>
      </div>
    </>
  );
};
export default AdminPage;
