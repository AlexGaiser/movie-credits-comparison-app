import React from 'react'


const SearchResults = (props) => {
    return(
      <div className="actor-searchbox" onClick={()=>props.displayCredits(props.actorId)}>
        <img className="profile-pic" src={props.image} alt={props.name}></img>
        <h3 className="actor-searchname">{props.name}</h3>
        <p>{props.actorId}</p>
        <h3>Known for:</h3>
        <ul>
          {props.known_for}
          {props.creditsList}
        </ul>
      </div>
    )
  }
  
  export default SearchResults