import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './starship.css'
import ship from '../../imgs/starship.png'

const initialState = {
    flying: false,
    direction: null
}

export default class Starship extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.getX = this.getX.bind(this)
        this.setX = this.setX.bind(this)
    }

    componentDidMount() {
        this.setX((this.props.gameWidth / 2) - 82);

        let animateInterval = setInterval(() => {
            this.animate(this.state.direction);
            if(!this.props.gameOn) clearInterval(animateInterval)
        }, 15);
    }

    getX = () => {
        return parseInt(ReactDOM.findDOMNode(this).style.left.split('px')[0])
    }
    setX = (x) => { return ReactDOM.findDOMNode(this).style.left = `${x}px` }

    animate = (direction) => {
        if (direction && this.state.flying) {
            const newX = (this.getX() + (direction === 'left' ? -6 : 6))
            const maxX = this.props.gameWidth - (parseInt(ReactDOM.findDOMNode(this).clientWidth))

            if (newX <= 0) {
                this.setX(0)
            } else if (newX > maxX) {
                this.setX(maxX)
            } else {
                this.setX(newX)
            }
        }
    }

    render() {
        window.onkeydown = e => {
            let direction = null;

            switch (e.key) {
                case 'ArrowLeft':
                    direction = 'left'
                    break;

                case 'ArrowRight':
                    direction = 'right'
                    break;

                default:
                    direction = null
                    break;
            }

            this.setState({ flying: true, direction: direction })
        }

        window.onkeyup = e => {
            return this.setState({ flying: false, direction: null })
        }

        return (<img className="starship" src={ship} alt="starship"></img>)
    }
}