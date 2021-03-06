import React, {Component} from 'react'
import { Grid, Card, CardContent,Typography} from '@material-ui/core';
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
class Home extends Component{
    constructor(){
        super()
        this.state={
            series:[],
            page:1,
            next:true
        }
    }
    componentDidMount(){
       this.getSeries()
    }
    getSeries=async()=>{
        this.setState({loading:true})
        const req=await fetch(`${url.base}series?page=${this.state.page}`)
        const resp =await req.json()
        const array=this.state.series

        resp.data.forEach(item=>{
            array.push(item)
        })
        this.setState({series:array,loading:false})
        if(resp.next_page_url){
            this.setState({page:this.state.page+1,next:true})
        }else{
            this.setState({next:false})
        }
    }
    render(){
        const { classes } = this.props;
        let items=this.state.series.map(serie=>{
            return(
                <Grid key={serie.id} item xs={12}  xl={2} sm={3}>
                    <Card className={classes.text} component={Link} to={`/title/${serie.id}`}> 
                        
                        <CardContent>
                        <img className="poster" src={serie.poster} alt=""/>
                        <Typography align="center" variant="h6" >
                            {serie.title}
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
                <ButtonSpinner loading={this.state.loading} action={this.getSeries}  text='Cargar Mas'/>:
                null}
                </Grid>
            </Grid>
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};
  
export default withStyles(styles)(Home);
  