import React from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import Root from 'app/containers/Root.js';

test('renders hello world', (t) => {
  const actual = shallow(<Root />);
  const child = <div>hello world</div>;

  t.true(actual.contains(child));
});
