import React from 'react'
import ObstaclePeer from '../obstacle-peer/obstacle-peer'

export default props =>

    <div className="obstacles">
        <ObstaclePeer key={1} gameOn={props.gameOn} width={props.width} y={props.height} space={props.space} />
        <ObstaclePeer key={2} gameOn={props.gameOn} width={props.width} y={props.height + props.space} space={props.space} />
        <ObstaclePeer key={3} gameOn={props.gameOn} width={props.width} y={props.height + (props.space * 2)} space={props.space} />
        <ObstaclePeer key={4} gameOn={props.gameOn} width={props.width} y={props.height + (props.space * 3)} space={props.space} />
        <ObstaclePeer key={5} gameOn={props.gameOn} width={props.width} y={props.height + (props.space * 4)} space={props.space} />
    </div>