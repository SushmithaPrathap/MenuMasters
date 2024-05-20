import { useEffect, useState } from "react"; //importing useEffect and useState functions from react
import BlogHeader from "./BlogHeader"; //importing blog header component
import BlogSideBar from "./BlogSideBar"; //importing blogsidebar component
import Posts from "./BlogPosts"; //importing blogpost component
import "../../Style/bloghome.scss"; //importing bloghome scss file
import axios from "axios"; //axios to get data from api
import { useLocation } from "react-router"; //importing useLocation function from react router

export default function Home() {
  const [posts, setPosts] = useState([]); //creating posts state variable
  const { search } = useLocation(); //search for useLocation

  useEffect(() => {
    //on page load all blog details will be loaded
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:8000/" + "blog/list");
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  //renders the blog home component
  return (
    <div style={{ margin: "70px 0px", backgroundColor: "whitesmoke" }}>
      <BlogHeader />
      <div className="home">
        <Posts posts={posts} />
        {/* <BlogSideBar /> */}
      </div>
    </div>
  );
}
