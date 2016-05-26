import React, { PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';

export default function Splash({ title }) {
  return (
    <div>
      <Jumbotron>
        <h1>Welcome to {title}!</h1>
      </Jumbotron>
    </div>
  );
}

Splash.propTypes = {
  title: PropTypes.string.isRequired,
};
