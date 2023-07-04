import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';
import '../pages/SignIn.css'

const defaultTheme = createTheme()

async function loginUser(credentials) {
    return fetch("https://649b1169bf7c145d0239f5b2.mockapi.io/api/r1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }
  
  export default function Signin() {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await loginUser({
        username,
        password,
      });
      if ("accessToken" in response) {
        swal("Success", response.message, "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          localStorage.setItem("accessToken", response["accessToken"]);
          localStorage.setItem("user", JSON.stringify(response["user"]));
          window.location.href = "/profile";
        });
      } else {
        swal("Failed", response.message, "error");
      }
    }

    return(
        <ThemeProvider theme={defaultTheme}>
            <Grid container  sx={{height: '100vh'}}>
                <CssBaseline />
                <Grid item xs={false} md={7} sx={{backgroundImage: "url(https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)", backgroundSize: "cover", backgroundRepeat: 'no-repeat', backgroundPosition: 'center',}}/>
                <Grid item xs={12} md={5} component={Paper} elevation={6} square>
                    <div className='paper'>
                        <Avatar sx={{margin: (t) => t.spacing(1), backgroundColor: (t) => t.palette.secondary.main}}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">Sign In</Typography>
                        <form className='form' noValidate onSubmit={handleSubmit}>
                            <TextField sx={{margin: '2rem, 0rem, 2 rem'}}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                name="email"
                                label="Email Address"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type='submit' fullWidth variant='contained' color='primary' sx={{margin: (t) => t.spacing(3, 0, 2)}}>Sign In</Button>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

