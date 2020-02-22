import React from 'react'
import './obstacle.css'

export default props =>
    <img className="obstacle" style={{...props.style}} src={require(`../../imgs/${props.name}.png`)} alt="obstacle"></img>