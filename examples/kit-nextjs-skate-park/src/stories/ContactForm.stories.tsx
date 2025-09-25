import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ContactForm, { type ContactFormProps } from '@/components/contact-form/ContactForm';
import { CommonParams, CommonRendering } from './common/commonData';
import { createTextField } from './helpers/createFields';

const baseParams = {
  ...CommonParams,
};

const meta = {
  title: 'Forms/ContactForm',
  component: ContactForm,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<ContactFormProps>;

export default meta;

type Story = StoryObj<ContactFormProps>;

export const Default: Story = {
  render: () => (
    <ContactForm
      params={baseParams}
      rendering={{
        ...CommonRendering,
        componentName: 'ContactForm',
        params: baseParams,
      }}
      fields={{
        SubmitText: createTextField('Send message'),
      }}
    />
  ),
};
