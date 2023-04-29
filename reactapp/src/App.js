import React, { useEffect, useState } from 'react';
import './Components/Styles/App.css';
import HomePage from './Components/HomePage.js'
import HomePagePartTwo from './Components/HomePagePartTwo.js'
import InGame from './Components/InGame.js'
import InstructionsModal from './Components/InstructionsModal';
import * as signalR from "@microsoft/signalr";
import { v4 as uuidv4 } from 'uuid';








function App() {

    const [modal, setModal] = useState(false);
    const [mainScreen, setMainScreen] = useState('firstHome');
    const [connection, setConnection] = useState(null)
    const URL = 'http://localhost:5006/hub'
    const [id, setId] = useState('');







    useEffect(() => {
        setId(uuidv4());
        const connect = new signalR.HubConnectionBuilder()
            .withUrl(URL, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .build();

        setConnection(connect)


    }, []);

    useEffect(() => {
        if (connection) {
            connection.start();
        }
    }, [connection])

    

    







    return (

        <div className="App overflow-hidden">
            {modal && <InstructionsModal setModal={setModal} />}
            {mainScreen == 'firstHome' && <HomePage setModal={setModal} setMainScreen={setMainScreen} />}
            {mainScreen == 'secondHome' && <HomePagePartTwo setModal={setModal} setMainScreen={setMainScreen} id={id} connection={connection } />}    
            {mainScreen == 'inGame' && <InGame connection={connection} id={id} />}   

           

            {/*<h1 className="animate-bounce text-3xl font-bold underline">
                {user}: {message}
            </h1>

            <br />
            <button onClick={() => sendMessage('john',(new Date()).toISOString())}>send date </button>*/}

            </div>



    );
}
export default App;