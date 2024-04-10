const Button = (props) => {
  const { type, className, onClick, disabled } = props;
  const classes = `button ${className}`;

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {props.children}
    </button>
  );
};

export default Button;
