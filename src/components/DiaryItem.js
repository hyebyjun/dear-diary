import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from './MyButton';

const DiaryItem = ({ id, emotion, content, date }) => {
  // const env = process.env;
  // env.PUBLIC_URL = env.PUBLIC_URL || '';

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };
  const 생략 = (it) => {
    if (it.length > 25) {
      return it + ' ...';
    } else {
      return it;
    }
  };

  return (
    <div className='DiaryItem'>
      <div
        className={[
          'emotion_img_wrapper',
          `emotion_img_wrapper_${emotion}`,
        ].join(' ')}
        onClick={goDetail}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div className='info_wrapper' onClick={goDetail}>
        <div className='diary_date'>{strDate}</div>
        <div className='diary_content_preview'>
          {생략(content.slice(0, 35))}
        </div>
      </div>
      <div className='btn_wrapper'>
        <MyButton text={'Edit'} onClick={goEdit} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
