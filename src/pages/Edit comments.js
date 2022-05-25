import { useNavigate, useSearchParams } from 'react-router-dom';

const Edit = () => {
  // 앞의 배열 [A, setA]는 바꿔도 됨

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  // useParams()와 useSearchParams()는 다릅니다.
  // 쿼리스트링을 바꿔줄 수 있는 상태변화함수

  const id = searchParams.get('id');
  const mode = searchParams.get('mode');
  const who = searchParams.get('who');

  console.log('id :', id);
  console.log('mode :', mode);
  console.log('who :', who);

  return (
    <>
      <h1>Edit</h1>
      <p>여기는 수정페이지</p>
      <button onClick={() => setSearchParams({ who: 'hyexjun' })}>
        QS 바꾸기
      </button>

      {/* 원래 눌렀을 때 url 링크? 이동은 link태그를 사용하지만
          강제이동하는 useNavigate를 써보겠다 */}
      <button onClick={() => navigate('/')}>Home으로 가기</button>
      {/* 링크 클릭이랑 뭔 차인가 싶지만, 링크는 내가 거기로 가겠다는 의지로 클릭 후 이동이고
          이건 onClick에 함수를 써서 비슷해보이는 거지,
          다른 이벤트 발생 시 네비게이트 설정하면 강제이동이 가능해진다는 뜻인듯? */}
      <button onClick={() => navigate(-1)}>뒤로 가기</button> {/* -1이 뒤로 가기인가봐.. 몰라.. */}
    </>
  );
};

export default Edit;
