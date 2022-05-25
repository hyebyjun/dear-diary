const MyButton = ({ text, type, onClick }) => {

  const btnType = ['positive', 'negative'].includes(type) ? type : 'default';
  /* 만약 컴포넌트 생성 시 실수로 포지, 네거, 디폴트 외의 타입을 입력할 때,
    그 잘못 입력된 값이 알아서 default로 강제변환처리 되로록 하는 구문*/

  return (
    <button // 클래스네임은 문자열이어야 하므로 string처리를 위한 .join..
      className={['MyButton', `MyButton_${btnType}`].join(' ')}
      onClick={onClick} // 그러면 최종 'MyButton MyButton_타입명'의 클래스네임 생성
    >
      {text}
    </button>
  );
};

// 타입 프롭이 전달되지 않을 경우 디폴트로 간주하도록 설정
MyButton.defaultProps = {
  type: 'default',
};

export default MyButton;
