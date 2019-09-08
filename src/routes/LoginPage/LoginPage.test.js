import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe(`LoginPage Component`, () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginPage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders an expected LoginPage', () => {
    const wrapper = shallow(<LoginPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})