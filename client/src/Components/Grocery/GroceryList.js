import React, { useState, useEffect } from 'react'
import  Grid  from "@mui/material/Grid";
import  TextField  from "@mui/material/TextField";
import  Paper  from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useSelector, useDispatch } from 'react-redux';

import { getGroceyAsync, addGroceryAsync } from '../../Utils/grocery-api';

import GroceryItem from './GroceryItem'
import './gro.scss'



const GroceryList = () => {

  //State for user 
  let user = useSelector((state) => state.user) ;
  console.log('Grovery list user',user.user.name);
  

  const defaultValues = {
    name: ""
  };

  const dispatch = useDispatch();
  let groceryState = useSelector((state) => {
    return state["grocery"]
  }) ;

  let groceryList = groceryState.list;

  let userGroceryList = []

  for(let i of groceryList){
    if(i.userId == user.user._id){
      userGroceryList.push(i);
    }
  }

  useEffect(() => {
		dispatch(getGroceyAsync());
	}, [dispatch]);

  
  const [formValues, setFormValues] = useState(defaultValues);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('form',formValues.name); 

    let data = {
      comment:formValues.name,
      userId: user.user._id
    }
    
    dispatch(addGroceryAsync(data))
    
  };

  


  return (
    <div>
      <div className='main'>
        <form onSubmit={handleSubmit}>
            <Grid container alignItems="center" justify="center" direction="column">
              <Grid item>

              <Typography
                  style={{
                    fontSize: "30px",
                    color: "#404040",
                    fontWeight: "600",
                    margin: "10px",
                  }}
                  variant="h1"
                  gutterBottom
                >
                  Add Grocery List
                </Typography>


              <Typography
                  style={{
                    fontSize: "20px",
                    color: "#404040",
                    fontWeight: "600",
                    margin: "10px",
                  }}
                  variant="h4"
                  gutterBottom
                >
                  <TextField
                  id="name-input"
                  name="name"
                  label="Add Grocery"
                  type="text"
                  value={formValues.name}
                  onChange={handleInputChange}
                />
                    <Button variant="text"  type="submit" className='btn'>
                      Post
                    </Button>
                </Typography>
                
                
              </Grid>
              
              {
                userGroceryList.map((grocery)=>(
                  <p>
                      <GroceryItem title={grocery.title} id ={grocery._id}/>
                      {/* {grocery.title} */}
                  </p>
                ))
              }
            </Grid>
          </form>
    </div>
    </div>
  )
}

export default GroceryList