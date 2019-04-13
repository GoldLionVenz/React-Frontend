import React,{Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid,
        Card,
        CardHeader,
        CardActions,
        CardContent,
        Typography,
        Button,
        TextField,
        Divider,
        IconButton,
        Avatar,
    } from '@material-ui/core'
import Snackbar from '../snackbar'
import axios from 'axios';
import {PhotoCamera,Save} from '@material-ui/icons/';
import AvatarEditor from 'react-avatar-editor'
import url from '../../constantes'
import {Link} from 'react-router-dom'
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
      bigAvatar: {
        margin: 10,
        width: 200,
        height: 200,
      },
}
class Singup extends Component{
    constructor(){
        super()
        this.state={
            name:'',
            email:'',
            userName:'',
            password:'',
            password_confirmation:'',
            message:'',
            open:false,
            avatar:'img/noavatar.png',
            avatarSelect:true,
            avatarBase64:''
        }
    }
    onChange=(e)=>{
        const name=e.target.name
        this.setState({[name]:e.target.value})
    }
    register=()=>{
        
        const datos={
            name:this.state.name,
            email:this.state.email,
            user_name:this.state.userName,
            password:this.state.password,
            c_password:this.state.password
        }
        if(this.state.avatarBase64!=='')
            datos.file=this.state.avatarBase64
        console.log(datos)
        axios.post(`${url.base}auth/signup`,JSON.stringify(datos),{
            headers:{
                'Content-Type': 'application/json',
                'X-Requested-With':'XMLHttpRequest'   
        }})
             .then(data=>{
                 console.log(data)
                 this.setState({message:data.data.message})
                 
             }).finally(()=>{this.setState({open:true})})
    }
    avatarChange=(e)=>{
        this.setState({avatarSelect:false})
        console.log(e.target.files)
        let file=e.target.files
        let reader=new FileReader()
        reader.readAsDataURL(file[0])
        reader.onload=(e)=>{
            this.setState({avatar:e.target.result})
        }
    }
    saveAvatar=()=>{
        if (this.editor){
        const canvas = this.editor.getImage().toDataURL();
        let imageURL;
        fetch(canvas)
        .then(res =>{
            console.log(res.url)
            this.setState({avatarBase64:res.url})
            return res.blob()})
        .then(blob =>{ 
            imageURL = window.URL.createObjectURL(blob)
            this.setState({avatar:imageURL,avatarSelect:true})
            
        });
        
        //
        }
    }
    close=()=>{
        this.setState({open:false})
    }
    setEditorRef = (editor) => this.editor = editor
    render(){
        const { classes } = this.props;
        return(
            <div className='mt mb'>
            <Grid
            
            container
            direction="row"
            justify="center"
            >
                <Grid item md={4} xs={10}>
                <Card>
                    <CardHeader
                    title={
                    <Typography variant="h5" align='center'>
                               Registrate
                            </Typography>}
                    />
                    <Divider variant="middle" />
                    <CardContent align='center'>
                    {this.state.avatarSelect?<Avatar alt="Remy Sharp" src={this.state.avatar} className={classes.bigAvatar} />
                    :<AvatarEditor
                        ref={this.setEditorRef}
                        image={this.state.avatar}
                        height={200}
                        border={50}
                        color={[56, 54, 54, 1]} // RGBA
                        scale={1.3}
                        
                        style={{ borderRadius:'50%' }}
                        rotate={0}
                        borderRadius={500}
                        
                    />}
                    <Grid item xs={8}  container
                          justify="space-between"
                          direction="row">
                    <input accept="image/*" onChange={(e)=>this.avatarChange(e)} className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" className={classes.button} component="span">
                        <PhotoCamera />
                        </IconButton>
                    </label>
                    <IconButton color="primary" onClick={this.saveAvatar} className={classes.button} component="span">
                        <Save/>
                    </IconButton>
                    </Grid>
                    <TextField
                        value={this.state.name} 
                        fullWidth
                        name="name"
                        label="Name"
                        onChange={this.onChange}
                    />
                    <TextField 
                        value={this.state.email} 
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        onChange={this.onChange}
                    />
                    <TextField 
                        fullWidth
                        name="userName"
                        label="UserName"
                        onChange={this.onChange}
                    />
                    <TextField
                        value={this.state.password} 
                        fullWidth
                        type="password"
                        name="password"
                        label="PassWord"
                        onChange={this.onChange}
                    />
                    <TextField
                        value={this.state.password} 
                        fullWidth
                        type="password"
                        name="password_confirmation"
                        label="Confima tu PassWord"
                        onChange={this.onChange}
                    />
                    </CardContent>
                    <CardActions  style={{marginBottom: 10}}>
                        <Grid container spacing={8} justify = "center">
                            <Grid item xs={10} container>
                            <Button onClick={this.register} fullWidth variant="contained" color="primary">Registrarte</Button>
                            </Grid>
                            <Grid item xs={10} container justify = "center">
                                <Typography variant="caption">Ya Tienes Cuenta? <Link to='/login'> Login</Link>
                                </Typography >
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>

            </Grid>
            </Grid>
            <Snackbar close={this.close} open={this.state.open} message={this.state.message}/>
          </div>
        )
    }
}
Singup.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Singup);