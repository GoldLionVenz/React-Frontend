import React, { Component } from 'react';
import Routes from './routes'
/*import { AppBar, Toolbar, Grid, Typography,Card, IconButton, Button} from '@material-ui/core'
import {PlayArrow} from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu';
import { Player, ControlBar,BigPlayButton  } from 'video-react';*/
class App extends Component {
  render(){
    return(
      <Routes/>
    )
  }
  
}

export default App;
/*constructor(){
    super()
    this.state={
      src:'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
      poster: 'img/stanis.jpg' 
    }
  }
  render() {
    return (
        <div>
        <Grid>
          
          <AppBar position="static">
          <Toolbar>
            <IconButton  color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Grid justify="space-between" container>
            <Typography variant="h6" color="inherit">
              News
            </Typography>
            <Button color="inherit">Login</Button>
            </Grid>
          </Toolbar>
        </AppBar>
          
      </Grid>
      <Grid
      container
      direction="row"
      justify="center"
      >
        <Grid md={8} sm={12} className='mt'>
        <Player poster={this.state.poster}>
            <source src={this.state.src} />
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} disableDefaultControls={true} color="primary">
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
                <IconButton  aria-label="Delete">
                  <PlayArrow />
                </IconButton>
            </Grid>
            </ControlBar>
          </Player>
        </Grid>
      </Grid>
      </div>
      
      
      
    )
  }*/