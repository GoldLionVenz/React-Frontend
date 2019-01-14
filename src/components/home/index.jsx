import React, {Component} from 'react'
import { Grid, Card, CardContent,Typography } from '@material-ui/core';
import url from '../../constantes'
import axios from 'axios'
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom";
const styles = {
    text:{
        flexGrow: 1,
        textDecoration:'none'
    }
}
class Home extends Component{
    constructor(){
        super()
        this.state={
            series:[]
        }
    }
    componentDidMount(){
        axios.get(`${url.base}series`,{
            headers:{
                'Content-Type': 'application/json',
                'X-Requested-With':'XMLHttpRequest'   
            }})
            .then(data=>{
                this.setState({series:data.data})
                //console.log(data.data)
            })
    }
    render(){
        const { classes } = this.props;
        let items=this.state.series.map(serie=>{
            return(
                <Grid item xs={12}  xl={2} sm={3}>
                    <Card className={classes.text} component={Link} to={`/title/${serie.id}`}> 
                        
                        <CardContent>
                        <img className="poster" src={serie.poster} alt=""/>
                        <Typography variant="h6" >
                            {serie.title}
                        </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )
        })
        return(
            <Grid
                container
                direction="row"
                className='mt'
                justify="center"
            >
                <Grid
                    xs={10}
                    spacing={24} 
                    container
                >
                    {items}
                </Grid>

            </Grid>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(Home);
  