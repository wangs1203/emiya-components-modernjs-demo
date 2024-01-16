import type { Meta, StoryObj } from '@storybook/react';
import { Button, Input } from 'antd';
import { URLParamsTable, Container } from 'emiya-components';
import { useCallback, useMemo } from 'react';
import {
  BrowserRouter,
  useSearchParams,
  type SetURLSearchParams,
} from 'react-router-dom';

function useURLQueryParams<P extends IBaseObject>(
  transform: (searchParams: URLSearchParams, query: P) => any,
  deps: any[] = [],
): [P, SetURLSearchParams] {
  const transformCallback = useCallback(transform, deps);
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    useMemo(() => {
      const [orderColumn, orderType] = (searchParams.get('sort') ?? '').split(
        '-',
      ) as any;
      const query = {
        orderColumn,
        orderType,
        page: Number(searchParams.get('page') ?? 1),
        size: Number(searchParams.get('size') ?? 20),
      };

      return transformCallback
        ? transformCallback(searchParams, { ...query } as any)
        : query;
    }, [transformCallback, searchParams]),
    setSearchParams,
  ];
}

function URLParamsTableDemo(props: any) {
  const [searchParams] = useURLQueryParams<any>((searchParams, query: any) => {
    return { ...query, ...Object.fromEntries(searchParams.entries()) };
  }, []);
  const pagingParams = {
    size: searchParams?.size,
    page: searchParams?.page,
    total: 20,
  };

  return (
    <Container>
      <URLParamsTable {...props} pagingParams={pagingParams} />
    </Container>
  );
}

function URLParamsTableDemoPage(props: any) {
  return (
    <BrowserRouter>
      <main className="tw-flex tw-flex-col tw-min-h-0 tw-h-full">
        <header className="tw-text-center tw-bg-orange-200">header</header>
        <URLParamsTableDemo {...props} />
        <footer className="tw-text-center tw-bg-orange-200">footer</footer>
      </main>
    </BrowserRouter>
  );
}

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

const storyMeta: Meta<typeof URLParamsTable> = {
  title: 'Emiya Components/URLParamsTable',
  component: URLParamsTable,
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
    pagingParams: {
      page: 1,
      size: 20,
      total: 20,
    },
  },
};

export default storyMeta;

type Story = StoryObj<typeof URLParamsTable>;

export const WithToolbar: Story = {
  args: {
    toolbar: {
      columns: 4,
      divider: true,
      filters: {
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
        attrbuite7: {
          label: '属性7',
          component: <Input />,
        },
        attrbuite8: {
          label: '属性8',
          component: <Input />,
        },
        attrbuite9: {
          label: '属性9',
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
      onReset: () => {
        console.log('reset');
      },
    },
  },
  render: props => {
    return <URLParamsTableDemoPage {...props} />;
  },
};
