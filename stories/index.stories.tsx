const Example = ({ backgroundColor, color }: any) => (
  <button type="button" style={{ backgroundColor, color }}>
    this is a Story Component
  </button>
);

export default {
  title: 'Components/Example',
  component: Example,
  argTypes: {
    backgroundColor: { control: 'color' },
    çolor: { control: 'color' },
  },
};

export const Primary = {
  args: {
    backgroundColor: '#1ea7fd',
    color: 'white',
  },
};

export const Secondary = {
  args: {
    backgroundColor: 'transparent',
    color: '#333',
  },
};
