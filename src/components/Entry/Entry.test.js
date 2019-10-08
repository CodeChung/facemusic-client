import React from 'react';
import ReactDOM from 'react-dom';
import Entry from './Entry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Entry />, div);
  ReactDOM.unmountComponentAtNode(div);
});
