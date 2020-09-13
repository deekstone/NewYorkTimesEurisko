// __tests__/Intro-test.js
import React from 'react';
import NewsRow from '../src/components/news/NewsRow';
import NewsDetail from '../src/components/newsDetail/NewsDetail';
import renderer from 'react-test-renderer';
import {rowItem} from './mockupdata'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('renders correctly', () => {
  const tree = renderer.create(<NewsRow rowItem={rowItem} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Image element must appear in case the news has an image', () => {
  const wrapper = shallow(<NewsRow rowItem={rowItem} />);
  expect(wrapper.find('Image').length).toEqual(1);
});



