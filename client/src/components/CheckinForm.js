import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Rate, Select } from 'antd';
import { addCheckin } from '../reducers/checkinReducer';

const CheckinForm = () => {
  const places = useSelector((state) => state.places);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log(values);
    const { rating, review, placeId, personId } = values;
    const checkin = { rating, review, place_id: placeId, person_id: personId };
    dispatch(addCheckin(checkin));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Add a new checkin</h1>
      <Form
        name="newCheckin"
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinishFailed={onFinishFailed}
        initialValues={{ personId: '272de710-f5c5-4c23-b86f-cd64542115f3' }}
        style={{ maxWidth: 768, margin: '30px auto' }}
      >
        <Form.Item name="placeId" label="Place">
          <Select showSearch optionFilterProp="label">
            {places.map((place) => (
              <Select.Option key={place.id} value={place.id} label={place.name}>
                {place.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="review" label="Review">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="rating" label="Rating">
          <Rate />
        </Form.Item>
        <Form.Item name="personId" label="Person">
          <Input />
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
