import React from 'react';
import ReactDOM from 'react-dom';
import Artist from './Artist';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Artist />, div);
  ReactDOM.unmountComponentAtNode(div);
});
