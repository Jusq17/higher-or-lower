import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h4" component="div">
            Higher or Lower
          </Typography>
          <Button color="inherit" sx={{ position: 'absolute', right: 50 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
