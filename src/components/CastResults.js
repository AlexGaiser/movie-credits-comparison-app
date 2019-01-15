import React from 'react';

const CastResults = (props) => {
    return(
        <li key={props.id}>{props.title}, "{props.character}" ({props.year}) </li>
    )
}
export default CastResults