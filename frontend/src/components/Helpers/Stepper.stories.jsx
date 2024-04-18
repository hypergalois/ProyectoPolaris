import React from 'react';
import Stepper from './Stepper';

export default {
  title: 'Stepper',
  component: Stepper,
};

const Template = (args) => <Stepper {...args} />;

export const Step1 = Template.bind({});
Step1.args = { currentStep: 1, isComplete: false };

export const Step2 = Template.bind({});
Step2.args = { currentStep: 2, isComplete: false };

export const Step3 = Template.bind({});
Step3.args = { currentStep: 3, isComplete: false };

export const Step4 = Template.bind({});
Step4.args = { currentStep: 4, isComplete: false };

export const Step1Complete = Template.bind({});
Step1Complete.args = { currentStep: 1, isComplete: true };

export const Step2Complete = Template.bind({});
Step2Complete.args = { currentStep: 2, isComplete: true };

export const Step3Complete = Template.bind({});
Step3Complete.args = { currentStep: 3, isComplete: true };

export const Step4Complete = Template.bind({});
Step4Complete.args = { currentStep: 4, isComplete: true };
