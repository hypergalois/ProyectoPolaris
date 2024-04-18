import React from 'react';
import ProjectCard from './ProjectCard';
import { AuthProvider } from '../../context/AuthContext';

export default {
  title: 'ProjectCard',
  component: ProjectCard,
};

const Template = (args) => {
    return (
        <AuthProvider>
            <ProjectCard {...args} />
        </AuthProvider>
    );
}

export const Default = Template.bind({});
Default.args = {
  project: {
    id: 1,
    title: 'Project Title',
    description: 'Project description.',
    imageUrl: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800',
    students: ['Student 1', 'Student 2', 'Student 3'],
  },
};

export const WithLongTitle = Template.bind({});
WithLongTitle.args = {
  project: {
    id: 2,
    title: 'This is a very long project title that may exceed the width of the card and need to be truncated.',
    description: 'Project description.',
    imageUrl: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800',
    students: ['Student 1', 'Student 2', 'Student 3'],
  },
};

export const WithLongDescription = Template.bind({});
WithLongDescription.args = {
  project: {
    id: 3,
    title: 'Project Title',
    description: 'This is a very long project description that may exceed the height of the card and need to be truncated. This is a very long project description that may exceed the height of the card and need to be truncated.',
    imageUrl: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800',
    students: ['Student 1', 'Student 2', 'Student 3'],
  },
};

export const WithNoImage = Template.bind({});
WithNoImage.args = {
  project: {
    id: 4,
    title: 'Project Title',
    description: 'Project description.',
    imageUrl: null,
    students: ['Student 1', 'Student 2', 'Student 3'],
  },
};
