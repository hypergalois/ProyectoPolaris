import React from 'react';
import LandingPageAnimation from './LandingPageAnimation';

export default {
  title: 'LandingPageAnimation',
  component: LandingPageAnimation,
};

const Template = (args) => <LandingPageAnimation {...args} />;

export const AnimationVisible = Template.bind({});
AnimationVisible.args = {};

export const AnimationHidden = Template.bind({});
AnimationHidden.args = { isVisible: false };
