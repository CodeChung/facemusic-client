import React from 'react';
import ReactDOM from 'react-dom';
import Donut from './Donut';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Donut />, div);
  ReactDOM.unmountComponentAtNode(div);
});
