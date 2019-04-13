import React, { Component } from 'react';
import url from '../../constantes'
import ReactPlayer from 'react-player'
import { Grid,Typography,  Avatar,List, ListItem,ListItemText,TextField } from '@material-ui/core';
import Snack from '../snackbar/'
import ButtonSpinner from '../buttonspinner/'
class Single extends Component {
    constructor(){
        super()
        this.state={
            data:{},
            season:{},
            serie:{},
            comments:[],
            comment:'',
            message:'',
            toast:false,
            page:1,
            loading:false,
            next:false
        }
    }
    componentWillMount(){
        this.getEpisode()
    }
    componentDidMount(){
        this.getComments()
    }
    getComments=async()=>{
        this.setState({loading:true})
        const peticion=await fetch(`${url.base}comments/${this.props.params.serie}?page=${this.state.page}`)
        const resp=await peticion.json()
        const array=this.state.comments

        resp.data.forEach(item=>{
            array.push(item)
        })
        this.setState({comments:array,loading:false})
        if(resp.next_page_url){
            this.setState({page:this.state.page+1,next:true})
        }else{
            this.setState({next:false})
        }
    }
    addComment=async()=>{
        const peticion=await fetch(`${url.base}comment/${this.props.params.serie}`,{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body:`content=${this.state.comment}`
        })
        if(peticion.status===201){
            const resp=await peticion.json()
            this.setState({comment:'',toast:true,message:resp.message})
        }
    }
    getEpisode=async()=>{
        const req=await fetch(`${url.base}watch/${this.props.params.serie}`)
        const resp=await req.json()
        this.setState({data:resp,season:resp.season,serie:resp.season.serie})
    }
    onChange=(e)=>{
        const target=e.target
        const name=target.name
        this.setState({[name]:target.value})
    }
    play=()=> {
        this.refs.player.play();
    }
    pause=()=>{
        this.refs.player.pause()
    }

    isPause=()=>{
        return this.state.pause
    }
    render() {

      const {data,serie,season}=this.state
      let comments=this.state.comments.map(comment=>{
          return(
            <ListItem key={comment.id}>
                <Avatar alt="Profile Picture" src={comment.user.avatar} />
                <ListItemText primary={comment.user.user_name} secondary={comment.content} />
            </ListItem>
          )
      })
      return (
          <Grid container direction="row" className='mt' justify="center">
            <Snack message={this.state.message} open={this.state.toast} close={()=>this.setState({toast:false})}/>
            <Grid xs={10} spacing={24} container item justify="center">
                <Grid item xs={12}>
                    <Typography align="center" variant="h5" component="h3">
                        {serie.title} Season {season.number_season} Episode {data.number_episode}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={10} container>
                    <ReactPlayer
                      playing
                      controls
                      width='100%'
                      height='auto'
                      url={data.video}
                      light={season.banner}
                      config={{ file: {
                          //attributes: {crossorigin:"anonymous"},
                          tracks: [
                          {kind: 'subtitles', src: 'http://localhost:3000/subtitle/F9dzNnsyem0xQMGocAgwOnynuYtDjGzhp3GhAizQ.vtt', srcLang: 'en', default: true},
                          ]
                      }}}
                    />
                    {/*<video width="1200" height="720" controls crossorigin="anonymous">
                          <source src='http://127.0.0.1:8000/storage/videos/Qw3TuFvMtGUg7uBsAaodiwsWVEAblQxXQoEVXdx4.mp4'/>
                          <track   src="http://127.0.0.1:8000/storage/subtitles/F9dzNnsyem0xQMGocAgwOnynuYtDjGzhp3GhAizQ.vtt" kind="subtitles" label="English" default/>
                      </video>*/}
                </Grid>
                <Grid md={10} xs={12} spacing={8} item container>
                    <Grid item xs={12}>
                        <Typography  variant="h5" component="h3">
                            {data.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h3">
                            IMBD Rating {data.imdbRating}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="p">
                            {data.plot}
                        </Typography>
                    </Grid>
                </Grid>
                    <Grid md={10} xs={12} spacing={8} item container>
                        <TextField
                            id="standard-full-width"
                            label="Agrega Un Comentario"
                            style={{ margin: 8 }}
                            placeholder="Comentario"
                            fullWidth
                            margin="normal"
                            name='comment'
                            onChange={this.onChange}
                            value={this.state.comment}
                            onKeyDown={(e=>{if(e.key==='Enter'){this.addComment()}})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid md={10} xs={12} spacing={8} item container>
                        <List>
                            {comments}
                        </List>
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
                        <ButtonSpinner loading={this.state.loading} action={this.getComments}  text='Cargar Mas'/>:
                        null}
                    </Grid>        
              </Grid>
        </Grid>
      );
    }
}

export default Single;