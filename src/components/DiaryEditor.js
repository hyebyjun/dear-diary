import { useNavigate } from 'react-router-dom';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { DiaryDispatchContext } from './../App.js';
import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';
import emotionList from '../util/emotion';

// const env = process.env;
// env.PUBLIC_URL = env.PUBLIC_URL || '';
// const emotionList = [
//   {
//     emotion_id: 1,
//     emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
//     emotion_descript: '최악',
//   },
//   {
//     emotion_id: 2,
//     emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
//     emotion_descript: '나쁨',
//   },
//   {
//     emotion_id: 3,
//     emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
//     emotion_descript: '보통',
//   },
//   {
//     emotion_id: 4,
//     emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
//     emotion_descript: '좋음',
//   },
//   {
//     emotion_id: 5,
//     emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
//     emotion_descript: '최고',
//   },
// ];

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
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? '일기를 수정하시겠습니까?' : '일기를 등록하시겠습니까?'
      )
    ) {
      if (!isEdit) {
        // 수정중이 아닐 때 = 새일기 작성일 때
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    // onCreate(date, content, emotion); // [1] 그게 아니면 onCreate 함수를 실행해야함.
    navigate('/', { replace: true }); // [3] 그냥 돌아가기 말고, 뒤로 가기를 못하게? ??
  };

  const handleRemove = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onRemove(originData.id);
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      // Edit.js로부터 받아온 isEdit={true}면,
      // 4번 일기 수정 url이면 4번 일기 데이터가 나와야하므로
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className='DiaryEditor'>
      <MyHeader
        headText={isEdit ? 'E d i t . D i a r y' : 'N e w . D i a r y 🍕'}
        // headText={isEdit ? originData.id+'번 일기 수정하기' : '새로운 일기'}
        leftChild={<MyButton text={'<'} onClick={() => navigate(-1)} />}
        rightChild={
          isEdit && (
            <MyButton text={'Del'} type={'negative'} onClick={handleRemove} />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 며칠인가요? 📆</h4>
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
          <h4>오늘의 감정 😎</h4>
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
          <h4>오늘의 기록 📝</h4>
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
              text={'Cancel'}
              onClick={() => {
                navigate(-1);
              }}
            />
            <MyButton text={'Submit'} type={'positive'} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
