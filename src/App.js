import React, { Component } from 'react';
import './App.css';
import Search from './components/Search'
import SearchResults from './components/SearchResults'
import Axios from 'axios'
import api_keys from './.api_config'
import CastResults from './components/CastResults'
import CrewResults from './components/CrewResults'



const TMDBURL = "http://api.tmdb.org/3/search/person?"

const IMGURL = "https://image.tmdb.org/t/p/w780/"

const TMBDACTORURL= "https://api.themoviedb.org/3/person/59216/?api_key=6d4efb86084cebd2619bb03acbf81ab4"

const TMDB_KEY = api_keys.tmdb_key

let searchResults=['Search']

class App extends Component {
  constructor(){
    super()
    this.state={
        param1: '',
        param2: '',
        creditsList:'credits'
    }
  }
  
  handleInputChange =(event)=>{
    const {name, value} = event.target
    this.setState({[name]:value})
  }
  
  displayCredits = async (actorId)=>{
    console.log(actorId)
    const response = await Axios(`https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=6d4efb86084cebd2619bb03acbf81ab4`)

    const credits = response.data
    console.log(credits)
    let creditsList= this.castMap(credits)
    let crewCredits = this.crewMap(credits)
    
    this.setState({...this.state, creditsList: creditsList, crewCredits: crewCredits})
  }

  castMap=(credits) =>{
    if(credits.cast){
      console.log(credits.cast)
      return credits.cast.map((role)=>{
        if(role.title){
          return (<CastResults 
             id={role.id}
             title={role.title}
             character={role.character}
          />)
        }
      })
    }
  }
  crewMap=(credits)=>{
    if(credits.crew){
      return credits.crew.map((role)=>{
        return(<li>Crew: {role.title}</li>)
      })
    }

    }
  

  fetchWikipedia= async (event)=>{
    event.preventDefault()
    const searchTerm= (this.state.searchValue).split(' ').join('%20')
    // console.log(`${TMDBURL}${TMDB_KEY}&query=${searchTerm}`);
    
    const query= `${TMDBURL}${TMDB_KEY}&query=${searchTerm}`
    
    // `http://api.tmdb.org/3/search/person?api_key=6d4efb86084cebd2619bb03acbf81ab4&query=tom%20hanks`
    const response = await Axios(query)
    
    searchResults= response.data.results


    console.log(searchResults)
    this.setState({...this.state,
      resultsList: searchResults.map((result)=> {
        return(
          <SearchResults 
            key={result.id}
            name={result.name}
            actorId={result.id}
            image={`${IMGURL}${result.profile_path}`}
            known_for={result.known_for.map((film)=>{
                return (
                <li>{film.title ?film.title: null}  ({film.release_date})</li>
            )}
            )}
            displayCredits={this.displayCredits}
          />
          ) 
        })
      
    }) 
    // this.setState({...this.state,searchResults: response.data.query.search})

    // this.setState({searchValue: ''})

  }


  render() {
    return (
      
      <div className="App">
         {/* <h1>Search={this.state.searchValue}</h1> */}
         <div className="credits">
         <h3>Cast: </h3>
         {this.state.creditsList}
         <h3>Crew: </h3>
         {this.state.crewCredits}
         </div>
         <Search 

          handleInputChange={this.handleInputChange}
          fetchWikipedia={this.fetchWikipedia} 
          value={this.state.searchValue}
         />
        <h1>SearchResults</h1>
       
        {this.state.resultsList}
      </div>
    );
  }
}

export default App;


