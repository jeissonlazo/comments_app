
import PropTypes from 'prop-types';
import Comment  from './Comment'
function CommentList({ comments }) {
  return (
    <>
      {
        comments.map(comment =>(
          <div key={comment.id} className='comment-stack'>
            <Comment {...comment}/>
          </div>
        ))
      }
    </>
  )
}

CommentList.propTypes = {
  comments: PropTypes.array,
};

export default CommentList