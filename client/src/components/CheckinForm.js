import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Rate, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import { addCheckin } from '../reducers/checkinReducer';

const CheckinForm = () => {
  const places = useSelector((state) => state.places.data);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    const { bowl, rating, review, placeId } = values;
    const checkin = {
      bowl,
      rating,
      review,
      place_id: placeId,
      person_id: user.id,
    };
    form.resetFields();
    await dispatch(addCheckin(checkin));
    history.push('/feed');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
    <div>
      <h1 style={{ textAlign: 'center' }}>Add a new checkin</h1>
      <Form
        form={form}
        name="newCheckin"
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinishFailed={onFinishFailed}
        initialValues={{ personId: user.id }}
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
                <Select.Option
                  key={place.id}
                  value={place.id}
                  label={place.name}
                >
                  {place.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="bowl"
          label="Bowl"
          rules={[{ required: true, message: 'Please select the bowl type' }]}
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
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CheckinForm;
