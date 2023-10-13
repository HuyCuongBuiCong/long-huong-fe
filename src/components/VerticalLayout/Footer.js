import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { CLINIC_NAME } from '../../constants/commons';

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>
              {new Date().getFullYear()} © {CLINIC_NAME}.
            </Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">Design & Develop by {CLINIC_NAME}</div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
