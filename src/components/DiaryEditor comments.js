import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { DiaryDispatchContext } from '../App.js';

import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: '최악',
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: '나쁨',
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: '보통',
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: '좋음',
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: '최고',
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
}; // date를 yyyy-mm-dd 형식으로

// * 여기가 본진
const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState(3);

  const [date, setDate] = useState(getStringDate(new Date()));
  const navigate = useNavigate();

  // [2] 아래 handleSubmit을 위한.. onCreate땡겨오기
  const { onCreate } = useContext(DiaryDispatchContext);

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    } // 그게 아니면 onCreate 함수를 실행해야함. [1]
    // 그러려면 onCreate 짰던 App.js로부터 갖고와야됨..
    // 또 그러려면... 프롭 타고타고 말고 깔끔하게 갖고오려고 해둔 context를.. 쓴다..
    onCreate(date, content, emotion);
    navigate('/', { replace: true }); // 그냥 돌아가기 말고, 뒤로 가기를 못하게? ??
  };

  // console.log(getStringDate(new Date()));
  // 잘 나오는 거 확인했으니까 ㅎㅎ

  return (
    <div className='DiaryEditor'>
      <MyHeader
        headText={'새로운 일기'}
        leftChild={<MyButton text={'<'} onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>오늘은 며칠인가요?</h4>
          <div className='input_box'>
            <input
              className='input_date'
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              type='date'
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className='input_box emotion_list_wrapper'>
            {emotionList.map((it) => (
              // <div key={it.emotion_id}>{it.emotion_descript}</div>
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className='input_box text_wrapper'>
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={'오늘은 어땠나요?'}
            />
          </div>
        </section>
        <section>
          <div className='control_box'>
            <MyButton
              text={'취소'}
              onClick={() => {
                navigate(-1);
              }}
            />
            <MyButton text={'등록'} type={'positive'} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
