const ListOfPosts = async () => {
  const getPostData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
  };

  const getUsersData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    return res.json();
  };
  //   const posts = await getPostData();
  const [posts, users] = await Promise.all([getPostData(), getUsersData()]);
  console.log('users');

  return (
    <div>
      {posts.map((post: any) => {
        return <p>{post.title}</p>;
      })}

      <div>
        <h1>USERS</h1>
        {users.map((user: any) => {
          return <p>{user.name}</p>;
        })}
      </div>
    </div>
  );
};

export default ListOfPosts;
