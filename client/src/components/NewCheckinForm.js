import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Rate, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import { addCheckin } from '../reducers/checkinReducer';
import FormWrapper from './FormWrapper';

const NewCheckinForm = () => {
  const places = useSelector((state) => state.places.data);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { bowl, rating, review, placeId } = values;
    const checkin = {
      bowl,
      rating,
      review,
      placeId,
      personId: user.id,
    };
    form.resetFields();
    await dispatch(addCheckin(checkin));
    history.push('/feed');
  };

  const bowlOptions = [
    'Tonkotsu',
    'Shio',
    'Shoyu',
    'Miso',
    'TanTan',
    'Tsukemen',
    'Other',
  ].map((option) => ({ label: option, value: option }));

  return (
    <FormWrapper
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      // initialValues={{ personId: user.id }}
      style={{ maxWidth: 768, margin: '30px auto' }}
    >
      <Form.Item
        name="placeId"
        label="Place"
        rules={[{ required: true, message: 'Please input the place name' }]}
      >
        <Select showSearch optionFilterProp="label">
          {places &&
            places.map((place) => (
              <Select.Option key={place.id} value={place.id} label={place.name}>
                {place.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
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

export default NewCheckinForm;
