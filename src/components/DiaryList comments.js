import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    // value : 컨트롤 메뉴가 렌더링하는 셀렉트가 어떤 걸 선택하고 있는지?
    // onChange : 셀렉트가 선택하는 게 변화했을 때 바꾸는 함수
    // optionList : 셀렉트 태그 속에 들어갈 옵션들
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
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();

  // 정렬 기준을 저장할 state
  const [sortType, setSortType] = useState('lastest');

  // 감정 구분해서 필터해줄 상태정보함?ㅎ
  const [filter, setFilter] = useState('all');

  // 정렬 기능을 선택하면 리스트를 기준대로 실제 리스트업해주는 기능
  const getProcessedDiaryList = () => {
    // [2]
    const compare = (a, b) => {
      if (sortType === 'lastest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    // 실제 리스트 배열에 sort 적용하면 원본 건드리니까, 원본 건들기 지양 ㅇㅇ
    const copyList = JSON.parse(JSON.stringify(diaryList)); // 이럴 때 깊은 복사 활용해주기

    const filterCallBack = (it) => {
      if (filter === 'good') {
        return parseInt(it.emotion) >= 3;
      } else {
        return parseInt(it.emotion) < 3;
      }
    };

    const filteredList =
      filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));

    // const sortedList = copyList.sort(compare);
    // 원래 all item이었지만 좋은날/안좋은날 구분하니까 copyList에서 filteredList로 변경
    const sortedList = filteredList.sort(compare);
    // 정렬하고자 하는 데이터가 현재 배열이므로? 비교함수 만들어준다고? [1]

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
            text={'일기 쓰기'}
            onClick={() => navigate('/new')}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
        // 키의 의미, 필요성 복습필요합니다.
      ))}
    </div>
  );
};

// 다이어리 목록에서 프롭이 제대로 전달이 안 될수 있으므로,
DiaryList.defaultProps = {
  diaryList: [],
};
// 이게 뭔 의미래?? 제대로 전달 안 되면 null 오류처럼 될 수 있으니,
// 데이터 양식? 배열인 거 빈 배열이라도 보험처럼 전달하는거?

export default DiaryList;
