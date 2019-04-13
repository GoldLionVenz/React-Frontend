import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Button} from '@material-ui/core/';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonProgress: {
    color: '#FFF',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class ButtonSpinner extends React.Component {
 

  render() {
    const { classes } = this.props;
    

    return (
      
        
        
          <Button
            variant="contained"
            color="primary"
            fullWidth={this.props.fullWidth}
            className={classes.button}
            disabled={this.props.loading}
            onClick={this.props.action}
            
          >
          {this.props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            
              {this.props.text}
            
           
          </Button>
          
        
      
    );
  }
}

ButtonSpinner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonSpinner);