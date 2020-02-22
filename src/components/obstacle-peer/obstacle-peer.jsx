import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Obstacle from '../obstacle/obstacle'
import './obstacle-peer.css'

const displacement = 5.0

function getChar() {
    const items = ['alien-1', 'alien-2', 'alien-3', 'asteroid', 'meteor', 'satellite']
    const random = items[Math.floor(Math.random() * items.length)]

    return random
}

const initialState = {
    name1: getChar(),
    name2: getChar()
}

export default class ObstaclePeer extends Component {
    state = { ...initialState }

    constructor(props) {
        super(props)
        this.getY = this.getY.bind(this)
        this.getHeight = this.getHeight.bind(this)
        this.setY = this.setY.bind(this)
        this.animate = this.animate.bind(this)
    }

    getY = () => parseInt(ReactDOM.findDOMNode(this).style.bottom.split('px')[0])
    getHeight = () => document.getElementById('root').clientHeight
    setY = (y) => { return this.setState({ y: y }) }

    setLeft = (distance) => (Math.random() * (this.props.width - distance))
    setRight = (distance, left) => { return this.props.width - distance - left }

    setPositions = () => {
        const distance = (Math.floor(Math.random() * 500) + 74)

        const leftPosition = this.setLeft(distance)
        const rightPosition = this.setRight(distance, leftPosition)

        this.setState({ left: leftPosition, right: rightPosition })
    }

    componentDidMount() {
        this.setState({
            y: this.props.y, name1: getChar(),
            name2: getChar()
        })
        this.setPositions()

        let animateInterval = setInterval(() => {
            this.animate();
            if(!this.props.gameOn) clearInterval(animateInterval)
        }, 15);
    }

    render() {
        let element = <div className="obstacle-peer" style={{ bottom: `${this.state.y}px` }}>
            <Obstacle name={this.state.name1} style={{ left: `${this.state.left}px` }} />
            <Obstacle name={this.state.name2} style={{ right: `${this.state.right}px` }} />
        </div>

        return (element)
    }

    uploadScore() {
        let oldVal = parseInt(document.querySelector('.score').innerText)
        document.querySelector('.score').innerText = ++oldVal
    }

    changeChars() {
        this.setState({ name1: getChar(), name2: getChar() })
    }

    animate = function () {
        this.setY(this.getY() - displacement)

        if (this.getY() < -this.getHeight()) {
            this.setY(this.getY() + this.props.space * 7)

            this.setPositions();

            const pointHeight = this.props.y * 0.05
            const didPoint = this.getY() + displacement >= pointHeight
                && this.getY() > pointHeight

            if (didPoint) {
                this.uploadScore()
                this.changeChars()
            }
        }
    }
}