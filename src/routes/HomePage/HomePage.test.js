import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';



describe(`HomePage Component`, () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HomePage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders loading given no props', () => {
    const wrapper = shallow(<HomePage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders camera after componentDidMount', () => {
    const wrapper = mount(<HomePage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
}) 
