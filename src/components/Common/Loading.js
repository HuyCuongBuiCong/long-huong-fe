import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const Loading = () => {
  return (
    <div className="d-flex align-items-center py-5">
      <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" animationDuration=".5s" />
    </div>
  );
};

export default Loading;
