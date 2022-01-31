import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AmountButton from './AmountButton';
import { updateCart } from '../../../../redux/actions';
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

const MenuItem = ({ menuItem, addToCart, menuIngredientItems, setMenuIngredientItems, prepareIndiviItemObject }) => {
  const classes = useStyles();
  const [count, setCount] = React.useState(0);
  const updateItemCount = (action, event) => {
    if (action === 'increment') {
      if (Number(count) !== -1) {
        setCount(Number(count) + 1);
        if (menuItem.ingredients.length > 0) {
          menuItem.ingredients.map((ingreItem) => {
            let item = ingreItem.ingredientName.trim();
            console.log('data:::',menuIngredientItems, ingreItem, menuItem)
            menuIngredientItems[item].availableQuantity = (menuIngredientItems[item] && menuIngredientItems[item].availableQuantity && menuIngredientItems[item].availableQuantity) ? (menuIngredientItems[item].availableQuantity - ingreItem['required_Quantity']) : 0
            // if(menuItem.menu_id == 2 && ingreItem.ingredientID == 3){
            //   console.log("totalQuasmtity::::",ingreItem.totalQuantity)
            //   menuIngredientItems[ingreItem.ingredientName.trim()].availableQuantity = (menuIngredientItems[ingreItem.ingredientName.trim()] && menuIngredientItems[ingreItem.ingredientName.trim()].availableQuantity) ? (menuIngredientItems[ingreItem.ingredientName.trim()].availableQuantity - ingreItem.totalQuantity ) : 0
            // } else {
            //   menuIngredientItems[ingreItem.ingredientName.trim()].availableQuantity = (menuIngredientItems[ingreItem.ingredientName.trim()] && menuIngredientItems[ingreItem.ingredientName.trim()].availableQuantity) ? (menuIngredientItems[ingreItem.ingredientName.trim()].availableQuantity - ingreItem.totalQuantity) : 0
            // }
          })
        }
      }
    } else if (action === 'decrement') {
      if (Number(count) !== -1 && Number(count) > 0) {
        setCount(Number(count) - 1);
        if (menuItem.ingredients.length > 0) {
          menuItem.ingredients.map((ingreItem) => {
            let item = ingreItem.ingredientName.trim();
            menuIngredientItems[item].availableQuantity = 
            (menuIngredientItems[item] &&
             menuIngredientItems[item].availableQuantity) ? (menuIngredientItems[item].availableQuantity + ingreItem['required_Quantity']) : (0 + ingreItem['required_Quantity'])
            // if(menuItem.menu_id == 2 && ingreItem.ingredientID == 3){
            //   menuIngredientItems[item].availableQuantity = (menuIngredientItems[item] && menuIngredientItems[item].availableQuantity  ) ? (menuIngredientItems[ingreItem.ingredientName.trim()].availableQuantity + ingreItem.totalQuantity) : (0 + ingreItem.totalQuantity )
            // } else {
            //   menuIngredientItems[item].availableQuantity = (menuIngredientItems[item] && menuIngredientItems[item].availableQuantity) ? (menuIngredientItems[ingreItem.ingredientName.trim()].availableQuantity + ingreItem.totalQuantity) : (0 + 1)
            // }
          })
        }
      }

    }
    console.log(menuIngredientItems)
    setMenuIngredientItems(menuIngredientItems);
    prepareIndiviItemObject(false);
  }

  const returnavailableQuantity = (data) => {
    var availableQuantityNo = [];
    (data.ingredients && data.ingredients.length > 0 && Object.keys(menuIngredientItems).length > 0) && data.ingredients.map((menuinneritem) => {
      availableQuantityNo.push((menuIngredientItems[menuinneritem.ingredientName] 
        && menuIngredientItems[menuinneritem.ingredientName].availableQuantity) ?
        Math.floor(menuIngredientItems[menuinneritem.ingredientName].availableQuantity/menuinneritem['required_Quantity']) : 0)
    });
    return Math.min(...availableQuantityNo);
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.details}>
          <div className={classes.media}>
            {<img src={soup} alt='FoodImage' width='50' height='50' />}
          </div>
          <div className={classes.content}>
            <div className={classes.contentHead}>{menuItem.menu_name}</div>
            <div className={classes.contentDescription}>{menuItem.description}</div>
            {(menuItem.ingredients && menuItem.ingredients.length > 0) && menuItem.ingredients.map((menuinneritem, menuinnerindex) => {
              return <div key={'menuinneritem' + menuinnerindex}>
                <div>{menuinneritem.ingredientName}
                  <input disabled type="" value={(menuIngredientItems[menuinneritem.ingredientName] && menuIngredientItems[menuinneritem.ingredientName].availableQuantity) ? menuIngredientItems[menuinneritem.ingredientName].availableQuantity : 0} />
                </div>
              </div>
            })}
            {/* <input type=""value={menuItem.ingredients[1].availableQuantity} /> */}
          </div>
          <div className={classes.actions}>
            <div>${menuItem.price}</div>
          </div>
          <div className={classes.actions}>
            <div>Available: {returnavailableQuantity(menuItem)}</div>
          </div>
          <div className={classes.actions}>
            <div>
              <AmountButton
                count={count}
                updateItemCount={updateItemCount}
                remainingcount={returnavailableQuantity(menuItem)}
              />
            </div>
            <div>
              <button
                className={`${classes.button}`}
                onClick={() => addToCart(menuItem, count)}
              >Add to Cart</button>
            </div>
          </div>
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
