import React from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FormWrapper from './FormWrapper';
import { register } from '../reducers/userReducer';

const RegisterForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const success = useSelector((state) => state.notification.success);

  const onFinish = async (values) => {
    const { username, email, password } = values;
    form.resetFields();
    await dispatch(register(username, email, password));
    if (success) {
      history.push('/login');
    }
  };

  return (
    <FormWrapper
      form={form}
      onFinish={onFinish}
      heading="Register and log in to access the app"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            min: 3,
            message: 'Please input your username (min. 3 characters)!',
          },
        ]}
      >
        <Input placeholder="minimum 3 characters" />
      </Form.Item>
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
        rules={[
          {
            required: true,
            min: 8,
            message: 'Please input your password (min. 8 characters)!',
          },
        ]}
      >
        <Input.Password placeholder="minimum 8 characters" />
      </Form.Item>
    </FormWrapper>
  );
};

export default RegisterForm;
