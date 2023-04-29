import './Styles/App.css';



const InstructionsModal = ({ setModal }) => {
    return (
        <div className='Modal  flex flex-col    bg-red-500 border-solid border-red-700 rounded-3xl border-8 '  >
            <div className='flex-.9 h-1/6 bg-red-400 flex flex-col justify-center '>
                <h1 className='text-center   text-black tracking-wider font-play underline  text-6xl font-bold font-effect-shadow-multiple'>INSTRUCTIONS</h1>
            </div>

            <div className='flex-1 '>
                <ul className=' h-5/6 mt-8 instruction  flex flex-col  justify-around'>
                    <li className='font-play text-l'>MUST HAVE 5 PLAYERS EXACTLY WHO ALL KNOW THE ROOM CODE TO PLAY.</li>
                    <li className='font-play text-l'>Enter room code and username to join room. Each player who enters room code will join the lobby (Must have 5 exactly)</li>
                    <li className='font-play text-l'>At the start of each round, each player will pick a number from 0-100. After everyone picks and locks in their number, the average will be computed. That average will then be multiplied by (.8). Which ever player's chosen number is closest to that new number will be safe while everybody else loses one life.</li>
                    <li className='font-play text-l'>Each player will start at 0. For each life loss that number will go down by one point. Once a player hits -10, they are eliminated from the game</li>
                    <li className='font-play text-l'>After each player is eliminated a new rule will be added to the game.</li>
                    <li className='font-play text-l'>The final player left standing wins the game! ENJOY PLAYING</li>
                </ul>
                
            </div>

            <div className='flex-.9 h-1/6 bg-red-900 items-center flex justify-center'>
                <button onClick={ ()=> setModal(false)} class="w-1/6 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                    CLOSE
                </button>
            </div>
        


        </div>
    )

}

export default InstructionsModal;