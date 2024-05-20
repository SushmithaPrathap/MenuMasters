import React from 'react' //importing react from react
import Button from "@mui/material/Button"; //import button from material ui
import { deleteTodoAsync } from '../../Utils/grocery-api'; // importing delete todo function from Utils

import { useSelector, useDispatch } from 'react-redux';  //importing useSelector and useDispatch function
import './gro.scss'

const GroceryItem = ({id, title}) => {   //

  const dispatch = useDispatch();

  console.log('grocery item',id)

const handleDeleteClick = () => {
    dispatch(deleteTodoAsync({ id:id }));
};

  return (
    <div className='gro-item'>
      
        <span className='gro-title'>
            {title}

        </span>
        <span className='gro-btn'>
            <Button variant='outline' onClick={handleDeleteClick}> Done</Button>
        </span>
    </div>
  )
}

export default GroceryItem