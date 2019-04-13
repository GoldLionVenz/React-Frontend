import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Typography,AppBar, Tabs, Tab,List,ListItem} from '@material-ui/core'
import { Link } from "react-router-dom";
import url from '../../constantes'
import ButtonSpinner from '../buttonspinner/'
import Snack from '../snackbar/'
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
        poster:'',
        message:'',
        loading:false,
        toast:false
    };
    componentWillMount(){
        this.getTitle()
    }
    getTitle=async()=>{
        const req=await fetch(`${url.base}title/${this.props.params.id}`)
        const resp=await req.json()
        this.setState({seasons:resp.data.seasons,data:resp.data,value:resp.data.seasons.length-1})
        if(resp.lastSeason){
            this.setState({background:resp.lastSeason.banner,poster:resp.lastSeason.poster})
        }else{
            this.setState({poster:resp.data.poster})
        }
    }
    suscribe=async()=>{
        this.setState({loading:true})
        const peticion=await fetch(`${url.base}suscribe`,{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body:`serie_id=${this.props.params.id}`
        })
        const resp=await peticion.json()
        this.setState({loading:false,toast:true,message:resp.message})
        
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    setBackground=(value,poster)=>{
        this.setState({background:value,poster:poster})
    }
    render(){
        
        let tabs=this.state.seasons.map(season=>{
            return(
                <Tab key={season.id} onClick={this.setBackground.bind(this,season.banner,season.poster)} label={`Season ${season.number_season}`} />
            )
        })
        let tabsItems=this.state.seasons.map((season,index)=>{
            let episodes= season.episodes.map((episode,index)=>{
                
                return (
                    <ListItem key={index} button component={Link} to={`/watch/${episode.id}`}>
                        <Typography>{episode.title}</Typography>
                    </ListItem>
                )
            })
            return (
                this.state.value === index && 
                <TabContainer key={index}>
                    <div>
                        <List component="nav">
                            {episodes}
                        </List>
                    </div>
                </TabContainer>
            )
            
        })
        return(
            <Grid container direction="row" className='mt' justify="center">
                <Snack message={this.state.message} open={this.state.toast} close={()=>this.setState({toast:false})}/>
                <div className="header">
                    <div className="title-background" style={{backgroundImage:`url(${this.state.background})`}}></div>
                    <div className="top-vignette"></div>
                    <div className="bottom-vignette"></div>
                </div>
                <Grid item xs={10} spacing={24} container className='relative'>
                    <Grid  item md={3} xs={12}>
                        <img className="poster" src={this.state.poster} alt=""/>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Typography align="center" variant="h5" component="h3">
                            {this.state.data.title}
                        </Typography>
                        <Typography  component="p">
                            {this.state.data.plot}
                        </Typography>
                        <Typography variant="h5" component="h3">
                            IMBD Rating {this.state.data.imdbRating}
                        </Typography>
                        <ButtonSpinner loading={this.state.loading} action={this.suscribe} text='Susbcribe'/>
                    </Grid>
                </Grid>
                {this.state.seasons.length>0?
                <Grid item xs={10} className="mt relative">
                    <AppBar position="static">
                        <Tabs variant="scrollable" indicatorColor="secondary" textColor="inherit" scrollButtons="on" value={this.state.value} onChange={this.handleChange}>
                            {tabs}
                        </Tabs>
                    </AppBar>
                    {tabsItems}
                </Grid>
                :<Grid item xs={10}><Typography align="center" variant="h5" component="h3">
                Proximamente
                </Typography></Grid>}
            </Grid>
        )
    }
}

Serie.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Serie);