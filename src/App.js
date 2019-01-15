import React, { Component } from 'react';
import './App.css';
import Search from './components/Search'
import SearchResults from './components/SearchResults'
import Axios from 'axios'
import api_keys from './.api_config'
import CastResults from './components/CastResults'
import CrewResults from './components/CrewResults'
import InCommon from './components/InCommon'


const TMDBURL = "http://api.tmdb.org/3/search/person?"

const IMGURL = "https://image.tmdb.org/t/p/w780/"

// const TMBDACTORURL= "https://api.themoviedb.org/3/person/59216/?api_key=6d4efb86084cebd2619bb03acbf81ab4"

const TMDB_KEY = api_keys.tmdb_key

const allCredits={search1:{},search2:{}}


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
  
  displayCredits = async (actorId,searchNumber)=>{
    console.log(searchNumber)
    const response = await Axios(`https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=6d4efb86084cebd2619bb03acbf81ab4`)

    const credits = response.data
    console.log(credits)

    allCredits[`search${searchNumber}`].castCredits = this.castMap(credits)
    allCredits[`search${searchNumber}`].crewCredits = this.crewMap(credits)
    allCredits[`search${searchNumber}`].castIds = credits.cast.map((film)=>film.id)
    allCredits[`search${searchNumber}`].crewIds = credits.crew.map((film)=>film.id)
    
    this.setState({...this.state, allCredits:allCredits})
    console.log(this.state.allCredits)
  }
  // displayCreditsActor2 = async (actorId)=>{
  //   console.log(actorId)
  //   const response = await Axios(`https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=6d4efb86084cebd2619bb03acbf81ab4`)

  //   const credits = response.data
  //   console.log(credits)
  //   let creditsListActor2= this.castMap(credits)
  //   let crewCreditsActor2 = this.crewMap(credits)
    
  //   this.setState({...this.state, creditsList: creditsListActor1, crewCredits: crewCreditsActor1})
  // }
  castMap=(credits) =>{
    if(credits.cast){
      return credits.cast.map((cast)=>{
        if(cast.title){
          return (<CastResults 
             id={cast.id}
             title={cast.title}
             year={cast.release_date}
             character={cast.character}
          />)
        }
      })
    }
  }

  crewMap=(credits)=>{
    if(credits.crew){
      return credits.crew.map((crew)=>{
        return(<CrewResults 
          id={crew.id}
          job={crew.job}
          title={crew.media_type==='tv'? crew.name: crew.title}
          year={crew.media_type==='tv'? 'First aired: ' + crew.first_air_date :crew.release_date}
        />)
      })
    }
  }
  

  fetchWikipedia= async (event, searchNumber)=>{
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
            searchNumber={searchNumber}
            actorId={result.id}
            image={`${IMGURL}${result.profile_path}`}
            known_for={result.known_for.map((film)=>{
                return (
                <li key={film.id}>{film.title ?film.title: null}  ({film.release_date})</li>
            )}
            )}
            displayCredits={this.displayCredits}
            setName={()=>allCredits[`search${searchNumber}`].name=result.name}
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
         <h2>{this.state.allCredits
            ? this.state.allCredits.search1.name
            : null}</h2>
         <h3>Cast Credits: </h3>
         {this.state.allCredits
            ? this.state.allCredits.search1.castCredits
            : null}
         <h3>Crew Credits: </h3>
         {this.state.allCredits
              ? this.state.allCredits.search1.crewCredits
              :null}
         </div>
         <div className="credits">
         <h2>{this.state.allCredits
            ? this.state.allCredits.search2.name
            : null}</h2>
         <h3>Cast Credits: </h3>
         {this.state.allCredits
            ? this.state.allCredits.search2.castCredits
            : null}
         <h3>Crew Credits: </h3>
         {this.state.allCredits
              ? this.state.allCredits.search2.crewCredits
              :null}
         </div>
         <InCommon 
            allCredits={this.state.allCredits}
         />
         <Search 
          searchNumber={1}
          handleInputChange={this.handleInputChange}
          fetchWikipedia={this.fetchWikipedia} 
          value={this.state.searchValue}
         />
         <Search 
          searchNumber={2}
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


