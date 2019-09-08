import React from 'react';
import ReactDOM from 'react-dom';
import RegistrationPage from './RegistrationPage';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe(`RegistrationPage Component`, () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RegistrationPage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('displays a valid RegistrationPage', () => {
    const wrapper = shallow(<RegistrationPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})