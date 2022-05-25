import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';
// 당연한 말이지만 만든 라우터테스트 컴포넌트 임포트 해야됩니다.
import RouteTest from './components/RouteTest';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <MyHeader
          headText={'App'}
          leftChild={
            <MyButton text={'왼쪽 버튼'} onClick={() => alert('왼쪽 클릭')} />
          }
          rightChild={
            <MyButton
              text={'오른쪽 버튼'}
              onClick={() => alert('오른쪽 클릭')}
            />
          }
        />
        <h2>App.js</h2>

        <MyButton
          text={'등록'}
          type={'positive'}
          onClick={() => {
            alert('등록');
          }}
        />
        <MyButton
          text={'삭제'}
          type={'negative'}
          onClick={() => {
            alert('삭제');
          }}
        />
        <MyButton
          text={'수정'}
          onClick={() => {
            alert('수정');
          }}
        />
        <Routes>
          {/* Route : url 경로와 컴포넌트를 매핑해주는 컴포넌트 */}
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path='/edit' element={<Edit />} />
          {/* <Route path='/diary' element={<Diary />} />
              에서 diary/1 혹은 diary/2 등 id 달아야 할 경우 아래처럼 */}
          <Route path='/diary/:id' element={<Diary />} />
          {/* 단 :id를 붙이면 diary/n 으로 id가 무조건 있어야되므로
              id가 없는 그냥 /diary 자체는 동작하지 않습니다..
              동작하게 하려면 아래처럼 단독 path 설정해주기 */}
          <Route path='/diary' element={<Diary />} />
        </Routes>
        <RouteTest />
      </div>
    </BrowserRouter>
  );
}

export default App;
