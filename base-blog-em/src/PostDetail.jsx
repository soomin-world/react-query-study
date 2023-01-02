import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery

  const { data, isError, isLoading } = useQuery(["comments", post.id], () =>
    fetchComments(post.id)
  );

  const deleteMutation = useMutation((postId) => deletePost(postId));

  const updateMutation = useMutation((postId) => updatePost(postId));
  //

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <h3>에러발생!!!!</h3>;
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>
        Delete
      </button>{" "}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>Error deleting the post</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: "purple" }}>Error deleting the post</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>Post has not been deleted</p>
      )}
      {updateMutation.isError && (
        <p style={{ color: "red" }}>Error deleting the post!</p>
      )}
      {updateMutation.isLoading && (
        <p style={{ color: "purple" }}>Error deleting the post!</p>
      )}
      {updateMutation.isSuccess && (
        <p style={{ color: "green" }}>Post has not been deleted!</p>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
