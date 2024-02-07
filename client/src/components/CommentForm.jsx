import PropTypes from 'prop-types';
import { useState } from 'react';
function CommentForm({initialValue = '', loading, error, onSubmit, autoFocus = false }) {
  const [message, setMessage] = useState(initialValue)
  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(message).then(() => setMessage(initialValue))
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
        ></textarea>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Loading' : 'Post'}
        </button>
      </div>
      <div className="error-msg">{error}</div>
    </form>
  );
}

CommentForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  autoFocus: PropTypes.bool,
  onSubmit: PropTypes.func,
  initialValue: PropTypes.string
};

export  {CommentForm};
