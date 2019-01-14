import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  Avatar 
  
} from "@material-ui/core/";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    textDecoration:'none'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  logo: {
    width: 120,

    marginRight: 10
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  MuiDrawer: {
    paper: {
      color: 'black',
    },
  },
};

class NavBar extends React.Component {
  constructor(){
    super()
  this.state = {
    open: false,
    modal:false,
    
    };

  }
 
    handleOpen = () => {
      this.setState({ modal: true });
    };
  
    handleClose = () => {
      this.setState({ modal: false });
    };
  toggleDrawer = () => () => {
    this.setState({
      open: !this.state.open
    });
  };
  
  render() {
    
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem color="primary">
            <img
              alt=""
              className={classes.logo}
              src="/img/banner.png"
            />
          </ListItem>

          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
    let username=this.state.userName
    return (
      
      <div>
        
        <div className={classes.root}>
          <AppBar>
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={this.toggleDrawer()}
              >
                <MenuIcon />
              </IconButton>
              <img
                alt=""
                className={classes.logo}
                src="/img/banner.png"
              />
              <Typography variant="h6" className={classes.grow} component={Link} to='/'>
                GoldLion
              </Typography>

              {this.props.login?<Avatar alt="" src={this.props.avatar}/>:
              <div>
                <Button component={Link} to='/login'>
                  Login
                </Button>
                <Button component={Link} to='/register'>
                  Registrate
                </Button>
              </div>
            }
            </Toolbar>
          </AppBar>
        </div>
        <Drawer
          open={this.state.open}
          onClose={this.toggleDrawer()}
          className={classes.MuiDrawer}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer()}
            onKeyDown={this.toggleDrawer()}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
