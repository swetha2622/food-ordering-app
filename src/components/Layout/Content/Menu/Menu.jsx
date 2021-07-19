import React ,{useEffect}from 'react';
import { connect } from 'react-redux';
import commonClass from '../Content.module.css';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from  'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import {FcExpand} from 'react-icons/fc';
import MenuItem from './MenuItem';
import Button from '@material-ui/core/Button';
import {asyncGetMenuItems} from '../../../../redux/actions';
import '../../../../App.css';
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
  const {menuItems} = props
  useEffect(() => {
      props.fetchAllItems();
  },[]);

    const classes = useStyles();

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
                        <MenuItem menuItem={menuItem}/>
                      </AccordionDetails>)
                    }
              </Accordion>)
              return accordian;
        }
      )}
      </>
    }

    return <div className={`${commonClass['content']} ${commonClass['menu-content']}`} >
            <div><h1>Menu</h1></div>
            {menuItems?.length > 0 && getMenuContent()}
            <br/>
            <Button variant="contained" 
            onClick={()=> history.push('./cart') }
            color="darkslategray" 
            className={classes.button}>
              View Cart
            </Button>
        </div>

}

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
