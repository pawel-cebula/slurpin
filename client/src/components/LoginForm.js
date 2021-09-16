import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Input } from 'antd';
import { login } from '../reducers/userReducer';
import FormWrapper from './FormWrapper';

const LoginForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { email, password } = values;
    form.resetFields();
    await dispatch(login(email, password));
    if (user.token) {
      history.push('/feed');
    }
  };
  return (
    <FormWrapper
      form={form}
      onFinish={onFinish}
      heading="Log in to access the app"
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
    </FormWrapper>
  );
};

export default LoginForm;
