import Post from "./BlogPost"; //importing the Blog post components
import "../../Style/blogposts.scss"; //Importing blogposts scss file

//function which renders the Blog posts list
export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} />
      ))}
    </div>
  );
}
