import React, { PropTypes } from 'react';
import Container from './Container';

export default function Footer({ title }) {
  return (
    <footer className="footer">
      <Container>
        {title}. &copy; 2016.
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  title: PropTypes.string.isRequired,
};
