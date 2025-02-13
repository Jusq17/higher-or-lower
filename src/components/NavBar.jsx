import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <Button href='/' size="large" color="inherit">
            Higher or Lower
          </Button>
          <Button href='/login' color="inherit" sx={{ position: 'absolute', right: 50 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
