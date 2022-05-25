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
  localStorage.setItem('diary', JSON.stringify(newState));
  // 새로운 액션 시 모든 변경값을 로컬 스토리지 저장하기
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  // 원래 초기값 data였던 dummy를 삭제하고 빈 배열로 시작.

  // 새로고침 후에도 로컬로부터 아이템 렌더 갖고오기 구현 필요
  useEffect(() => {
    const localData = localStorage.getItem('diary');
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      // 가장 최근 아이디에서 +1 하는 현재아이디 만들기
      // 제일 쉬운 방법은 52번 코드를 통해 정렬해두기

      if (diaryList.length >= 1) { // 빈 배열일 때 0번 인덱스 접근할 수 없으니 오류 방지 조건문
        dataId.current = parseInt(diaryList[0].id) + 1;
        // 그리고 정렬된 첫번째 값에서 + 1 하면 최단경로?ㅎ
      }

      // console.log(diaryList);
      // console.log(dataId);

      dispatch({ type: 'INIT', data: diaryList });
    }
  }, []);

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
              <Route path='/diary' element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
