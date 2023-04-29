import { Grid } from 'gridjs-react';
import { useState,useEffect } from 'react'
import { _ } from "gridjs-react";
import { roomState,picState ,playerState, scoreState,clickState, ruleState } from './atoms.js';
import { useRecoilValue,useRecoilState   } from 'recoil'
import { variables } from "./Variables.js"

const Board = ({ setGameScreen, setResultsModal, id, connection, setRulesModal }) => {
    const [score, setScore] = useRecoilState(scoreState)
    const [canClick, setCanClick] = useRecoilState(clickState);
    const room = useRecoilValue(roomState);
    const pic = useRecoilValue(picState);
    const [players, setPlayers] = useRecoilState(playerState);
    const rules = useRecoilValue(ruleState)


    let x = 0
    const add = () => {
        x++;
        return x;
    }

    useEffect(() => {
        if (rules) {
            setRulesModal('rules')
        }
    })

    const submitScore = (id, score) => {

        if (canClick) {
            setCanClick(false);
            setScore(score)
            fetch(variables.API_URL + '/SubmitScore', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    Id: id, PlayerName: 'string', InGame: 'waiting', Score: score, Icon: pic, room: room,
                })
            })
                .then(res => res.json())


            setTimeout(() => {
                fetch(variables.API_URL)
                    .then(response => response.json())
                    .then(data => {
                        const x = (data.filter(player => player.Room == room))
                        if (x.every(player => player.InGame == 'waiting')) {
                            connection.invoke("CheckS", (room));
                        }

                    })

            }
                , 3000);




        }
    }




    useEffect(() => {

        connection.on('ToResults', () => {
            fetch(variables.API_URL, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    Id: id, PlayerName: 'string', InGame: 'yes', Icon: pic, room: room,
                })
            })
                .then(res => res.json())

            setCanClick(true)
            setResultsModal('results')
        })

    }, [])







    const board = Array(10).fill(0).map((c) => Array.from({ length: 10 }, (r) => _(<div onClick={(e) => submitScore(id, e.nativeEvent.target.innerHTML)} className={`flex flex-col justify-center font-normal text-3xl  w-14 h-12 ${canClick == false ? "text-white bg-black" : "text-black bg-white"}`}>{add()}</div>)))
    return (
        <div className='bg-black w-screen h-screen flex text-center items-center flex-col bg-opacity-95'>

            <div className='w-1/2 mt-3 flex flex-row place-content-center justify-evenly'>
                <button className=" bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                    Board
                </button>

                <button onClick={() => setGameScreen('players')} className=" bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                    Players
                </button>
            </div>
            <div className=' '>
                <div className='border-none w-full h-1/6 flex flex-col justify-center items-center mt-16 text-black bg-white '>
                    <div className='flex flex-col font-semibold text-7xl  text-black bg-white '>{score}</div>
                </div>
                <div className='flex flex-row justify-end'>
                    <div onClick={() => submitScore(id, 0)} className={ `flex flex-col  justify-center font-normal text-3xl      w-14 h-12 ${canClick == false ? "text-white bg-black" : "text-black bg-white"} mt-8`}>
                        0
                    </div>
                </div>

                <div className=''>
                    <Grid
                        data={board}
                    />
                </div>

            </div>



        </div>
        


    )
}

export default Board;