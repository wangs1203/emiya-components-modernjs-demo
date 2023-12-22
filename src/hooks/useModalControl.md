## 说明

当你需要使用`antd Modal`，可使用 useModalControl

## 示例

### 基础

```jsx
import { Modal, Input, Button, Form, message } from 'antd';
import useModalControl from '@/hooks/useModalControl';

export default (props) => {
  const [form] = Form.useForm();
  const { modalProps, show, close } = useModal({
    defaultOpen: false,
  });
  const onSubmit = async () => {
    const values = await form.validateFields().catch((err) => console.log(err));
    await new Promise((r) => setTimeout(r, 1000));
    form.resetFields();
    message.success('提交成功');
    close();
  };
  return (
    <div>
      <Modal {...modalProps} title="useModalControl" onOk={onSubmit}>
        <Form layout="inline" form={form}>
          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input placeholder="username" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input placeholder="email" />
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={show}>show</Button>
    </div>
  );
};
```

## API

```js
const result = useModalControl(config);
```

### Config

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>说明</th>
      <th>类型</th>
      <th width="200px">默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>defaultOpen</td>
      <td>弹窗是否默认可见</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
  </tbody>
</table>

### Returns

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>说明</th>
      <th>类型</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>modalProps</td>
      <td>antd Modal 组件的props,作为Modal 组件的props即可</td>
      <td>{ open: boolean; onCancel: () => void;}</td>
    </tr>
    <tr>
      <td>show</td>
      <td>打开弹窗</td>
      <td>() => void</td>
    </tr>
    <tr>
      <td>close</td>
      <td>关闭弹窗</td>
      <td>() => void</td>
    </tr>
  </tbody>
</table>
