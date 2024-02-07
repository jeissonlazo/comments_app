import { makeRequest } from "./makeRes"

function getPosts(){
  return makeRequest("/posts")
}


function getPost(id) {
  return makeRequest(`/posts/${id}`);
}

export { getPosts, getPost };