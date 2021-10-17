import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/logo.png'
import styles from './styles';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();

  
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} component={Link} to="/" color="inherit">
            <img src={logo} alt="WebStore" height="25px" classes={classes.image} /> WebStore
          </Typography>
          <div className ={classes.grow} />
          {/* hide cart icon if user is on cart page */}
          {location.pathname==='/' && (
          <div className ={classes.button}>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>) 
        }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
