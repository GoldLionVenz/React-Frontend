import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Snackbar, Button } from '@material-ui/core/'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const styles = theme => ({
    close: {
      padding: theme.spacing.unit / 2,
    },
  });
class Snack extends Component{
    state = {
        open: false,
      };
    
      
      handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.props.close()
      };
    render(){
        const { classes } = this.props;
        return(
            <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.props.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.message}</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        )
    }
}
Snack.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Snack);