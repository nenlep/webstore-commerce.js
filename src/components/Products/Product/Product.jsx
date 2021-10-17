import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import React from 'react';
import Products from '../Products';
import useStyles from './styles';
import Box from '@material-ui/core/Box';

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  
  return (
    // <Box m={3} pt={10}>
    <Card className={classes.root}>
    <CardMedia className={classes.media} image={product.image.url} title={product.name}/>
    <CardContent>
      <div className={classes.CardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {product.price.formatted_with_symbol}
        </Typography>
      </div>
      <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" />
        
    </CardContent>
    <CardActions disableSpacing className={classes.CardActions}>
      <IconButton aria-label ="Add to cart" onClick={()=>onAddToCart(product.id,1)}>
        <AddShoppingCart />
      </IconButton>
    </CardActions>
  </Card>
    // </Box>
    
  )
}

export default Product
