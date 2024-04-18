import React from 'react';
import TagsInputComponent from './TagsInputComponent';

export default {
  title: 'TagsInputComponent',
  component: TagsInputComponent,
};

const Template = (args) => <TagsInputComponent {...args} />;

export const Default = Template.bind({});
Default.args = { control: null, name: 'tags', placeholder: 'Agregar tags...' };

export const WithTags = Template.bind({});
WithTags.args = { control: null, name: 'tags', placeholder: 'Agregar tags...', value: [{ id: 1, text: 'Tag1' }, { id: 2, text: 'Tag2' }] };

export const Editable = Template.bind({});
Editable.args = { control: null, name: 'tags', placeholder: 'Agregar tags...', editable: true };

export const WithCallbacks = Template.bind({});
WithCallbacks.args = {
  control: null,
  name: 'tags',
  placeholder: 'Agregar tags...',
  onExisting: (tag) => console.log(`Tag ${tag} already exists`),
  onRemoved: (tag) => console.log(`Tag ${tag} removed`),
};

export const WithValidation = Template.bind({});
WithValidation.args = {
  control: null,
  name: 'tags',
  placeholder: 'Agregar tags...',
  beforeAddValidate: (newTag, existingTags) => !existingTags.includes(newTag),
};
