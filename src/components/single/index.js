import React, { Component } from 'react';
import url from '../../constantes'
import axios from 'axios'
import { Player,LoadingSpinner, BigPlayButton,ControlBar } from 'video-react';
import { Grid,Typography } from '@material-ui/core';
class Single extends Component {
    constructor(){
        super()
        this.state={
            data:{},
            season:{},
            serie:{}
        }
    }
    componentDidMount(){
        console.log(this.props.params.serie)
        axios.get(`${url.base}watch/ju0fmk3nr6plczQHBYWg`,{
            headers:{
                'Content-Type': 'application/json',
                'X-Requested-With':'XMLHttpRequest'   
            }})
            .then(data=>{
                this.setState({
                    data:data.data,
                    serie:data.data.season.serie,
                    season:data.data.season
                })
                console.log(data.data)
            })
    }

    play=()=> {
        this.refs.player.play();
    }
    pause=()=>{
        this.refs.player.pause()
    }

    isPause=()=>{
        return this.state.pause
    }
  render() {
       const track=<track  src="/subtitle/sub.vtt" kind="subtitles" label="English" default/>
      
    return (
    
        <Grid
        container
        direction="row"
        className='mt'
        justify="center"
        spacing={24}
        xs={12}
    >
    <Grid item xs={12} md={10}>
        <Typography align="center" variant="h5" component="h3">
            {this.state.serie.title} Season 5 Episode 10
        </Typography>
    </Grid>
        <Grid item
            xs={12}
            md={10}
            container
        >
      <Player
          ref="player" 
          poster={this.state.season.banner} 
      >
        <source src='http://localhost:8000/storage/videos/3f56o5KRcJ2qavGrtOCICBnjwFTiSl3cGQLINwYr.mp4'/>
        
        
        <BigPlayButton position="center" />
        <LoadingSpinner />
        <ControlBar autoHide={true} />
      </Player>
      
      </Grid>
      <Grid xs={10} spacing={8} item container>
      
                    <Grid item xs={12}>
                        <Typography  variant="h5" component="h3">
                            Title
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h3">
                            IMBD Rating 9.5
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="p">
                            Season 1 of Game of Thrones consists of ten episodes, including a re-shot version of the pilot episode originally filmed in October 2009 and November 2009, and was otherwise filmed between July 23, 2010 and December 18, 2010. Season 1 had a budget of $60 million. Season 1 of Game of Thrones was released on DVD and Blu-ray in the United States and United Kingdom on March 5, 2012, setting new sales records for first-week sales of a HBO series. On September 2, 2012, the first season of Game of Thrones won a Hugo Award for Best Dramatic Presentation.[1] David Benioff and D.B. Weiss were the executive producers and show runners.
                            The season premiered on April 17, 2011. 
                        </Typography>
                    </Grid>
                        
                        
                    
      </Grid>
      </Grid>
    );
  }
}

export default Single;