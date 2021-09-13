import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { login } from '../reducers/userReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { email, password } = values;
    form.resetFields();
    await dispatch(login(email, password));
    history.push('/feed');
  };
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Login to access the app</h1>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 768, margin: '30px auto' }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
