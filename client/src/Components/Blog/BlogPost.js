import "../../Style/blogpost.scss"; //importing blogpost scss file
import { Link } from "react-router-dom"; //importing link from react-router-dom

export default function Post({ post }) {
  //we define the blogpost function
  const PF = "http://localhost:8000/images/"; //We use the URL to retrieve the images

  // Renders BlogPost component with data from Api
  return (
    <Link to={`/blogsingle/${post._id}`} className="link">
      <div className="post">
        {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
        <div className="postInfo">
          <h2 className="postTitle">{post.title}</h2>
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
          <p className="postDesc">{post.desc}</p>
        </div>
      </div>
    </Link>
  );
}
