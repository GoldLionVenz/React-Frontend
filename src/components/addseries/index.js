import React,{Component} from 'react'
import {Grid,
        Card,
        CardHeader,
        CardActions,
        CardContent,
        Typography,
        Button,
        TextField,
        Divider,
        Snackbar,
        IconButton,
    } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import axios from 'axios';
import url from '../../constantes'

const styles ={
            cardAction:{
                marginBottom:40
            },
            root: {
                flexGrow: 1,
              },
            media: {
                height: 600,
                
            },
            input: {
                display: 'none',
            },
            fab: {
                position: 'absolute',
                top: 0,
                right: 0,
              },
        }
class Register extends Component{
    constructor(){
        super()
        this.state={
            title:'',
            plot:'',
            imdbRating:'',
            message:'',
            open:false,
            poster:"http://placehold.it/400x600",
            
        }
    }
    onChange=(e)=>{
        const name=e.target.name
        this.setState({[name]:e.target.value})
    }
    register=()=>{
        const token=JSON.parse(localStorage.getItem('user')).access_token
        console.log(token)
        const datos={
            title:this.state.title,
            plot:this.state.plot,
            imdbRating:this.state.imdbRating,
            file:this.state.poster,
        }

        axios.post(`${url.base}auth/addseerie`,JSON.stringify(datos),{
            headers:{
                'Content-Type': 'application/json',
                'X-Requested-With':'XMLHttpRequest',
                'Authorization':`Bearer ${token}`
        }})
             .then(data=>{
                 console.log(data)
                 this.setState({message:data.data.message})
                 
             }).finally(()=>{this.setState({open:true})})
    }
    posterChange=(e)=>{
        console.log(e.target.files)
        let file=e.target.files
        let reader=new FileReader()
        reader.readAsDataURL(file[0])
        reader.onload=(e)=>{
            this.setState({poster:e.target.result})
        }
    }
    
    render(){
        const { classes } = this.props;
        return(
            <div>
            <Grid
            container
            direction="row"
            justify="center"
            
            >
            <Grid 
            className="relative mt"
            justify="space-between"
            container
            xs={10}
            
            >
                

                <Grid md={6} xs={12}>
                
            
                <Card>
                    <CardHeader
                    title={
                        <Typography variant="h5" align='center'>
                               Agregar Una Serie
                        </Typography>}
                    />
                    <Divider variant="middle" />
                    <CardContent>
                    <TextField
                        value={this.state.title} 
                        fullWidth
                        name="title"
                        label="Title"
                        onChange={this.onChange}
                    />
                    <TextField 
                        value={this.state.email} 
                        fullWidth
                        name="plot"
                        label="Plot"
                        multiline
                        onChange={this.onChange}
                    />
                    <TextField 
                        fullWidth
                        name="imdbRating"
                        label="IMDB Rating"
                        type="number"
                        onChange={this.onChange}
                    />
                    </CardContent>
                    <CardActions  style={{marginBottom: 10}}>
                        <Grid container justify = "center">
                            <Grid xs={10} container>
                            <Button onClick={this.register} fullWidth variant="contained" color="primary">Agregar</Button>
                            </Grid>
                            
                        </Grid>
                    </CardActions>
                </Card>

            </Grid>
            <Grid
             md={5} xs={12}>
                <input accept="image/*" onChange={(e)=>this.posterChange(e)} className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" className={classes.button} component="span">
                    <PhotoCamera />
                    </IconButton>
                </label>
                <Card>
                        <img className="poster" src={this.state.poster} alt=""/>
                </Card>
                     
            </Grid>
            </Grid>
            </Grid>
            <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.message}</span>}
          />
          </div>
        )
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Register);
