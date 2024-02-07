import { getPosts } from "../services/post"
import { Link } from "react-router-dom"
import { useAsync } from "../hooks/useAsync"
function Posts() {
  const {loading, error, value:posts} = useAsync(getPosts)

  if (loading) return <h1>Loading</h1>
  if (error) return <h1>error</h1>

  return posts.map(post =>{
    return (
      <h1 key={posts.id}>
        <Link to={`/post/${post.id}`}>{post.title} test</Link>
      </h1>
    )
  })
}

export default Posts