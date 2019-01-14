import React, {Component} from 'react'
import {
    Grid,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Typography,
    Button,
    TextField,
    Divider
    } from '@material-ui/core'
import {Redirect} from 'react-router'
import axios from 'axios';
import url from '../../constantes'
    const styles={
        cardAction:{
            marginBottom:40
        }
    }
class Login extends Component{
    constructor(){
        super()
        this.state={
            
            email:'',
            
            password:'',
            redirect:false
            
        }
    }
    onChange=(e)=>{
        const name=e.target.name
        this.setState({[name]:e.target.value})
    }
    login=()=>{
        const datos={
            email:this.state.email,
            password:this.state.password,
        }

        axios.post(`${url.base}auth/login`,JSON.stringify(datos),{
            headers:{
                'Content-Type': 'application/json',
                'X-Requested-With':'XMLHttpRequest'   
        }})
             .then(data=>{
                 console.log(data)
                 localStorage.setItem('user',JSON.stringify(data.data))
                 this.props.login()
                 
                 
             })
    }
    
render(){
    
    return(
        <div>
        {this.redirect}
        <Grid
        container
        direction="row"
        justify="center"
        >
            <Grid md={5} xs={10} className='mt'>
            <Card>
                <CardHeader
                title={
                <Typography variant="h5" align='center'>
                           Login
                        </Typography>}
                />
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
                    <Grid container justify = "center">
                        <Grid xs={10} container>
                        <Button onClick={this.login} fullWidth variant="contained" color="primary">Login</Button>
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