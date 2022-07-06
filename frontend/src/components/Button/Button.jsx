import './button.scss';

const Button = (props) => {
  const { onClick, type, style, disabled, children } = props;

  return (
    <button
      onClick={onClick}
      className='btn'
      type={type}
      style={style}
      disabled={disabled}
      data-id={props['data-id']}
    >
      {children}
    </button>
  );
};
export default Button;
