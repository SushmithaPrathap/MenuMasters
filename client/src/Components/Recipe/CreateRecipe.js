import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { recipeCreate } from "../../Utils/recipe-api";
import { useNavigate } from "react-router-dom";
import "../../Style/blogwrite.scss";
import axios from "axios";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import SnackBarComp from "../Common/SnackBar";
import { cuisines, type } from "../Common/arrays";
import Select from "react-select";

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

const defaultValues = {
  name: "",
  description: "",
  duration: "",
  items: "",
  nutrition: "",
  cuisine: "",
  typeVar: "",
};

const CreateRecipe = () => {
  const navigate = useNavigate();
  let cList = cuisines.map((item) => {
    return { value: item, label: item };
  });
  let tList = type.map((item) => {
    return { value: item, label: item };
  });

  const [formValues, setFormValues] = useState(defaultValues);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [dur, setDur] = useState(0);
  const [cus, setCus] = useState("");
  const [typeVar, setType] = useState("");
  const [items, setItems] = useState("");
  const [nutri, setNutri] = useState(0);
  const [open, setOpen] = useState(false);
  const [op, setOp] = useState("");
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({
  //     ...formValues,
  //     [name]: value,
  //   });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("form", formValues);
    // console.log('file', FormData.files[0])
    if (
      title !== "" ||
      desc !== "" ||
      dur !== "" ||
      nutri !== "" ||
      cus.value !== "" ||
      typeVar.value !== ""
    ) {
      console.log(typeof dur, typeof nutri);
      // if (typeof dur === "number" || typeof nutri === "number") {
      let body = {
        name: title,
        description: desc,
        duration: dur,
        cuisine: cus.value,
        type: typeVar.value,
      };
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        body.image = filename;

        let item_raw = items;
        let item_list = item_raw.split(",");
        // console.log('The items -- ',item_list)
        body.items = item_list;

        try {
          await axios.post("http://localhost:8000/upload", data);
        } catch (err) {}
      }
      console.log(body);
      recipeCreate(body);
      alert("New Recipe Posted");

      // let upload = await fetch("http://localhost:5000/upload_files", {
      //   method: 'POST',
      //   body: formValues,
      //   headers: {
      //     "Content-Type": "multipart/form-data"
      //   }
      // })
      // console.log('uploaded data', upload)
      navigate("/explore");
      setOpen(false);
      setOp("");
      // }
      // else {
      //   handleSnack({
      //     value: "Please enter a number for nutrition and duration fields",
      //     status: "error",
      //   });
      // }
    } else {
      handleSnack({
        value: "Please fill all the fields",
        status: "error",
      });
    }
  };

  const clear = () => {
    setTitle("");
    setDesc("");
    setTitle("");
    setCus("");
    setDur("");
    setType("");
    setFile(null);
    setItems("");
  };

  const handleSnack = (value) => {
    setOpen(true);
    setOp(value);
  };

  return (
    <div
      style={{
        margin: "80px 0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100%",
        backgroundColor: "whitesmoke",
      }}
    >
      {/* <form
        style={{
          backgroundColor: "white",
          border: "1px solid #8c8c8c",
          padding: "20px",
        }}
        onSubmit={handleSubmit}
      >
        <div container alignItems="center" justify="center" direction="column">
          {file && (
            <img
              className="writeImg"
              src={URL.createObjectURL(file)}
              alt="photo"
            />
          )}
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Grid item>
            <TextField
              id="name-input"
              name="name"
              label="Name"
              type="text"
              value={formValues.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="description-input"
              name="description"
              label="Description"
              type="text"
              value={formValues.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="duration-input"
              name="duration"
              label="duration"
              type="text"
              value={formValues.duration}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="items-input"
              name="items"
              label="items"
              type="text"
              value={formValues.items}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="nutrition-input"
              name="nutrition"
              label="nutrition"
              type="text"
              value={formValues.nutrition}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="cuisine-input"
              name="cuisine"
              label="cuisine"
              type="text"
              value={formValues.cuisine}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="type-input"
              name="type"
              label="type"
              type="text"
              value={formValues.type}
              onChange={handleInputChange}
            />
          </Grid>

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form> */}
      <h1>Create a new recipe</h1>

      <div className="add-modal">
        <div className="input-div">
          <label>Name: </label>
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
          />
        </div>
        <div className="input-div">
          <label>Description: </label>
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
          />
        </div>
        <div className="input-div">
          <label>Duration: </label>
          <Item
            type="text"
            required
            id="dur"
            name="dur"
            value={dur}
            InputProps={{
              className: "input-field-blog",
            }}
            onChange={(e) => setDur(e.target.value)}
          />
        </div>
        <div className="input-div">
          <label>Cuisine: </label>
          {/* <Item
            type="text"
            required
            id="cus"
            name="cus"
            value={cus}
            InputProps={{
              className: "input-field-blog",
            }}
            onChange={(e) => setCus(e.target.value)}
          /> */}
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={""}
            name="Cuisines"
            options={cList}
            onChange={(item) => {
              //   console.log(item);
              setCus(item);
            }}
            value={cus}
          />
        </div>
        <div className="input-div">
          <label>Type: </label>
          {/* <Item
            type="text"
            required
            id="type"
            name="type"
            value={type}
            InputProps={{
              className: "input-field-blog",
            }}
            onChange={(e) => setType(e.target.value)}
          /> */}
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={""}
            name="Type"
            options={tList}
            onChange={(item) => {
              //   console.log(item);
              setType(item);
            }}
            value={typeVar}
          />
        </div>
        <div className="input-div">
          <label>Items: </label>
          <Item
            type="text"
            required
            id="items"
            name="items"
            value={items}
            InputProps={{
              className: "input-field-blog",
            }}
            onChange={(e) => setItems(e.target.value)}
          />
        </div>
        <div className="input-div">
          <label>Nutrition: </label>
          <Item
            type="text"
            required
            id="nutri"
            name="nutri"
            value={nutri}
            InputProps={{
              className: "input-field-blog",
            }}
            onChange={(e) => setNutri(e.target.value)}
          />
        </div>
        <div className="input-div">
          <label>Add Image: </label>
          {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}
          <input
            type="file"
            id="fileInput"
            // style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>


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
      <SnackBarComp open={open} close={() => setOpen(false)} operation={op} />
    </div>
  );
};

export default CreateRecipe;
