import { Form, Select, Input, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import FormWrapper from './FormWrapper';
import bowlOptions from '../constants/bowlOptions';
import Spinner from './Spinner';
import { editCheckin } from '../reducers/checkinReducer';

const EditCheckinForm = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const checkins = useSelector((state) => state.checkins);
  const [checkin, setCheckin] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const [form] = Form.useForm();

  useEffect(() => {
    if (checkins.data) {
      setCheckin(checkins.data.find((c) => c.id === id));
    }
  }, [checkins]);

  const onFinish = async (values) => {
    const { bowl, review, rating } = values;
    const editedCheckin = {
      bowl,
      review,
      rating,
    };
    form.resetFields();
    await dispatch(editCheckin(id, editedCheckin));
    history.push('/feed');
  };

  if (!checkin) {
    return <Spinner />;
  }

  return (
    <FormWrapper
      form={form}
      onFinish={onFinish}
      initialValues={{
        personId: user.id,
        bowl: checkin.bowl,
        review: checkin.review,
        rating: checkin.rating,
      }}
    >
      <Form.Item
        name="bowl"
        label="Bowl"
        rules={[
          {
            required: true,
            message: 'Please select the bowl type',
          },
        ]}
      >
        <Select options={bowlOptions} />
      </Form.Item>
      <Form.Item name="review" label="Review">
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="rating"
        label="Rating"
        rules={[{ required: true, message: 'Please select the rating' }]}
      >
        <Rate />
      </Form.Item>
    </FormWrapper>
  );
};

export default EditCheckinForm;
