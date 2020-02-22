import React, { Component } from 'react'
import './shooting-stars.css'
import StarShip from '../components/starship/starship'
import Obstacles from '../components/obstacles/obstacles'
import Score from '../components/score/score'

export default class ShootingStars extends Component {

    state = { scoreValue: 0, gameOn: true }

    constructor(props) {
        super(props)
    }

    pause() {
        document.getElementById('audioTheme').pause();
        document.getElementById('audioTheme').currentTime = 0;
    }

    componentDidMount() {

        setTimeout(() => {
            document.getElementById('audioTheme').play();
            document.querySelector('.lets-rock').classList.add('animated', 'zoomOutUp')
        }, 150);

        const obstaclePeers = document.querySelectorAll('.obstacle-peer')
        const starship = document.querySelector('.starship')

        let gameOn = setInterval(() => {
            if (this.collided(starship, obstaclePeers)) {
                this.pause()
                this.setState({ gameOn: false })
                clearInterval(gameOn)
            }
        }, 15);

        this.setState({ gameOn: true });
    }

    hasOverlap(elementA, elementB) {
        const a = elementA.getBoundingClientRect()
        const b = elementB.getBoundingClientRect()

        const horizontal = a.left + (a.width - 20) >= b.left
            && b.left + b.width >= a.left
        const vertical = a.top + a.height >= b.top
            && b.top + (b.height - 15) >= a.top
        return horizontal && vertical
    }

    collided(starship, obstaclesPeers) {
        let collided = false
        obstaclesPeers.forEach(peer => {
            if (!collided) {
                const left = peer.children[0]
                const right = peer.children[1]
                collided = this.hasOverlap(starship, left)
                    || this.hasOverlap(starship, right)
            }
        })
        return collided
    }

    render() {
        return (
            <div className="shooting-stars">
                <Score scoreValue={this.state.scoreValue} />
                <Obstacles gameOn={this.state.gameOn} width={this.props.clientWidth} height={this.props.clientHeight} space={100} />
                <StarShip gameOn={this.state.gameOn} gameWidth={this.props.clientWidth} />
                <audio id="audioTheme" src={require("../audio/theme.mp3")} type="audio/mpeg"></audio>
            </div>
        )
    }
}