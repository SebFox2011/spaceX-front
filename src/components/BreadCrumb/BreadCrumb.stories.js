import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import BreadCrumb from './BreadCrumb';

export default {
  title: 'Example/BreadCrumb',
  component: BreadCrumb,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <BrowserRouter path="/" exact component={BreadCrumb} ></BrowserRouter>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'BreadCrumb',
};