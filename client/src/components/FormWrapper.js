import { Button, Form } from 'antd';
import React from 'react';

const FormWrapper = ({
  children,
  form,
  onFinish,
  heading,
  btnType = 'primary',
  btnHtmlType = 'submit',
  btnText = 'Submit',
  ...rest
}) => (
  <div>
    <h1>{heading}</h1>
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 768, margin: '30px auto' }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type={btnType} htmlType={btnHtmlType}>
          {btnText}
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default FormWrapper;