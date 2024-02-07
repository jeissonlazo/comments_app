import PropTypes from 'prop-types';
function IconButton({ Icon, isActive, color, children, ...props }) {
  return (
    <button
      className={`btn icon-btn ${isActive ? 'icon-btn-active' : ''} ${
        color || ''
      }`}
      {...props}
    >
      <span className={`${children != null ? 'mr-1' : ''}`}>
        <Icon ></Icon>
      </span>
      {children}
    </button>
  );
}

IconButton.propTypes = {
  Icon: PropTypes.func,
  isActive: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.func,
  props: PropTypes.object,
};
export default IconButton;
