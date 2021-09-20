import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Place from '../components/Place';
import Spinner from '../components/Spinner';

const Places = () => {
  const placesState = useSelector((state) => state.places);
  const [places, setPlaces] = useState(placesState.data);
  const [sort, setSort] = useState('desc');

  useEffect(() => {
    const sortByCheckins = (array, type) =>
      type === 'desc'
        ? [...array].sort((a, b) => b.checkins.length - a.checkins.length)
        : [...array].sort((a, b) => a.checkins.length - b.checkins.length);
    if (placesState.data) {
      setPlaces(sortByCheckins(placesState.data, sort));
    }
  }, [placesState, sort]);

  const onChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <h1>Ramen places in Berlin</h1>
      {placesState.isLoading && <Spinner />}
      {places && (
        <div>
          <div className="flex-center light-grey">
            Sort by number of checkins:&nbsp;
            <Radio.Group onChange={onChange} value={sort}>
              <Radio value="desc">
                <ArrowDownOutlined />
              </Radio>
              <Radio value="asc">
                <ArrowUpOutlined />
              </Radio>
            </Radio.Group>
          </div>
          {places.map((place) => (
            <Place key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Places;
