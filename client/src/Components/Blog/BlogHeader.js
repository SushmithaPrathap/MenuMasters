import "../../Style/blogheader.scss"; //Importing scss file for blogheader
import blog from "../../images/blog.jpeg";

export default function Header() {
  //defining the blog header component
  return (
    <div className="header">
      <img //adding image in the header section
        className="headerImg"
        // src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        src={blog}
        alt=""
      />
      <div className="blog-text">
        <h2>Blog</h2>
      </div>
    </div>
  );
}
