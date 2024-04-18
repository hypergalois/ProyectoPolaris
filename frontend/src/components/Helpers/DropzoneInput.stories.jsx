import React from 'react';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import DropzoneInput from './DropzoneInput.jsx';

export default {
  title: 'DropzoneInput',
  component: DropzoneInput,
};

const Template = (args) => {
  const methods = useForm();
  const {
		register,
		control,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = methods;
  const onSubmit = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
          <DropzoneInput {...args} />
          <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  name: 'files',
  placeholder: 'Drag and drop files here or click to select',
  rules: {},
};

export const DragActive = Template.bind({});
DragActive.args = {
  ...Basic.args,
  name: 'files',
  placeholder: 'Drop here',
};

export const FilesAccepted = Template.bind({});
FilesAccepted.args = {
  ...Basic.args,
  name: 'files',
  placeholder: 'Accepted files:',
};

export const FilesRejected = Template.bind({});
FilesRejected.args = {
  ...Basic.args,
  name: 'files',
  placeholder: 'Only image files allowed',
  rules: { accept: 'image/*' },
};

export const SingleFile = Template.bind({});
SingleFile.args = {
  ...Basic.args,
  name: 'files',
  placeholder: 'Accepted file:',
};

export const MultipleFiles = Template.bind({});
MultipleFiles.args = {
  ...Basic.args,
  name: 'files',
  placeholder: 'Accepted files:',
};

export const FilesLimitExceeded = Template.bind({});
FilesLimitExceeded.args = {
  ...Basic.args,
  name: 'files',
  placeholder: 'Only one file allowed',
  rules: { maxFiles: 1 },
};

export const DisplayFiles = Template.bind({});
DisplayFiles.args = {
  ...Basic.args,
  name: 'files',
  placeholder: 'Selected files:',
};

