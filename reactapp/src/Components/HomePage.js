import './Styles/App.css';



import aliceBackground from './Pictures/aliceBackground.png';
import { useEffect, useState } from 'react';

const HomePage = ({ setModal, setMainScreen }) => {


    return (
        <div className=' flex flex-col justify-start items-center bg-black w-screen h-screen'  >

            <div className="flex flex-col  bg-center place-content-center justify-evenly h-screen w-screen bg-cover " style={{ backgroundImage: `url(${aliceBackground})` }}>
                <div>

                    <h2 className="mt-16 hero glitch layers text-7xl font-bold  font-effect-anaglyph font-inconsolata text-white " data-text="ALICE IN BORDERLAND"><span>ALICE IN BORDERLAND</span></h2>
                    <h1 className='tracking-widest text-opacity-100 italic font-semibold font-play font-effect-anaglyph text-gray-200 text-5xl'>King of Diamonds</h1>
                </div>

                <div className='flex flex-row place-content-center justify-evenly'>
                    <button onClick={() => setModal(true)} className="w-1/6 overflow-hidden bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                        Instruct...
                    </button>

                    <button onClick={()=> setMainScreen('secondHome') } className=" wow w-1/6 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                        Play
                    </button>
                </div>

            </div>




            
        </div>
    )
    
}

export default HomePage;

