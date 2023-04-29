import './Styles/App.css';
import aliceKing from './Pictures/aliceKing.png';
import { variables } from "./Variables.js"
import { useEffect, useState, Component } from "react";
import { roomState, playerState ,playerNameState} from './atoms.js';
import { useRecoilState, useRecoilValue } from 'recoil';


const HomePagePartTwo = ({ setModal, setMainScreen, id, connection}) => {

    const [player, setPlayer] = useRecoilState(playerNameState)
    const [room, setRoom] = useRecoilState(roomState)

    const toLob = () => {
        console.log(id)
        fetch(variables.API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                Id: id, PlayerName: player, Lives:0, Score:0, InGame:'no', Icon: 'default', Room:room
            })
        })
            .then(res => res.json())
            .then(connection.invoke("AddToGroup", room))
        setMainScreen('inGame')

       
    }










        

    return (
        <div className=' bg-black w-screen h-screen  flex flex-col justify-start items-center justify-evenly'  >

            <div className='bg-center bg-cover h-3/6 w-5/6 flex flex-col text-center place-content-end align-center'style={{
                backgroundImage: `url(${aliceKing})`
            }}>


                <h2 className=" text-7xl font-bold mb-14  tracking-widest	font-effect-3d font-orbital text-gray-500 " ><span>BALANCE SCALES</span></h2>



            </div>

            <div className=' flex flex-col bg-gray-900 justify-start items-center justify-center w-5/6 min-w-5/6 rounded-sm border-2 border-red-700 border-solid'>

                <div >
                    <h1 className='my-8 text-4xl text-opacity-100 font-serif max-w-1/2 text-red-800 font-bold'>ENTER GAME: KING OF DIAMONDS</h1>
                </div>
                <div className='flex flex-row justify-center items-center   w-6/12'>
                    <h1 className='mr-2 text-2xl text-opacity-100 italic font-semibold font-serif min-w-1/2 text-red-700'>ENTER ROOM NAME:</h1>
                    <input onChange={(e) => setRoom(e.target.value)}  className='w-80 pl-2'  />
                </div>

                <div className='flex flex-row justify-center items-center min-w-6/12 w-6/12'>
                    <h1 className='ml-2 text-2xl text-opacity-100 italic font-semibold font-serif min-w-1/2 text-red-700 mr-2'>ENTER USER NAME:</h1>
                    <input onChange={(e) => setPlayer(e.target.value)} className='w-80 pl-2'/>
                </div>

                <div className='flex flex-row w-full justify-center'>
                    <button onClick={toLob} className='my-8 w-1/6 bg-red-600 mx-4 rounded-sm  border-2 font-mono tracking-widest border-red-900 h-8'>
                        ENTER
                    </button>

                    <button onClick={() => setModal(true)} class="my-8  w-1/6 min-w-40 bg-red-600 rounded-sm border-2 font-mono tracking-widest border-red-900 h-8">
                        INSTRUCTIONS
                    </button>
                </div>


            </div>

  





        </div>
    )

}

export default HomePagePartTwo;