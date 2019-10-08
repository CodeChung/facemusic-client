import React from 'react';
import ReactDOM from 'react-dom';
import Journal from './Journal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Journal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
