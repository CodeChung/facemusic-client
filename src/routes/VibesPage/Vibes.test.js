import React from 'react';
import ReactDOM from 'react-dom';
import Preferences from './Vibes';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Preferences Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Preferences /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('displays a proper PreferencesPage', () => {
    const wrapper = shallow(<BrowserRouter><Preferences /></BrowserRouter>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})