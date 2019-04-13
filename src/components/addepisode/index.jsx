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
    upload=async()=>{
        let formData = new FormData();
        formData.append()
        const req=await fetch(``)
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
    video=(e)=>{
        const name=e.target.name
        let file=e.target.files
        console.log(file)
        this.setState({[name]:file})
    }
    render(){
        const { classes } = this.props;
        return(
            <div className='mt'>
            <input accept="*" name="video" onChange={this.video} className={classes.input} id="video" type="file" />
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