import { Link } from 'react-router-dom';
// 리액트 라우터에서 제공하는 컴포넌트(csr 방식)
// 장고에서 path 설정이랑 url 설정 같군요.. spa라는 차이점이 있을뿐

const RouteTest = () => {
  return (
    <>
      <br />
      <Link to={'/'}>Home</Link>
      <br />
      <Link to={'/new'}>New</Link>
      <br />
      <Link to={'/diary/:id'}>Diary</Link>
      <br />
      <Link to={'/edit'}>Edit</Link>
      {/* html의 <a> 태그는 ssr 방식 */}
    </>
  );
};

export default RouteTest;
