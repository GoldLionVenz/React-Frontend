import React, {Component} from 'react';
import {Switch,BrowserRouter, Route} from 'react-router-dom';
import Singup from './components/singup'
import NavBar from './components/nav'
import Login from './components/login'
import AddSerie from './components/addseries'
import Serie from './components/serie'
import AddSeason from './components/addseason'
import AddEpisode from './components/addepisode'
import Home from './components/home';
import Single from './components/single'
import Episodes from './components/episodes'
class Routes extends Component {

    constructor(){
        super()
        this.state={
            login:false,
            avatar:'',
            userName:'',
            data:[]
        }


    }

    componentWillMount(){
        if(JSON.parse(localStorage.getItem('user'))){
            const user=JSON.parse(localStorage.getItem('user'))
            this.setState({login:true,data:user})
        }
    }
    login=()=>{
        const user=JSON.parse(localStorage.getItem('user'))
        this.setState({login:true,data:user})
    }

    render(){
        const UserLayout= ({ children }) => (                       
            <div>
              <NavBar login={this.state.login} avatar={this.state.data.avatar} userName={this.state.data.user_name}/>
              
              {children} 
                                                       
            </div>           
          );
        return(
            <div>
            
            <BrowserRouter>
                
                <Switch>  
                <Route exact path="/" render={() =><UserLayout><Home/></UserLayout>}/>
                <Route exact path="/singup" render={() =><UserLayout><Singup/></UserLayout>}/>
                <Route exact path="/episodes" render={() =><UserLayout><Episodes/></UserLayout>}/>
                <Route exact path="/login"  render={() =><UserLayout><Login login={this.login}/></UserLayout>}/>
                <Route exact path="/addserie" render={() =><UserLayout><AddSerie/></UserLayout>}/>
                <Route exact path="/title/:id" render={({match})=><UserLayout><Serie params={match.params}/></UserLayout>}/>
                <Route exact path="/addseason" render={()=><UserLayout><AddSeason/></UserLayout>}/>
                <Route exact path="/watch/:serie" render={({match})=><UserLayout><Single params={match.params}/></UserLayout>}/>
                <Route exact path="/addepisode" render={()=><UserLayout><AddEpisode/></UserLayout>}/>
                </Switch>
                
            </BrowserRouter>
            </div>
        )
    }

}

export default Routes;