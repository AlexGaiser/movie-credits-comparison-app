import React from 'react';

const CrewResults = (props) => {
    return(
        <li key={props.id}>{props.title}, {props.job} </li>
    )
}
export default CrewResults