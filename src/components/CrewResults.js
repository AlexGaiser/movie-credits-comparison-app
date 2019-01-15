import React from 'react';

const CrewResults = (props) => {
    return(
        <li key={props.id}>{props.title}, {props.job} ({props.year?props.year:'[Year Unknown]'}) </li>
    )
}
export default CrewResults