import React from 'react';
import TopNavBar from 'components/TopNavBar';
import Container from 'components/Container';
import Splash from 'components/Splash';
import Footer from 'components/Footer';

import { APP_NAME } from 'constants';

export default function Root() {
  return (
    <div>
      <TopNavBar title={APP_NAME} />
      <Container>
        <Splash title={APP_NAME} />
      </Container>
      <Footer title={APP_NAME} />
    </div>
  );
}
