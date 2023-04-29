import { variables } from "./Variables.js"
import React, { useEffect, useState, Component } from "react";
import { useRecoilState } from 'recoil';
import { playerState, anonymousState } from './atoms.js'
import playerBack from './Pictures/playerBack.jpg'

const Players = ({ setGameScreen }) => {

    const [players, setPlayers] = useRecoilState(playerState);

    const [userPic, setUserPic] = useRecoilState(anonymousState);



    return (
        <div className='bg-center bg-cover w-screen h-screen flex text-center items-center flex-col ' style={{ backgroundImage: `url(${playerBack})` }} >

            <div className='w-1/2 mt-3 flex flex-row place-content-center justify-evenly'>
                <button onClick={() => setGameScreen('board')} className=" bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                    Board
                </button>

                <button className=" bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                    Players
                </button>
            </div>
            <div className=' flex flex-row justify-center items-center'>

                {players.map(player =>
                    <li className='list-none' key={player.PlayerID}>
                        <div className={`pl-2 h-screen flex flex-col items-center text-2xl text-left text-black  justify-evenly`}>
                            <div className='flex flex-col items-center text-black font-bold '>
                                {player.Icon == 'default' && <img src={userPic} className='bg-opacity-50 border-white border-solid border-2 ml-2 w-32 h-32' />}
                                {player.Icon != 'default' && <img src={player.Icon} className='bg-opacity-50 border-white border-double bg-white border-4 ml-2 w-32 h-32' />}
                                <div className='bg-white bg-opacity-50 mt-1 '>{player.PlayerName}</div></div>
                            <div className='border-black border-double border-4 w-32 h-32 flex flex-col justify-center items-center  text-black bg-white '>
                                <div className='flex flex-col font-semibold text-7xl  text-black bg-white '>{player.Lives}</div>
                            </div>


                        </div>
                    </li>


                )}

            </div>
        </div>
    )
}

export default Players;