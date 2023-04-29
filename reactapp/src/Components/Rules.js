import React, { useEffect, useState, Component } from "react";
import { useRecoilState } from 'recoil';
import { playerState, anonymousState, roomState, playerNameState, scoreState } from './atoms.js'
import { useRecoilValue } from 'recoil'
import playerBack from './Pictures/playerBack.jpg'
import './Styles/App.css';
import { variables } from "./Variables.js"


const Rules = ({setGameScreen}) => {

    const [daRules, setDaRules] = useState([]);
    const [players, setPlayers] = useRecoilState(playerState)
    const room = useRecoilValue(roomState);
    var x = 0;

    useEffect(() => {
        
        
        fetch(variables.API_URL)
            .then(response => response.json())
            .then(data => {
                setPlayers(data.filter(player => player.Room == room));
                x = players.length
            })
        console.log(players)
        if (players.length == 4) {
            setDaRules(rulesO)
        }

        if (players.length == 3) {
            setDaRules(rulesT)
        }

        if (players.length==2) {
            setDaRules(rulesTh)
        }

        if (players.length==1) {
            setDaRules(['YOU WIN'])
        }
    },[players])



    const rulesO = ["1.) Whenever two or more players submit the same number, all of those players are disqualified and their scores aren't counted"];
    const rulesT = ["1.) Whenever two or more players submit the same number, all of those players are disqualified and their scores aren't counted", "2.) If the winner's score is equal to the final number, everybody else loses 2 lives."];
    const rulesTh = ["1.) Whenever two or more players submit the same number, all of those players are disqualified and their scores aren't counted", "2.) If the winner's score is equal to the final number, everybody else loses 2 lives.", "3.) If one player picks 0 and the other picks 100, the player who picked 100 wins"];



    return (

        <div className=' flex flex-col w-screen h-screen bg-center bg-cover border-solid border-red-700  border-8 flex text-center items-center justify-evenly flex-col overflow-y-scroll ' style={{ backgroundImage: `url(${playerBack})` }} >



            <div className='flex flex-col  '>

                {daRules.map(rule =>
                    <div className=' my-5 bg-opacity-60 rounded-none bg-white border-2 border-black border-solid'>

                    
                    <li className='list-none ' key={Math.random(100)}>
                        <div className='font-play text-3xl'>
                            {rule}
                        </div>

                        </li>

                    </div>


                )}

            </div>
            <button onClick={() => setGameScreen('board')}  className=" bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                Board
            </button>
        </div>
    )
}

export default Rules;