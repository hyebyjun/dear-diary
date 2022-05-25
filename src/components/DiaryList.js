import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';
import MyButton from './MyButton';

const sortOptionList = [
  { value: 'lastest', name: '최신 순' },
  { value: 'oldest', name: '오래된 순' },
];

const filterOptionList = [
  { value: 'all', name: '모든 날' },
  { value: 'good', name: '좋은 날' },
  { value: 'bad', name: '나쁜 날' },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {

  useEffect(() => {
    console.log('control menu');
  }, []);

  return (
    <select
      className='ControlMenu'
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();

  const [sortType, setSortType] = useState('lastest');
  const [filter, setFilter] = useState('all');

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === 'lastest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filterCallBack = (it) => {
      if (filter === 'good') {
        return parseInt(it.emotion) >= 3;
      } else {
        return parseInt(it.emotion) < 3;
      }
    };

    const filteredList =
      filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <div className='DiaryList'>
      <div className='menu_wrapper'>
        <div className='left_col'>
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />

          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className='right_col'>
          <MyButton
            type={'positive'}
            text={'새 🌱 일기'}
            onClick={() => navigate('/new')}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
