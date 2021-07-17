import React ,{useEffect,useState}from 'react';
import commonClass from '../Content.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import {FcExpand} from 'react-icons/fc';
import MenuItem from './MenuItem';
import menuService from '../../../../services/Menu-Service';
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

const groupMenuItems = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }), 
  {},
);

const Menu = () => {
  const [menuItems, setData] = useState([]);
  useEffect(  () => {
      getData();
  },[]);

  const getData = async () => {
    const tempData = await menuService.fetchAllItems();
    tempData && setData(tempData);
  }
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
                    { menugroup.map((menuItem, index2) =>
                      <AccordionDetails key={`menuItem+${index2}`}>
                        <MenuItem menuItem={menuItem}/>
                      </AccordionDetails>)}
              </Accordion>)
              return accordian;
        }
      )}
      </>
    }

    return <div className={`${commonClass['content']} ${commonClass['menu-content']}`} >
            <div>Menu</div>
            {getMenuContent()}
        </div>

}

export default Menu;