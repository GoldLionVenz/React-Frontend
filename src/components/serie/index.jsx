import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Typography,AppBar, Tabs, Tab,List,ListItem,ListItemSecondaryAction,ListItemText,IconButton} from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Comment';
import { Link } from "react-router-dom";
import url from '../../constantes'
import axios from 'axios'
const styles ={
    root: {
        flexGrow: 1,
    },
}
function TabContainer(props) {
    return (
      <Typography component="div">
        {props.children}
      </Typography>
    );
  }
  
class Serie extends Component{
    state = {
        data:{},
        seasons:[],
        value: 0,
        background:'',
        poster:''
    };
    componentWillMount(){
        axios.get(`${url.base}title/${this.props.params.id}`,{
            headers:{
                'Content-Type': 'application/json',
                'X-Requested-With':'XMLHttpRequest'   
            }})
            .then(data=>{
                console.log(data)
                this.setState({
                    data:data.data,
                    seasons:data.data.seasons,
                    value:data.data.seasons.length-1,
                    poster:data.data.lastPoster,
                    background:data.data.lastBanner,
                })
                
                //console.log(data.data)
            })       
        //console.log(this.props.params.id)
    }
    poster(){
        let poster=this.state.data.poster
        this.state.seasons.forEach(season=>{
           if(season.poster!==null){
               poster= season.poster
               
           }
           
        })
        return poster
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    setBackground=(value,poster)=>{
        this.setState({background:value,poster:poster})
    }
    render(){
        const { classes } = this.props;
        
        let tabs=this.state.seasons.map(season=>{
            
            return(
                <Tab onClick={this.setBackground.bind(this,season.banner,season.poster)} label={`Season ${season.number_season}`} />
            )
        })
        
        return(
            //http://assets.viewers-guide.hbo.com/large5335b0c106762.jpg
            //http://assets.viewers-guide.hbo.com/xlarge556f740a18004.jpg
            //https://www.hbo.com/content/dam/hbodata/series/game-of-thrones/video-stills/season-02/20-inside-the-episode-866929-16-1920.jpg
            //https://www.hbo.com/content/dam/hbodata/series/game-of-thrones/video-stills/season-02/got-female-trailer-1920.jpg
            //https://www.hbo.com/content/dam/hbodata/series/game-of-thrones/episodes/1/1/winter-is-coming-04-1920.jpg/_jcr_content/renditions/cq5dam.web.1200.675.jpeg
            <Grid container direction="row" className='mt' justify="center">
                <div className="header">
                    <div className="title-background" style={{backgroundImage:`url(${this.state.background})`}}></div>
                    <div className="top-vignette"></div>
                    <div className="bottom-vignette"></div>
                </div>
                <Grid xs={10} spacing={24} container className='relative'>
                    <Grid item xs={3}>
                        <img className="poster" src={this.state.poster} alt=""/>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography align="center" variant="h5" component="h3">
                        {this.state.data.title}
                        </Typography>
                        <Typography  component="p">
                        {this.state.data.plot}
                        </Typography>
                        <Typography variant="h5" component="h3">
                        IMBD Rating {this.state.data.imdbRating}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid xs={10} className="mt relative">
                <AppBar position="static">
                    <Tabs value={this.state.value} onChange={this.handleChange}>
                        {tabs}
                    </Tabs>
                </AppBar>
                {this.state.value === 0 && 
                <TabContainer>
                    <div>
                    <List component="nav">
                        <ListItem button component={Link} to='/login'>
                            <ListItemText primary="Inbox" />
                            <ListItemSecondaryAction>
                            <IconButton aria-label="Comments">
                                <CommentIcon />
                            </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Drafts" />
                            <ListItemSecondaryAction>
                            <IconButton color="primary" aria-label="Comments">
                                <CommentIcon />
                            </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                    </div>
                </TabContainer>}
                {this.state.value === 1 && 
                    <TabContainer>
                        <div>
                        <List component="nav">
                            <ListItem button>
                                <ListItemText primary="Inbox" />
                                <ListItemText primary="Imdb" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Drafts" />
                                <ListItemText primary="Imdb" />
                            </ListItem>
                        </List>
                        </div>
                    </TabContainer>}
                {this.state.value=== 2 && 
                <TabContainer>
                    <div>
                    <List component="nav">
                        <ListItem button>
                            <ListItemText primary="Inbox" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                    </List>
                    </div>
                </TabContainer>}
                </Grid>
            </Grid>
        )
    }
}

Serie.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Serie);