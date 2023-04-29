import * as React from "react";
import { useEffect, useState } from "react"
import Lobby from './Lobby.js'
import { variables } from "./Variables.js"
import { roomState, playerState } from './atoms.js';
import { useRecoilState, useRecoilValue } from 'recoil';
import GameRoom from "./GameRoom.js";
import Board from './Board.js'
import Players from './Players.js'
import Results from './Results.js'
import Rules from './Rules.js';





const InGame = ({ connection, id }) => { 


    const [room] = useRecoilValue(roomState);
    const [gameScreen, setGameScreen] = useState('lobby')
    const [resultsModal, setResultsModal] = useState('no')
    const [rulesModal, setRulesModal] = useState('no');


    window.onbeforeunload = e => {
        e.preventDefault();

        fetch(variables.API_URL, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                Id: id, PlayerName: 'string', InGame: 'yes', Score: 0, Lives: 0, Icon: 'pic', room: room,
            })

        })
        return;
    };

    return (
        <div>
            {resultsModal == 'results' && <Results id={id} setResultsModal={setResultsModal} setGameScreen={setGameScreen} connection={connection} />}
            {gameScreen == 'rules' && <Rules setGameScreen={setGameScreen} />}
            {gameScreen == 'lobby' && <Lobby connection={connection} id={id} setGameScreen={setGameScreen} />}
            {gameScreen == 'board' && <Board setGameScreen={setGameScreen} setResultsModal={setResultsModal} id={id} connection={connection} />}
            {gameScreen == 'players' && <Players setGameScreen={setGameScreen} />}
        </div>
        
    )
}

export default InGame; 