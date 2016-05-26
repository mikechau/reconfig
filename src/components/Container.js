import React, { PropTypes } from 'react';

export default function Container({ children }) {
  return (
    <div className="container">
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
};
