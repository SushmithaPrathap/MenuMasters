import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function MediaCard(props) {

  let toLink = `/recipe/${props.id}`
  return (
    <Card sx={{ maxWidth: 845 }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        // alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.id}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button> */}
        
        <Button size="small" component={Link} to={toLink} >Learn More</Button>
      </CardActions>
    </Card>
  );
}