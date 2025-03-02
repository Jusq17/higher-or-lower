import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const NavBar = () => {

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext);
  
  console.log(user)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username')
    if (loggedInUser) {
      setUser(loggedInUser)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <Typography 
            variant="h4" 
            component="a" 
            href="/" 
            sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
          >
            Higher or Lower
          </Typography>
          {user === undefined || user === null
            ?
            <div>
              <Button component={Link} href="/login" color="inherit">Login</Button>
              <Button component={Link} href="/register" color="inherit">Register</Button>
            </div>
            :
            <div>
              <Button component={Link} href="/game" color="inherit">Play</Button>
              <Button component={Link} href="/" onClick={handleLogout} color="inherit">Logout</Button>
              <Button component={Link} href="/profile" color="inherit">Profile</Button>
            </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
