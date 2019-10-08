import React from 'react';
import ReactDOM from 'react-dom';
import SearchVibes from './SearchVibes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchVibes />, div);
  ReactDOM.unmountComponentAtNode(div);
});
