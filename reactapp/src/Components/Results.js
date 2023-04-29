import { variables } from "./Variables.js"
import React, { useEffect, useState, Component } from "react";
import { useRecoilState } from 'recoil';
import { playerState, anonymousState, roomState, playerNameState ,scoreState,ruleState} from './atoms.js'
import { useRecoilValue } from 'recoil'
import playerBack from './Pictures/playerBack.jpg'
import './Styles/App.css';


const Results = ({ id, setResultsModal, setGameScreen ,connection}) => {
    const [players, setPlayers] = useRecoilState(playerState);
    const room = useRecoilValue(roomState);
    const [userPic, setUserPic] = useRecoilState(anonymousState);
    const [final, setFinal] = useState(0)
    const [winner, setWinner] = useState([]);
    const [player, setPlayer] = useRecoilState(playerNameState)
    const [score, setScore] = useRecoilState(scoreState)
    const [rule, setRule] = useRecoilState(ruleState);


    useEffect((minPeople) => {
        connection.on("toRules", () => {
            setGameScreen('rules')
        })
        setScore('');
        var minPeople = [];
        var x = []
        var win = ''
        var lives = 0;
        var lose = true;
        var superLose = false;
        var finalRound = false;
        fetch(variables.API_URL)
            .then(response => response.json())
            .then(data => {
                setPlayers(data.filter(player => player.Room == room));
                x = data.filter(player => player.Room == room);
                x.map(y => { if (y.PlayerID == id) {lives=y.Lives } })
            })

        setTimeout(() => {
            var total = 0;
            var dups = [];
            let min = 101;
            if (x.length < 5) {
                var scores = x.map((item) =>  item.Score );
                if (x.length < 3) {
                    if (scores.includes(0) && scores.includes(100)) {
                        finalRound = true;
                    }
                }
                dups = scores.filter((item, idx) => {
                    return scores.indexOf(item) != idx
                });

                
            }

            console.log(dups)
            for (let y = 0; y < x.length; y++) {
                if (!dups.includes(x[y].Score)) {
                    if (x[y].PlayerID == id) {
                        lose = false;
                        console.log(lose)
                    }
                    
                    total = (total + x[y].Score);
                }
                
               
            }
            total = Math.round(total / x.length * .8)
            setFinal(total)


            
            for (let y = 0; y < x.length; y++) {
                if (finalRound) {
                    if (x[y].Score == 100) {
                        minPeople = x[y].PlayerID;
                    }
                }
                if (!dups.includes(x[y].Score) && Math.abs(x[y].Score - total) < min && !finalRound) {
                    if ((Math.abs(x[y].Score - total == 0))) {
                        if (x.length < 4) {
                            superLose = true;
                        }
                    }
                        min = Math.abs(x[y].Score - total);
                    minPeople = [x[y].PlayerID]
                        console.log(minPeople)
                    }

                if (Math.abs(x[y].Score - total) == min && !lose) {
                    minPeople.push(x[y].PlayerID)
                    }
            }
            stepTwo(lose,superLose, lives, minPeople);
            
        }
            , 3000);
        

    }, [])







    const stepTwo = (lose, superLose, lives, minPeople) => {
        setTimeout(() => {
            setWinner(minPeople)
            if (!minPeople.includes(id) || lose) {
                lives = lives - 1;
                console.log(!minPeople.includes(id))
                console.log(lose)
                if (superLose) {
                    lives = lives - 1;
                }
                
            }
            fetch(variables.API_URL + '/ChangeLives', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    Id: id, PlayerName: 'string', InGame: 'yes', Score: 0, Lives: lives, Icon: 'pic', room: room,
                })

            })

            if (lives == -1) {

                fetch(variables.API_URL, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        Id: id, PlayerName: 'string', InGame: 'yes', Score: 0, Lives: lives, Icon: 'pic', room: room,
                    })

                })
                connection.invoke("ToRules", (room));

            };
            stepThree();

        }, 2000);
    }


    const stepThree = () => {
        setTimeout(() => {
            fetch(variables.API_URL)
                .then(response => response.json())
                .then(data => {
                    setPlayers(data.filter(player => player.Room == room));
                })


            stepFour();

        }, 2000);
    }

    const stepFour = () => {
        setTimeout(() => {

            setResultsModal('');
        }, 5000)
        
    }



    return (
        <div className='ResultsModal  fixed top-1/2 left-1/2 z-10 bg-center bg-cover border-solid border-red-700 rounded-3xl border-8 flex text-center items-center justify-evenly flex-col overflow-y-scroll ' style={{ backgroundImage: `url(${playerBack})` }} >


            <div className=' flex flex-row '>

                {players.map(player =>
                    <li className='list-none' key={player.PlayerID}>
                        <div className={`pl-2 pr-2 h-5/6 flex flex-col items-center text-2xl text-left text-black  justify-evenly   ${winner && winner.includes(player.PlayerID) ? "border-red-600 border-solid border-4" : ""}`}>
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
            <div className='pt-4 pb-4 pl-16 pr-16 flex flex-row border-red-600 border-solid border-4'>

                {players.map(player => 
                    <li className='list-none' key={player.PlayerID}>
                        <div className={`pr-2 pl-2 flex flex-row  text-2xl text-left text-black  justify-evenly `}>
                            <div className='border-black border-double border-4 w-32 h-24 flex flex-col justify-center items-center  text-black bg-white '>
                                <div className='flex flex-col font-semibold text-7xl  text-black bg-white '>{player.Score}</div>
                            </div>
                        </div>


                    </li>


                )}

            </div>
            <div className='border-black border-double border-4 w-40 h-28 flex flex-col justify-center items-center  text-black bg-white '>
                <div className='flex flex-col font-semibold text-7xl  text-black bg-white '>{final}</div>
            </div>

        </div>
    )
}

export default Results;