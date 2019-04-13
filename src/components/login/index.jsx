import React, {Component} from 'react'
import {
    Grid,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Typography,
    TextField,
    Divider
    } from '@material-ui/core'
import {Link} from 'react-router-dom'
import ButtonSpinner from '../buttonspinner/'
import url from '../../constantes'
import Snack from '../snackbar/'
class Login extends Component{
    constructor(){
        super()
        this.state={
            
            email:'',
            
            password:'',
            loading:false,
            toast:false,
            message:''
            
        }
    }
    onChange=(e)=>{
        const name=e.target.name
        this.setState({[name]:e.target.value})
    }
    login=async()=>{
        const{
            email,
            password,
        }=this.state
        this.setState({loading:true})
        const peticion= await fetch(`${url.base}auth/login`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'   
            },
            body:`email=${email}&password=${password}`
        })
        
        const resp = await peticion.json()
        this.setState({loading:false})
        if(peticion.status===401){
            this.setState({toast:true,message:resp.message})
            return
        }
        localStorage.setItem('user',JSON.stringify(resp))
        localStorage.setItem('token',resp.access_token)
        this.props.login()
        
    }
    
render(){
    
    return(
        <div  className='mt'>
        <Snack message={this.state.message} open={this.state.toast} close={()=>this.setState({toast:false})}/>
        {this.redirect}
        <Grid container direction="row" justify="center">
            <Grid item md={4} xs={10}>
                <Card>
                    <CardHeader title={<Typography variant="h5" align='center'>Login</Typography>}/>
                    <Divider variant="middle" />
                    <CardContent>
                        <TextField 
                            value={this.state.email} 
                            fullWidth
                            name="email"
                            label="Email"
                            type="email"
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
                    </CardContent>
                    
                    <CardActions  style={{marginBottom: 10}}>
                        <Grid container spacing={8} justify = "center">
                            <Grid item xs={10} container>
                                <ButtonSpinner loading={this.state.loading} action={this.login} fullWidth text='Login'/>
                            </Grid> 
                            <Grid item xs={10} container justify = "center">
                                <Typography variant="caption">No tienes Cuenta? <Link to='/singup'> Registrate</Link>
                                </Typography >
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    </div>
    )
}}

export default Login