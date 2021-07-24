
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import {FcExpand} from 'react-icons/fc';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

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
      fontFamily: 'serif',
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

    const submitOrder = (order) => {
      const request = {
        ...order,
        status: 'completed'  
      }
      asyncSumbitOrder(request);
    }
    return (<> Test
        {orders.map((order,index ) => {
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
                        </div>
                    </AccordionDetails>
                    { 
                        order.orders.map((menuItem, index2) =>
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