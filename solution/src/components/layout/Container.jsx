const Container = (props) => {
  let classes = 'container';
  if (props.className) classes += ` ${props.className}`;

  return <div className={classes}>{props.children}</div>;
};

export default Container;
