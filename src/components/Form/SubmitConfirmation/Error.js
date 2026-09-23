import React from 'react';
import PropTypes from 'prop-types';

function Error({ isRecoverLinkPressed }) {
  const title = isRecoverLinkPressed
    ? 'Request a link to manage your disruption alerts'
    : 'Contact us form';
  return (
    <div className="wmre-container-alerts-sign-up">
      <div className="wmre-grid">
        <div className="wmre-col-1 wmre-col-sm-2-3">
          <h1>{title}</h1>
        </div>
        <div className="wmre-col-1">
          {/* Error message */}
          <h3>Sorry, there is a problem with this service</h3>
          <p>Try again later.</p>
          <p>
            We have not saved your answers. When the service is available, you will have to start
            again.
          </p>
        </div>
      </div>
    </div>
  );
}

Error.propTypes = {
  isRecoverLinkPressed: PropTypes.bool.isRequired,
};

export default Error;
