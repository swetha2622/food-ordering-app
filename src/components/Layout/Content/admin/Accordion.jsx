
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import {FcExpand} from 'react-icons/fc';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import MenuService from '../../../../services/Menu-Service';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Chip from '@material-ui/core/Chip';

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
    },
    contactDetails : {
      // fontFamily: 'serif',
      display: "flex",
      alignItems: "center"
    },
    subheading: {
      fontWeight: 'bold',
      paddingRight: '1px'
    },
    subheadingcontent: {
        fontWeight: '100',
        paddingLeft: '10px',
        paddingRight: '55px'
    }
  }));

const AdminAccordion = ({orders, asyncSumbitOrder}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    let [menus, setMenus] = React.useState([]);

    const getAvailableMenus = async (evt) => {
        const resp = await MenuService.fetchAllItems();
        if (resp) {
          menus = resp;
          setMenus(resp);
          console.log(menus);
          handleClickOpen();
        } else if (resp && (resp.status === 403 || resp.status === 'error') ){
          console.log('Something went wrong. Please try again.');
        }
      };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
    };

    const submitOrder = (order) => {
      const request = {
        ...order,
        Status: 'completed'  
      }
      asyncSumbitOrder(request);
    }
    const cancelOrder = (order) => {
      const request = {
        ...order,
        Status: 'cancel'  
      }
      asyncSumbitOrder(request);
    }
    return (<> 
        <Button color='darkslategray' variant='contained' onClick={getAvailableMenus}>Check Availability</Button>
    <SimpleDialog open={open} onClose={handleClose} menus={menus}  />

        {orders?.map((order,index ) => {
                return (
                <Accordion key={`order+${index}`}>
                    <AccordionSummary
                      expandIcon={<FcExpand />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                    <Typography className={classes.heading}>
                          <span>{`Order for ${order.firstName} ${order.lastName}`}</span>
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails> 
                        <div className={classes.contactDetails}> 
                            <span className={classes.subheading}>Address:</span> 
                            <span className={classes.subheadingcontent}>{order.address}</span>
                        </div>
                        <div className={classes.contactDetails}> 
                            <span className={classes.subheading}>Phone number: </span>
                            <span className={classes.subheadingcontent}>{order.telephoneNumber}</span>
                    <Button 
                        color='darkslategray' 
                        variant='contained'
                        onClick={() => submitOrder(order)}>Ready for pickup</Button>
                        
<Button 
                        color='darkslategray' 
                        variant='contained'
                        onClick={() => cancelOrder(order)}>Cancel Order</Button>

                        </div>
                    </AccordionDetails>
                    { 
                        order?.orders?.map((menuItem, index2) =>
                      <AccordionDetails key={`menuItem+${index2}`}>
                        <div><span className={classes.subheading}>{menuItem.orderName?.toUpperCase()}</span></div>
                        <div><span className={classes.subheadingcontent}>{menuItem.orderQuantity}</span></div>
                      </AccordionDetails>)
                    }

              </Accordion>)
            })
        }
        </>)
} 

export default AdminAccordion;



function SimpleDialog(props) {
  const { onClose, open, menus } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Menu Availability </DialogTitle>
        <DialogContent>
          <DialogContentText>
              <List sx={{ pt: 0 }}>
                {menus.map((menu) => (
                  <ListItem button key={menu.menu_name}>
                    <ListItemText primary={menu.menu_name} />
                    <Chip label={menu.availableQuantity} />
                  </ListItem>
                ))}
              </List>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  menus: PropTypes.array.isRequired
};
