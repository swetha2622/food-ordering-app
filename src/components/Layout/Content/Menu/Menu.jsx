import React ,{useEffect,useState}from 'react';
import { connect } from 'react-redux';
import commonClass from '../Content.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import {FcExpand} from 'react-icons/fc';
import MenuItem from './MenuItem';
// import menuService from '../../../../services/Menu-Service';
import {asyncGetMenuItems} from '../../../../redux/actions';
import '../../../../App.css';
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
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
  const {menuItems} = props
  // const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    // const getData = async () => {
      props.fetchAllItems();
      // await menuService.fetchAllItems();
      // setMenuItems(data);
    // }
    // getData();
  },[]);

    const classes = useStyles();

    const addToCart = (count) => {
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
                        <MenuItem menuItem={menuItem} addToCart={addToCart} />
                      </AccordionDetails>)
                    }
              </Accordion>)
              return accordian;
        }
      )}
      </>
    }

    return <div className={`${commonClass['content']} ${commonClass['menu-content']}`} >
            <div>Menu</div>
            {menuItems?.length > 0 && getMenuContent()}
        </div>

}

// export default Menu;


const mapStateToProps = (state) => {
  return {
    menuItems: state.reducer.menuItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllItems: () => dispatch(asyncGetMenuItems())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
