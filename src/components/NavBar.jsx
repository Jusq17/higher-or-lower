import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import { useState, useEffect } from 'react';

const NavBar = () => {

  const [user, setUser] = useState(localStorage.getItem('username'))
  
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
