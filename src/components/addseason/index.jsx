import React, {Component} from 'react'
import { Grid, TextField,MenuItem,IconButton,Card,Fab  } from '@material-ui/core';
import url from '../../constantes'
import axios from 'axios'
import PropTypes from "prop-types"
import {PhotoCamera} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from "@material-ui/core/styles"
import Snackbar from '../snackbar'
const styles = {
    menu: {
        width: 200,
      },
      input: {
        display: 'none',
    },
}
class AddSeason extends Component{
    constructor(){
        super()
        this.state={
            series:[],
            serie:'',
            poster:"https://via.placeholder.com/400x600.png?text=Poster",
            banner:'https://via.placeholder.com/600x300.png?text=Banner',
            number:0,
            open:false,
            message:'',
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
    onChange=(e)=>{
        console.log(e.target)
        this.setState({[e.target.name]:e.target.value})
    }
    posterChange=(e)=>{
        
        const name=e.target.name
        let file=e.target.files
        let reader=new FileReader()
        reader.readAsDataURL(file[0])
        reader.onload=(e)=>{
            this.setState({[name]:e.target.result})
        }
    }
    close=()=>{
        this.setState({open:false})
    }
    add=()=>{
        const token=JSON.parse(localStorage.getItem('user')).access_token
        const datos={
            'serie_id':this.state.serie,
            'number_season':this.state.number,
            'poster':this.state.poster,
            'banner':this.state.banner
        }
        axios.post(`${url.base}auth/addseason`,JSON.stringify(datos),{
            headers:{
                'Content-Type': 'application/json',
                'X-Requested-With':'XMLHttpRequest',
                'Authorization':`Bearer ${token}`
        }}).then(data=>{
            console.log(data)
            this.setState({message:data.data.message})
            
        }).finally(()=>{this.setState({open:true})})
    }
    render(){
        const { classes } = this.props;
        let items=this.state.series.map(serie=>{
            return(
                <MenuItem key={serie.id} value={serie.id}>
              {serie.title}
            </MenuItem>
            )
        })
        return(
            <div>
            <Grid container direction="row" className='mt' justify="center">
                <Grid xs={10} spacing={24} container>

                <Grid item xs={8} container justify="center">
                    <Grid item xs={6}>
                        <TextField
                            select
                            name='serie'
                            label="Serie"
                            helperText="Selecciona una serie"
                            margin="normal"
                            value={this.state.serie}
                            onChange={this.onChange}
                        
                        >
                            {items}
                        </TextField> 
                    </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="standard-number"
                                label="Number Season"
                                name="number"
                                value={this.state.number}
                                onChange={this.onChange}
                                type="number"
                                margin="normal"
                                helperText="Numero de la temporada"
                            />
                        </Grid>
                    <Grid item xs={12}>
                        <Grid container
                            justify="center">
                            
                        
                        <input accept="image/*" name="banner" onChange={(e)=>this.posterChange(e)} className={classes.input} id="banner" type="file" />
                            <label htmlFor="banner">
                                <IconButton color="primary" className={classes.button} component="span">
                                <PhotoCamera />
                                </IconButton>
                            </label>
                        </Grid>
                        <Card >
                        
                        <img className="poster" src={this.state.banner} alt=""/>
                        </Card>
                            
                    </Grid>
                </Grid>
                    
                    <Grid item
                    md={3} xs={12}>
                    <Grid container
                            justify="center">
                            
                        
                        <input accept="image/*" name="poster" onChange={(e)=>this.posterChange(e)} className={classes.input} id="poster" type="file" />
                            <label htmlFor="poster">
                                <IconButton color="primary" className={classes.button} component="span">
                                <PhotoCamera />
                                </IconButton>
                            </label>
                        </Grid>
                        <Card >
                        
                        <img className="poster" src={this.state.poster} alt=""/>
                        </Card>
                            
                    </Grid>
                    <Grid item xs={1}>
                    <Fab color="primary" aria-label="Add" onClick={this.add}>
                        <AddIcon />
                    </Fab>
                    </Grid>
                    
                </Grid>

            </Grid>
            <Snackbar close={this.close} open={this.state.open} message={this.state.message}/>
            </div>
        )
    }
}
AddSeason.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(AddSeason);
  