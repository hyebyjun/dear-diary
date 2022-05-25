import React, { useEffect, useReducer, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

// 콜백함수는 reducer라는 함수명으로 state, action 가지기
const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content:
      '이 편지는 영국에서 최초로 시작되어 일 년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야합니다.',
    date: 1652054400000,
  },
  {
    id: 2,
    emotion: 2,
    content:
      '이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.',
    date: 1652054400000,
  },
  {
    id: 3,
    emotion: 3,
    content:
      '영국에서 HGXWCH이라는 사람은 1930년에 이 편지를 받았습니다. 그는 비서에게 편지를 복사해서 보내라고 했습니다. 며칠 뒤에 복권이 당첨되어 20억을 받았습니다.',
    date: 1652054400000,
  },
  {
    id: 4,
    emotion: 4,
    content:
      '어떤 이는 이 편지를 받았으나 96시간 이내 자신의 손에서 떠나야 한다는 사실을 잊었습니다. 그는 곧 사직되었습니다. 나중에야 이 사실을 알고 7통의 편지를 보냈는데 다시 좋은 직장을 얻었습니다.',
    date: 1652054400000,
  },
  {
    id: 5,
    emotion: 5,
    content:
      '미국의 케네디 대통령은 이 편지를 받았지만 그냥 버렸습니다. 결국 9일 후 그는 암살당했습니다. 기억해 주세요. 이 편지를 보내면 7년의 행운이 있을 것이고 그렇지 않으면 3년의 불행이 있을 것입니다. 그리고 이 편지를 버리거나 낙서를 해서는 절대로 안됩니다. 7통입니다. 이 편지를 받은 사람은 행운이 깃들 것입니다. 힘들겠지만 좋은 게 좋다고 생각하세요. 7년의 행운을 빌면서...',
    date: 1652054400000,
  },
];

function App() {
  
  useEffect(() => {
    localStorage.setItem('obj', JSON.stringify({ value: 30 }));
  }, []);

  const [data, dispatch] = useReducer(reducer, dummyData);
  // useReducer(콜백함수, 기본값)
  // console.log(new Date().getTime()); 더미데이터 체크용

  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        emotion,
        content,
        date: new Date(date).getTime(),
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        emotion,
        content,
        date: new Date(date).getTime(),
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className='App'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
              {/* <Route path='/diary' element={<Home />} /> */}
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
