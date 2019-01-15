
import React from 'react';

const Search = (props) => {
    return(
    <React.Fragment>
    <form onSubmit={(event)=>props.fetchWikipedia(event, props.searchNumber)}>
    <input name="searchValue" value={props.searchValue} placeholder="Search Here" type="text" onChange={props.handleInputChange}></input>
        <button >Search</button>
    </form>
    </React.Fragment>
    )
}

export default Search
