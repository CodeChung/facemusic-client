import React from 'react';
import ReactDOM from 'react-dom';
import SavedVibes from './SavedVibes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SavedVibes />, div);
  ReactDOM.unmountComponentAtNode(div);
});
