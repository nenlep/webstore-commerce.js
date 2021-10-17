import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card: {
    maxWidth: 345,
  },
  amount:{
    paddingLeft: 10,
  },
  media: {
    height: 260,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));