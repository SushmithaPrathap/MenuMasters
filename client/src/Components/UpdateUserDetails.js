import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userUpdate } from '../Utils/auth-api';
import { useNavigate} from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';

const theme = createTheme();

export default function UpdateUserDetails() {

  const navigate = useNavigate();

  let user = useSelector((state) => state.user) ;
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: user.user.name,
      email: user.user.email,
      password: data.get('password'),
      height: data.get('height'),
      weight: data.get('weight')

    });

    let resp = await userUpdate(data.get('firstName'), data.get('email'), data.get('password'), data.get('height'), data.get('weight'))
    if(resp.msg == 'ok')
    {
        console.log('Update details is successful')
        navigate('/homepage');

    }
    else{
        console.log('Registration not successful')
        alert('Values not correct wrong')
    }

  };











  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Your details
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Name"   
                  value = {user.user.name}          
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value = {user.email} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="height"
                  label="Height"
                  type="height"
                  id="height"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="weight"
                  label="Weight"
                  type="weight"
                  id="weight"
                   />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
