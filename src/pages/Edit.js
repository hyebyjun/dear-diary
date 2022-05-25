import { useContext, useEffect, useState } from 'react'; // diaryList 받아와야함
import { DiaryStateContext } from '../App'; // diaryList 받아와야함
import { useNavigate, useParams } from 'react-router-dom';
import DiaryEditor from '../components/DiaryEditor';

const Edit = () => {
  const [originData, setOriginData] = useState();

  const navigate = useNavigate();
  const { id } = useParams();
  console.log('지금 게시글 id :', id);

  const diaryList = useContext(DiaryStateContext);
  console.log(diaryList);

  // 1번 게시글이 마운트될때 1번 수정창이 떠야 되니까?
  useEffect(() => {
    if (diaryList.length >= 1) {
      // 일기데이터가 1개라도 있을 경우 활성화
      // const targetDiary = diaryList.find((it) => it.id === id);
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id) // 버그 방지 parserInt
      );
      console.log(targetDiary);

      // 그러나 여기까지면 실제 없는 9번 게시글 입력 시에도 나옴
      // 존재하지 않는 게시글 id로 접근 시 막아줘야한다
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert('존재하지 않는 게시글입니다.');
        navigate('/', { replace: true });
        // 없는 id로 접근 시, 메인으로 보내버리기
        // + 거기서 뒤로가기 눌러도 잘못된 접근 시도 페이지로 못 가게 막음
      }
    }
  }, [id, diaryList]);
  // [id, diaryList] 아이디나 리스트가 변하면 꺼내오는 데이터가 달라지므로?

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
