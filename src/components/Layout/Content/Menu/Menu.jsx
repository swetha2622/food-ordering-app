import React ,{useEffect}from 'react';
import { connect } from 'react-redux';
import commonClass from '../Content.module.css';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from  'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {FcExpand} from 'react-icons/fc';
import MenuItem from './MenuItem';
import Button from '@material-ui/core/Button';
import {asyncGetMenuItems, getMenuItemsIsSuccess} from '../../../../redux/actions';
import '../../../../App.css';
import { useState } from 'react';
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: '20px'
    },
    button : {
      backgroundColor: 'white',
      color:'darkslategray'
    }
  }));

const groupMenuItems = (items, key) => items.length > 0 && items?.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }), 
  {},
);

const Menu = (props) => {
  const history = useHistory();
  const {menuItems, cartItems, loggedIn} = props
  const [ totalIngredients, setTotalIngredients ] = useState({});

  useEffect(() => {
      props.fetchAllItems();
  },[]);

  useEffect(()=> {
    let tempIngredients = {};
    menuItems && menuItems.forEach(menuItem => {
      menuItem.ingredients.forEach(ingredients=> {
        tempIngredients[ingredients.ingredientID] = ingredients.availableQuantity
      })
    })
    setTotalIngredients(tempIngredients);
  }, [menuItems, setTotalIngredients])

  useEffect(()=> {
    if(cartItems.length> 0) updateMenuIngredientsFunc()
  }, [cartItems])

    const classes = useStyles();

    const updateMenuIngredientsFunc = () => {
      console.log("totalIngredients", totalIngredients);
      const tempMenuItems = cartItems.map(menuItem => {
          let tempIngredients = menuItem.ingredients.map(ingredient => {
            // ingredient.availableQuantity -= ingredient.totalQuantity * menuItem.count;
            ingredient.remainingQuantity = ingredient.availableQuantity - (ingredient.totalQuantity * menuItem.count);
            
            return ingredient;
          })
          return {...menuItem, ingredients: tempIngredients};
        })

      const tempMenuItems2 = [...menuItems];
      console.log(tempMenuItems2.map((item, i) => Object.assign({}, item, tempMenuItems[i])))
      props.updateMenuIngredients(tempMenuItems2.map((item, i) => Object.assign({}, item, tempMenuItems[i])));
    }

    const setTotalIngredientsFunc = (totalIngredients) => {
      setTotalIngredients(totalIngredients);
    }

    const getMenuContent = () => {
      const groupedMenuData = groupMenuItems(menuItems, 'menu_group_id');
      return <>
      {Object.keys(groupedMenuData)
      .map((menugroupid, index1) => {
        const menugroup = groupedMenuData[menugroupid];
        const menugroupTitle = menugroup[0]['menu_group_name'];
        const accordian = (<Accordion key={`menu+${index1}`}>
                    <AccordionSummary
                      expandIcon={<FcExpand />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>{menugroupTitle}</Typography>
                    </AccordionSummary>
                    { 
                    menugroup.map((menuItem, index2) =>
                      <AccordionDetails key={`menuItem+${index2}`}>
                        <MenuItem 
                          menuItem={menuItem} 
                          totalIngredients={totalIngredients} 
                          setTotalIngredients={setTotalIngredientsFunc}
                          // updateMenuIngredients={updateMenuIngredientsFunc}
                        />
                      </AccordionDetails>)
                    }
              </Accordion>)
              return accordian;
        }
      )}
      </>
    }

    return <div className={`${commonClass['content']} ${commonClass['menu-content']}`} >

      {  loggedIn && 
         <button className={classes['order-button']} onClick={() =>history.push('/track')}> Track Order </button>
      }
            <div><h1>Menu</h1></div>
            {props.menuItemsLoading ? <>
              <CircularProgress />
            </> :
              menuItems?.length > 0 ? 
              <>
              {getMenuContent()}
              <br/>
              <Button variant="contained" 
              onClick={()=> history.push('./cart') }
              color="darkslategray" 
              className={classes.button}>
                View Cart
              </Button>
              </> :
              <> Issue encountered while fetching the menu. Try again later</>
          }
        </div>

}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loginReducer.loggedIn,
    menuItemsLoading: state.reducer.menuItemsLoading,
    menuItems: state.reducer.menuItems,
    cartItems: state.reducer.cartItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllItems: () => dispatch(asyncGetMenuItems()),
    updateMenuIngredients: (menuItems) => dispatch(getMenuItemsIsSuccess(menuItems))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
