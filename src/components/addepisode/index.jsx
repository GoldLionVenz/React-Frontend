import React, {Component} from 'react'
import { Grid, TextField,MenuItem,IconButton,Card,Fab,Button  } from '@material-ui/core';
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
class AddEpisode extends Component{

    constructor(){
        super()
        this.state={
            video:'',
            subtitle:''
        }
    }
    upload=()=>{
        //const token=JSON.parse(localStorage.getItem('user')).access_token
        //console.log(token)
        const datos={
            //title:this.state.title,
            //plot:this.state.plot,
            //imdbRating:this.state.imdbRating,
            video:this.state.video,
            subtitle:this.state.subtitle
        }

        axios.post(`${url.base}addepisodes`,JSON.stringify(datos),{
            headers:{
                'Content-Type': 'application/json',
                'X-Requested-With':'XMLHttpRequest',
                //'Authorization':`Bearer ${token}`
        }})
             .then(data=>{
                 console.log(data)
                 //this.setState({message:data.data.message})
                 
             })//.finally(()=>{this.setState({open:true})})
    }
    fileChange=(e)=>{
        
        const name=e.target.name
        let file=e.target.files
        let reader=new FileReader()
        reader.readAsDataURL(file[0])
        reader.onload=(e)=>{
            console.log(e.target.result)
            this.setState({[name]:e.target.result})
        }
    }
    render(){
        const { classes } = this.props;
        return(
            <div className='mt'>
            <input accept="*" name="video" onChange={(e)=>this.fileChange(e)} className={classes.input} id="video" type="file" />
                <label htmlFor="video">
                    <IconButton color="primary" className={classes.button} component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
            <input accept="*" name="subtitle" onChange={(e)=>this.fileChange(e)} className={classes.input} id="subtitle" type="file" />
                <label htmlFor="subtitle">
                    <IconButton color="primary" className={classes.button} component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
                <Button onClick={this.upload}>okey</Button>
            </div>
        )
    }
}

AddEpisode.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(AddEpisode);