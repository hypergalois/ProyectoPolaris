import React from 'react';
import ProgressSteps from './ProgressSteps';

export default {
  title: 'ProgressSteps',
  component: ProgressSteps,
};

const Template = (args) => <ProgressSteps {...args} />;

export const Step1 = Template.bind({});
Step1.args = { currentStep: 1 };

export const Step2 = Template.bind({});
Step2.args = { currentStep: 2 };

export const Step3 = Template.bind({});
Step3.args = { currentStep: 3 };

export const Step4 = Template.bind({});
Step4.args = { currentStep: 4 };
