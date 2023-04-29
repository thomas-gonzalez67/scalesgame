import * as React from "react";
import { useEffect, useState } from "react"
import Players from './Players'
import { playerState } from './atoms.js';
import { roomState, anonymousState, picState} from './atoms.js';
import { useRecoilState, useRecoilValue } from 'recoil';
import { variables } from "./Variables.js"
import * as signalR from "@microsoft/signalr";
import lobbyBackground from './Pictures/lobbyBackground.jpg';
import { ReactSVG } from "react-svg";
import skull from "./Pictures/skull.svg";
import pig from "./Pictures/pig.svg";
import lion from "./Pictures/lion.svg";
import horse from "./Pictures/horse.svg";
import arm from "./Pictures/arm.svg";





    
const Lobby = ({ connection, id,setGameScreen }) => {
    const room = useRecoilValue(roomState);
    const [userPic, setUserPic] = useRecoilState(anonymousState);
    const [players, setPlayers] = useRecoilState(playerState);
    const [pic, setPic] = useRecoilState(picState);
    const [inGame, setInGame] = useState('no');









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

    const updatePic = (pic, id) => {
        setPic(pic)

        fetch(variables.API_URL, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                Id: id, PlayerName: 'string', InGame:inGame, Icon: pic, room: room,
            })
        })
            .then(res => res.json())

        
    }

    const readyUp = (id) => {
        setInGame('yes')
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

        
        

    }



        connection.on('Send', (message) => {
            console.log(message)
        })



    useEffect(() => {
        fetch(variables.API_URL)
            .then(response => response.json())
            .then(data => {
                setPlayers(data.filter(player => player.Room == room));
            });

        if (players.length==5 && players.every(player => player.InGame == 'yes')) {
            setGameScreen('board')
        }
        
    },[players])



    
    return (
        <div className='  h-screen w-screen bg-center bg-cover flex flex-col justify-center items-center' style={{ backgroundImage: `url(${lobbyBackground})` }} >
            <div className='flex items-center justify-center h-1/6 w-1/2 bg-gray-400 bg-opacity-60 rounded-none border-2 border-black border-solid'>
                <h1 className='p-4 pl-2 pt-2 font-effect-emboss font-play text-5xl font-semibold underline tracking-wide text-black'>Players in {room} room</h1>
            </div>
            
            <div className='min-h-1/4 h-1/4 w-1/2 min-w-1/2 bg-gray-400 bg-opacity-60 rounded-none border-2 border-black border-solid'>

                {players.map(player =>
                    <li className='list-none' key={player.PlayerID }>
                        <div className={`pl-2 flex flex-row bg-opacity-60 rounded-none border-2 border-black border-solid text-2xl text-left text-black font-effect-shadow-3d ${player.InGame == 'yes' ? "bg-red-600" : "bg-gray-600" }`}>
                            {player.PlayerName}
                            {player.Icon == 'default' && <img src={userPic} className='ml-2 w-8 h-8' />}
                            {player.Icon != 'default' && <img src={player.Icon} className='ml-2 w-8 h-8' />}

                        </div>
                    </li>


                    )}

            </div>
            <div className='flex flex-col justify-around h-1/3 w-1/2 min-h-1/3 min-w-1/2 bg-gray-300 bg-opacity-60 rounded-none border-2 border-black border-solid'>
                <div>
                    <h1 className=' pl-2  font-effect-emboss max-w-1/2 max-h-1/3 font-play text-3xl font-semibold  tracking-wide text-black'>CHOOSE YOUR PLAYER ICON</h1>
                </div>

                <div className='flex min-w-3/4 min-h-1/2 justify-around justify-center flex-row'>

                    <img src={skull} onClick={() =>updatePic(skull, id)}  className='w-20 h-20 hover:w-24 hover:h-24' />
                    <img src={pig} onClick={() => updatePic(pig, id)} className='w-20 h-20 hover:w-24 hover:h-24'/>
                    <img src={lion} onClick={() => updatePic(lion, id)} className='w-20 h-20 hover:w-24 hover:h-24' />
                    <img src={horse} onClick={() => updatePic(horse, id)} className='w-20 h-20 hover:w-24 hover:h-24' />
                    <img src={arm} onClick={() => updatePic(arm, id)}  className='w-20 h-20 hover:w-24 hover:h-24' />
                </div>


                <div className='flex flex-row justify-center'>
                    <button class="w-2/6 min-w-2/6 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                        Choose Picture
                    </button>

                    <button onClick={()=>readyUp(id) } class="w-2/6 min-w-2/6 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700  hover:border-red-500 rounded">
                        Ready
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Lobby; 