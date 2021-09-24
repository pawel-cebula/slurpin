import { Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import FormWrapper from '../components/FormWrapper';
import errorCodes from '../constants/errorCodes';
import { addError } from '../reducers/notificationReducer';
import { edit } from '../reducers/userReducer';

const EditUser = () => {
  const user = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const onFinish = async (values) => {
    const { username, email } = values;
    const editedUser = {
      username,
      email,
    };
    await dispatch(edit(user.id, editedUser));
    history.push(`/users/${user.id}`);
  };

  if (user.id && id && user.id !== id) {
    dispatch(addError(errorCodes.unauthorizedAccess));
    return <Redirect to={`/users/${user.id}`} />;
  }

  return (
    <div>
      <h1>Edit User Profile</h1>
      <FormWrapper
        form={form}
        onFinish={onFinish}
        initialValues={{
          id: user.id,
          username: user.username,
          email: user.email,
        }}
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
      </FormWrapper>
    </div>
  );
};

export default EditUser;
