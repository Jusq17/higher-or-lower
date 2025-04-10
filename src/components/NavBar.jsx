import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const NavBar = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username')
    if (loggedInUser) {
      setUser(loggedInUser)
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
    handleClose()
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} href="/" onClick={handleClose}>
                Home
              </MenuItem>
              <MenuItem component={Link} href="/game" onClick={handleClose}>
                Play
              </MenuItem>
              <MenuItem component={Link} href="/leaderboard" onClick={handleClose}>
                Leaderboard
              </MenuItem>
              {user === undefined || user === null ? (
                <>
                  <MenuItem component={Link} href="/login" onClick={handleClose}>
                    Login
                  </MenuItem>
                  <MenuItem component={Link} href="/register" onClick={handleClose}>
                    Register
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  <MenuItem component={Link} href="/profile" onClick={handleClose}>
                    Profile
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button component={Link} href="/" color="inherit">
              Home
            </Button>
            <Button component={Link} href="/game" color="inherit">
                  Play
            </Button>
            <Button component={Link} href="/leaderboard" color="inherit">
              Leaderboard
            </Button>

            {user === undefined || user === null ? (
              <>
                <Button component={Link} href="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} href="/register" color="inherit">
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} href="/" onClick={handleLogout} color="inherit">
                  Logout
                </Button>
                <Button component={Link} href="/profile" color="inherit">
                  Profile
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </div>
  )
}

export default NavBar
