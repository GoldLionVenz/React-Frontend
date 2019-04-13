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
  Avatar,
  Menu,
  MenuItem
} from "@material-ui/core/";
import MailIcon from "@material-ui/icons/Mail";
import Badge from '@material-ui/core/Badge';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from '@material-ui/icons/Notifications';
const styles = {
  appBar: {
    //position: 'absolute',
    width: '100%',
    //zIndex: '1400',
  },
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
    anchorEl: null,
    notifications:[]
    };

  }
  componentWillMount(){
    this.getNoticications()
  }
  getNoticications=async()=>{
    const peticion=await fetch('http://localhost:8000/api/notications',{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type':'application/x-www-form-urlencoded'
      }
    })
    const resp=await peticion.json()
    this.setState({notifications:resp})
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
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  render() {
    
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem color="primary" key='0'>
            <img
              alt=""
              className={classes.logo}
              src="/img/banner.png"
            />
          </ListItem>
            <ListItem button key='1' component={Link} to={`/`}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary='Series' />
            </ListItem>
            <ListItem button key='2'component={Link} to={`/episodes`}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary='Episodios' />
            </ListItem>
            <ListItem button key='3'>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary='Top GodLion' />
            </ListItem>
        </List>
      </div>
    );
    const { anchorEl} = this.state;
    const isMenuOpen = Boolean(anchorEl);
    let notifications=this.state.notifications.map(notification=>{
      return(
        <MenuItem key={notification.id} component={Link} to={`/watch/${notification.data.episode.id}`} onClick={()=>this.setState({ anchorEl: null })}>
             <p>Nuevo Episodio Disponible {notification.data.episode.season.serie.title}</p> 
        </MenuItem>
      )
    })
    return (
      
      <div>
        
        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={this.toggleDrawer()}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.grow} component={Link} to='/'>
              <img
                alt=""
                className={classes.logo}
                src="/img/banner.png"
              />
              
              
                
              </Typography>
              {this.props.login?
              <div>
              <IconButton color="inherit" onClick={this.handleProfileMenuOpen}>
              <Badge badgeContent={this.state.notifications.length} color="secondary">
                <NotificationsIcon />
              </Badge>
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={isMenuOpen}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={()=>this.setState({ anchorEl: null })}
                PaperProps={{
                  style: {
                    width: 350,
                    marginTop:28,
                    
                  },
                }}
        >
          
            {notifications}
          
        </Menu>
              <IconButton color="inherit">
              <Avatar alt="" src={this.props.avatar}/>
              </IconButton>
              </div>:
              <div>
                <Button color="inherit" component={Link} to='/login'>
                  Login
                </Button>
                <Button color="inherit" component={Link} to='/singup'>
                  SingUp
                </Button>
              </div>
            }
            </Toolbar>
          </AppBar>
        </div>
        <Drawer
          open={this.state.open}
          onClose={this.toggleDrawer()}

          className={classes.drawer}
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
