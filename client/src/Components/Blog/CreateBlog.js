import "../../Style/blogwrite.scss"; //import blogwrite scss file
import { useState } from "react"; //import useState from react
import axios from "axios"; ////import axios for api calls
import { useSelector, useDispatch } from "react-redux"; //importing useSelector and useDispatch from react-redux
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const Item = styled(TextField)(() => ({
  backgroundColor: "#fff",
  height: "30px",
  border: "0px",
  margin: "10px 5px",
  fontSize: "15px",
  borderRadius: "5px",
  width: "100%",
  border: "0px",
  alignItems: "center",
  justifyContent: "center",
}));

//Function to render Write function
export default function Write() {
  const [title, setTitle] = useState(""); //state variable for title
  const [desc, setDesc] = useState(""); //state variable for desc
  const [file, setFile] = useState(null); //state variable in order to upload image
  let user = useSelector((state) => state.user); //This basically gets the contextof the logged in user
  console.log(user);
  const navigate = useNavigate();

  //This function is invoked on form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.user.name,
      title,
      desc,
    };
    if (file) {
      const data = new FormData(); //Image upload requires form data
      const filename = Date.now() + file.name;
      data.append("name", filename); //append the filename
      data.append("file", file); //append the file
      newPost.photo = filename; //saving photo to dB
      try {
        await axios.post("http://localhost:8000/upload", data); //api for uploading the image
      } catch (err) {}
    }
    console.log(newPost);
    try {
      const res = await axios.post(
        "http://localhost:8000/blog/create", //api for creating the blog
        newPost
      );
      navigate("/bloghome"); //once created it will redirect
    } catch (err) {}
  };

  const clear = () => {
    setTitle("");
    setFile(null);
    setDesc("");
  };

  //returns the create blog component
  return (
    <div className="write">
      <div className="add-modal">
        <div className="input-div">
          <label>Blog Title: </label>
          <Item
            type="text"
            required
            id="title"
            name="title"
            value={title}
            InputProps={{
              className: "input-field-blog",
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
              className: "input-field-blog",
            }}
            onChange={(e) => setDesc(e.target.value)}
            //   className="input-field"
          />
        </div>
        <div className="input-div">
          <label>Add Image: </label>
          <input
            type="file"
            id="fileInput"
            // style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}

        <div class="submit-div">
          <button
            id="submit-btn"
            type="submit"
            class="clear-btn"
            onClick={() => clear()}
          >
            Cancel
          </button>
          <button
            id="submit-btn"
            type="submit"
            class="create-btn"
            onClick={(e) => handleSubmit(e)}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
