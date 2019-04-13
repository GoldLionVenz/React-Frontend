import React, {Component} from 'react'
import { Grid, Card, CardContent,Typography,} from '@material-ui/core';
import url from '../../constantes'
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom";
import ButtonSpinner from '../buttonspinner/'
const styles = {
    text:{
        flexGrow: 1,
        textDecoration:'none'
    }
}
class Episodes extends Component{
    constructor(){
        super()
        this.state={
            episodes:[],
            page:1,
            next:true
        }
    }
    componentDidMount(){
       this.getEpisodes()
    }
    getEpisodes=async()=>{
        this.setState({loading:true})
        const req=await fetch(`${url.base}episodes?page=${this.state.page}`)
        const resp =await req.json()
        const array=this.state.episodes

        resp.data.forEach(item=>{
            array.push(item)
        })
        this.setState({episodes:array,loading:false})
        if(resp.next_page_url){
            this.setState({page:this.state.page+1,next:true})
        }else{
            this.setState({next:false})
        }
    }
    render(){
        const { classes } = this.props;
        let items=this.state.episodes.map(episode=>{
            const season=episode.season
            const serie=season.serie
            return(
                <Grid key={episode.id} item xs={12}  xl={2} sm={3}>
                    <Card className={classes.text} component={Link} to={`/watch/${episode.id}`}> 
                        
                        <CardContent>
                        <img className="poster" src={season.poster} alt=""/>
                        <Typography align="center" variant="h6" >
                            {serie.title} S{season.number_season}E{episode.number_episode} {episode.title}
                            
                        </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )
        })
        return(
            <div className='mt mb'>
            <Grid
                container
                direction="row"
                justify="center"
            >
                <Grid
                    xs={10}
                    spacing={24} 
                    container
                    item
                >
                    {items}
                </Grid>
                <Grid
                    xs={12}
                    md={4}
                    spacing={24} 
                    container
                    item
                    justify="center"
                >
                {this.state.next?
                <ButtonSpinner loading={this.state.loading} action={this.getEpisodes}  text='Cargar Mas'/>:
                null}
                </Grid>
            </Grid>
            </div>
        )
    }
}

Episodes.propTypes = {
    classes: PropTypes.object.isRequired
};
  
export default withStyles(styles)(Episodes);
  