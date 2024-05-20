import axios from "axios"; //import axios for api calls
import { useContext, useEffect, useState } from "react"; //importing useEffect and useState functions from react
import { useLocation } from "react-router"; //importing useLocation function from react router
import { useSelector, useDispatch } from "react-redux"; //importing useSelector and useDispatch from react-redux
import { Link } from "react-router-dom"; //importing Link from react-router-dom
import "../../Style/blogsinglepost.scss"; //import blogsinglepost scss file
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useNavigate} from 'react-router-dom';

const Item = styled(TextField)(() => ({
  backgroundColor: "#fff",
  height: "30px",
  border: "0px",
  margin: "10px 5px",
  fontSize: "15px",
  borderRadius: "5px",
  width: "30vw",
  border: "0px",
  alignItems: "center",
  justifyContent: "center",
}));

//Function to render BlogSinglePost function
export default function SinglePost() {
  const location = useLocation(); //locate a specific part of the URL
  const path = location.pathname.split("/")[2]; //finds the slash and returns the array in this case an id
  const [post, setPost] = useState({}); //state variable for post
  const PF = "http://localhost:8000/images/"; //this url will be used to get images
  const [title, setTitle] = useState(""); //state variable for title
  const [desc, setDesc] = useState(""); //state variable for desc
  const [updateMode, setUpdateMode] = useState(false); //state variable to check if the user wants to update information
  const navigate = useNavigate();

  let user = useSelector((state) => state.user); //This basically gets the contextof the logged in user

  const getPost = async () => {
    const res = await axios.get("http://localhost:8000/blog/" + path);
    console.log(res.data);
    setPost(res.data);
    setTitle(res.data.title);
    setDesc(res.data.desc);
  };

  //page load display the single post
  useEffect(() => {
    getPost();
  }, [path]);

  //handleDelete used to delete a bog post
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/blog/delete/${post._id}`, {});
      navigate("/bloghome");
    } catch (err) {}
  };

  //handleUpdate used to update a bog post
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/blog/update/${post._id}`, {
        title,
        desc,
      });
      setUpdateMode(false);
      navigate("/bloghome");
    } catch (err) {}
  };

  //returns the blogsinglepost component
  return (
    <div className="singlePost">
      <div className="inner-div">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}

        <div className="blog-div">
          <div>
            <h1>{post.title}</h1>
            <h4>By {post.username}</h4>
            <h6>Updated At {post.updatedAt}</h6>
          </div>
          <div>
            <Button
              variant="contained"
              style={{ margin: "10px", fontSize: "15px" }}
              onClick={() => setUpdateMode(true)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              style={{ margin: "10px", fontSize: "15px" }}
              onClick={() => handleDelete()}
            >
              delete
            </Button>
          </div>
        </div>
        <div>
          <p className="postDesc">{post.desc}</p>
        </div>
      </div>

      <Modal
        open={updateMode}
        onClose={() => setUpdateMode(false)}
        slotProps={{ backdrop: "visible" }}
      >
        <div className="edit-modal">
          <div className="input-div">
            <label>Blog Title: </label>
            <Item
              type="text"
              required
              id="title"
              name="title"
              value={title}
              InputProps={{
                className: "input-field",
              }}
              onChange={(e) => setTitle(e.target.value)}
              //   className="input-field"
            />
          </div>
          <div className="input-div">
            <label>Blog Description: </label>
            <Item
              type="text"
              required
              id="desc"
              name="desc"
              value={desc}
              InputProps={{
                className: "input-field",
              }}
              onChange={(e) => setDesc(e.target.value)}
              //   className="input-field"
            />
          </div>

          <div class="submit-div">
            <button
              id="submit-btn"
              type="submit"
              class="clear-btn"
              onClick={() => setUpdateMode(false)}
            >
              Cancel
            </button>
            <button
              id="submit-btn"
              type="submit"
              class="create-btn"
              onClick={() => handleUpdate()}
            >
              Edit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
