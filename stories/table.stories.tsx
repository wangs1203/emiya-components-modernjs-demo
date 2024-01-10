import type { Meta, StoryObj } from '@storybook/react';
import { Button, Input } from 'antd';
import { Table, Container } from 'emiya-components';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
  },
];
const dataSource = [];

for (let i = 1; i <= 20; i++) {
  dataSource.push({
    id: String(i),
    name: `姓名${i}`,
    age: i + 20,
    address: `地址${i}`,
  });
}

const storyMeta: Meta<typeof Table> = {
  title: 'Emiya Components/Table',
  component: Table,
  argTypes: {
    loading: { control: 'boolean' },
    rowKey: { control: 'string' },
    data: { control: 'object' },
    columns: { control: 'object' },
    toolbar: { control: 'object' },
  },
  args: {
    rowKey: 'id',
    columns,
    data: dataSource,
    loading: false,
    pagination: {
      current: 1,
      total: 20,
      defaultPageSize: 20,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: [10, 20, 30, 50, 100],
      showTotal: (total: number) => `共 ${total} 条`,
    },
  },
};

export default storyMeta;

type Story = StoryObj<typeof Table>;

export const WithToolbar: Story = {
  args: {
    toolbar: {
      columns: 4,
      divider: true,
      filters: {
        name: {
          label: '名称',
          component: <Input />,
        },
        code: {
          label: '编号',
          component: <Input />,
        },
        attrbuite1: {
          label: '属性1',
          component: <Input />,
        },
        attrbuite2: {
          label: '属性2',
          component: <Input />,
        },
        attrbuite3: {
          label: '属性3',
          component: <Input />,
        },
        attrbuite4: {
          label: '属性4',
          component: <Input />,
        },
        attrbuite5: {
          label: '属性5',
          component: <Input />,
        },
        attrbuite6: {
          label: '属性6',
          component: <Input />,
        },
      },
      actions: {
        insert: () => {
          console.log('insert action');
        },
        export: (
          <Button
            title="导出"
            type="primary"
            onClick={() => {
              console.log('export action');
            }}
          >
            导出
          </Button>
        ),
        delete: () => {
          console.log('delete action');
        },
      },
      onSearch: values => {
        console.log('search', values);
      },
      onReset: emptyValues => {
        console.log('reset');
        console.log(emptyValues);
      },
    },
  },
  render: props => {
    return (
      <main className="tw-flex tw-flex-col tw-min-h-0 tw-h-full">
        <header className="tw-text-center tw-bg-orange-200">header</header>
        <Container>
          <Table {...props} />
        </Container>
        <footer className="tw-text-center tw-bg-orange-200">footer</footer>
      </main>
    );
  },
};

export const Default: Story = {};

export const Empty: Story = {
  args: {
    data: [],
  },
};
