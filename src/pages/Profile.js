import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../pages/Profile.css'

const defaultTheme = createTheme()

export default function Profile() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const user = JSON.parse(localStorage.getItem("user"));

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return ( 
        <ThemeProvider theme = { defaultTheme }>
            <div className='root'>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h6' sx={{flexGrow: 1}}>Profile</Typography>
                        <div>
                            <IconButton onClick={handleMenu} color='inherit'>
                                <Avatar src={user.avatar}/>
                            </IconButton>
                            <Menu id='menu-appbar' anchorEl={anchorEl} open={open} onClose={handleClose}>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <Card variant='outlined' sx={{flexGrow: 1}}>
                    <CardContent>
                        <Avatar src={user.avatar} sx={{width: (t) => t.spacing(20), height: (t) => t.spacing(20)}}/>
                        <Typography variant='h5'>Welcome {user.fname} {user.lname}</Typography>
                    </CardContent>
                </Card>
            </div>
        </ThemeProvider>
    )
}