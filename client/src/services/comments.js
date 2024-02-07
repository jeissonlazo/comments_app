import { makeRequest } from './makeRes';

function createComment({ postId, message, parentId }) {
  return makeRequest(`posts/${postId}/comments`, {
    method: 'POST',
    data: { message, parentId },
  });
}

function updateComment({ postId, message, id }) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: 'PUT',
    data: { message },
  });
}

function deleteComment({ postId, id }) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: 'DELETE',
  });
}

function toggleCommentLike ({id,postId}){
  return makeRequest(`/post/${postId}/comments/${id}/toggleLike`,{
    method: 'POST'
  }
  )
}
export { createComment, updateComment, deleteComment, toggleCommentLike };