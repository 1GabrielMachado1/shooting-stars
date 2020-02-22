import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './plugins/animate.css'
import ShootingStars from './main/shooting-stars';

const clientHeight = document.getElementById('root').clientHeight
const clientWidth = document.getElementById('root').clientWidth

ReactDOM.render(
    <div>
        <h2>Shooting Stars</h2>
        <h1 className="lets-rock">Let's Rock!</h1>
        <ShootingStars clientHeight={clientHeight} clientWidth={clientWidth} />
    </div>

    , document.getElementById('root'));