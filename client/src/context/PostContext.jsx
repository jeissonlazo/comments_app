import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useAsync } from '../hooks/useAsync';
import { getPost } from '../services/post';
import { useParams } from 'react-router-dom';

const Context = React.createContext();
export function usePost() {
  return useContext(Context);
}


// eslint-disable-next-line react/prop-types
export function PostProvider({ children }) {
  const { id } = useParams();
  const { loading, error, value: post } = useAsync(() => getPost(id), [id]);
  const [comments, setComments] = useState([]);
  const commentsByParentId = useMemo(() => {
    if (post?.comments == null) return [];
    const group = {};
    comments.forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
    return group;
  }, [comments]);


  useEffect(()=>{
    if(post?.comments == null) {return}
    setComments(post.comments)
  }, [post?.comments])

  function getReplies(parentId) {
    return commentsByParentId[parentId];
  }

  function createLocalComment(comment){
    setComments(prevComments =>{
      return [comment, ...prevComments]
    })
  }

  function updateLocalComment(id, message) {
    setComments(prevComments => {
      return prevComments.map(comment =>{
        if(comment.id == id){
          return {...comment, message}
        }
        else {
          return comment
        }
      })
    })
  }

  function deleteLocalComment(id){
    setComments(prevComments =>{
      return prevComments.filter(comment => comment.id !== id)
    })
  }

  function toggleLocalCommentLike(id, addLike) {
    setComments(prevComments => {
      return prevComments.filter(comment =>{
        if(id === comment.id){
          if(addLike){
            return{
              ...comment,
              likeCount: comment.likeCount + 1,
              likeByMe:true
            }
          }else{
            return {
              ...comment,
              likeCount: comment.likeCount - 1,
              likeByMe: false
            }
          }
        }
        else{
          return
        }
      })
    })
  }
  return (
    <Context.Provider
      value={{
        post: { id, ...post },
        getReplies,
        rootComments: commentsByParentId[null],
        createLocalComment, 
        updateLocalComment,
        deleteLocalComment, 
        toggleLocalCommentLike
      }}
    >
      {loading ? (
        <h1>loading</h1>
      ) : error ? (
        <h1 className="error-msg">error</h1>
      ) : (
        children
      )}
    </Context.Provider>
  );
}
