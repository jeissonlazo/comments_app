import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { FaHeart, FaReply, FaEdit, FaTrash, FaRegHeart } from 'react-icons/fa';
import { usePost } from '../context/PostContext';
import CommentList from './CommentList';
import { useState } from 'react';
import { CommentForm } from './CommentForm';
import { useAsyncFn } from '../hooks/useAsync';
import {
  createComment,
  updateComment,
  deleteComment,
  toggleCommentLike,
} from '../services/comments';
import { useUser } from '../hooks/useUser';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});
function Comment({ id, message, user, createdAt, likeCount, likedByMe }) {
  // eslint-disable-next-line no-unused-vars
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    post,
    getReplies,
    createLocalComment,
    updateLocalComment,
    deleteLocalComment,
    toggleLocalCommentLike,
  } = usePost();
  const areChildrenComments = false;
  const createCommentFn = useAsyncFn(createComment);
  const updateCommentFn = useAsyncFn(updateComment);
  const deleteCommentFn = useAsyncFn(deleteComment);
  const toggleLocalCommentLikeFn = useAsyncFn(toggleCommentLike);

  const childrenComments = getReplies(id);

  function onCommentReply(message) {
    return createCommentFn
      .execute({ postId: post.id, message, parentId: id })
      .then((comment) => {
        setIsReplying(false);
        createLocalComment(comment);
      });
  }

  function onCommentUpdate(message) {
    return updateCommentFn
      .execute({ postId: post.id, message, id })
      .then((comment) => {
        setIsEditing(false);
        updateLocalComment(id, comment.message);
      });
  }

  function onCommentDelete() {
    return deleteCommentFn.execute({ postId: post.id, id }).then((comment) => {
      deleteLocalComment(comment.id);
    });
  }

  function onToggleCommentLike() {
    return toggleLocalCommentLikeFn
      .execute({ id, postId: post.id })
      .then(({ addLike }) => {
        toggleLocalCommentLike(id, addLike);
      });
  }
  return (
    <>
      <div className="comment">
        <div className="header">
          <span className="name">{user.name}</span>
          <span className="date">
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>
        {isEditing ? (
          <CommentForm
            autoFocus
            initialValue={message}
            onSubmit={onCommentUpdate}
            loading={updateCommentFn.loading}
            error={updateCommentFn.error}
          />
        ) : (
          <div className="message">{message}</div>
        )}
        <div className="footer">
          <IconButton
            onClick={onToggleCommentLike}
            disabled={toggleLocalCommentLikeFn.loading}
            Icon={likedByMe ? FaHeart : FaRegHeart}
            aria-label={likedByMe ? 'unlike' : 'like'}
          ></IconButton>
          <IconButton
            isActive={isReplying}
            onClick={() => setIsReplying((prev) => !prev)}
            Icon={FaReply}
            aria-label={isReplying ? 'cancel is Reply' : 'Reply'}
          ></IconButton>
          {user.id && (
            <>
              <IconButton
                onClick={() => setIsEditing((prev) => !prev)}
                isActive={isEditing}
                Icon={FaEdit}
                aria-label={isEditing ? 'cancel is edit' : 'edit'}
              ></IconButton>
              <IconButton
                Icon={FaTrash}
                aria-label="Delete"
                color="danger"
                disabled={deleteCommentFn.loading}
                onClick={() => onCommentDelete()}
              ></IconButton>
            </>
          )}
        </div>
        {deleteCommentFn.error && (
          <div className="error-msg mt-1">{deleteCommentFn.error}</div>
        )}
      </div>
      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm
            authFocus
            onSubmit={onCommentReply}
            loading={createCommentFn.loading}
            error={createCommentFn.error}
          />
        </div>
      )}
      {childrenComments?.length > 0 && (
        <>
          <div
            className={`nested-comments-stack ${
              areChildrenComments ? 'hide' : ''
            }`}
          >
            <button
              className="collapse-line"
              aria-label="hide relpies"
              onClick={() => setAreChildrenHidden(true)}
            ></button>
            <div className="nested-comments">
              <CommentList comments={childrenComments}></CommentList>
            </div>
          </div>
          <button
            className={`btn mt-1 ${!areChildrenComments ? 'hide' : ''}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            show replies
          </button>
        </>
      )}
    </>
  );
}
Comment.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
  user: PropTypes.object,
  createdAt: PropTypes.string,
  likedByMe: PropTypes.bool,
  likeCount: PropTypes.number,
};
export default Comment;
