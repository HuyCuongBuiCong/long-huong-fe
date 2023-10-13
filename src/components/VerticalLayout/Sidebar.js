import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

//i18n
import { withTranslation } from 'react-i18next';
import SidebarContent from './SidebarContent';

const Sidebar = () => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          <SidebarContent />
        </div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout
  };
};
export default connect(mapStateToProps, {})(withTranslation()(Sidebar));
