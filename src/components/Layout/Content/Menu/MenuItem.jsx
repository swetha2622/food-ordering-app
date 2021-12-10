import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AmountButton from './AmountButton';
import {updateCart} from '../../../../redux/actions';
import soup from './soup.jpeg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '75vw',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
  },
  media: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    display: 'flex',
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'start'
  },
  contentDescription: {
    fontSize: '10px'
  },
  actions: {
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  button: {
      backgroundColor: 'darkslategray',
      color: '#ffffff',
      border: 'none',
      borderRadius: '15px',
      padding: '5px',
      cursor: 'pointer'
  }
}));

const MenuItem = ({menuItem, addToCart, totalIngredients, setTotalIngredients}) => {
  const classes = useStyles();
  const [count, setCount] = React.useState(1);
  const updateItemCount = (action, event) => {
    console.log(totalIngredients);
        if(action === 'increment') {
            setCount(Number(count)+1);
        } else if(action === 'decrement') {
            Number(count) > 1 && setCount(Number(count) - 1);
        } else {
            setCount(event.target.value);
        }
    }
    const onAddToCart = (menuItem, count) => {
      let tempIngredients = {};
      let available = true;
        menuItem.ingredients.forEach(ingredients=> {
          let reqQuantity = ingredients.totalQuantity * count;
          available = available && reqQuantity <= totalIngredients[ingredients.ingredientID];
          tempIngredients[ingredients.ingredientID] = ingredients.availableQuantity - reqQuantity;
        })
        if(available) {
          console.log(tempIngredients);
          addToCart(menuItem, count);

          setTotalIngredients(tempIngredients);
        } else {
          alert('Not available to add to cart');
        }
    }
    const getAvailableQuantity = () => {
      const avail = menuItem.ingredients.map(ingredient => {
        if(ingredient.remainingQuantity)
        return ingredient.remainingQuantity/ingredient.totalQuantity;
        else 
        return ingredient.availableQuantity/ingredient.totalQuantity;
      })
      const quantity = Math.min(...avail);
      return quantity;
    }

      return (
        <Card className={classes.root}>
            <CardContent>
                <div className={classes.details}>
                    <div className={classes.media}>
                        {<img src={soup} alt='FoodImage' width='50' height='50'/> }
                    </div>
                    <div className={classes.content}>
                        <div className={classes.contentHead}>{menuItem.menu_name}</div>
                        <div className={classes.contentDescription}>{menuItem.description}</div>
                    </div>
                    <div className={classes.actions}>
                        <div>${menuItem.price}</div>
                    </div>
                    <div className={classes.actions}>
                        <div>Available: {getAvailableQuantity()}</div>
                    </div>
                    <div className={classes.actions}>    
                        <div>
                          <AmountButton 
                          count={count}
                          updateItemCount={updateItemCount}/>
                        </div>
                        <div>
                            <button 
                            className={`${classes.button}`}
                            onClick={()=> onAddToCart(menuItem, count)}
                            >Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'left', fontSize: '8px'}}>
                  {menuItem.ingredients.map(item => <span>
                    {item.ingredientName} - {item.totalQuantity}  &nbsp;
                  </span>)}
                </div>
            </CardContent>
        </Card>
  );
}


const mapStateToProps = (state) => {
  return {
    menuItems: state.reducer.menuItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, count) => dispatch(updateCart({
      ...item, count
    }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
