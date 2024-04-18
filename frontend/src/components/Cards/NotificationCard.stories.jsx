import React from 'react';
import NotificationCard from './NotificationCard';
import { NotificationsProvider } from '../../context/NotificationContext';
import { AuthProvider } from '../../context/AuthContext';

export default {
  title: 'NotificationCard',
  component: NotificationCard,
};

const Template = (args) => {
  return (
    <AuthProvider>
      <NotificationsProvider>
          <NotificationCard {...args} />
      </NotificationsProvider>
    </AuthProvider>
  );
}

export const Default = Template.bind({});
Default.args = {
  notification: {
    id: 1,
    content: 'This is a notification card.',
  },
};

export const LongContent = Template.bind({});
LongContent.args = {
  notification: {
    id: 2,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
};

export const WithActions = Template.bind({});
WithActions.args = {
  notification: {
    id: 3,
    content: 'Notification with actions.',
  },
};

