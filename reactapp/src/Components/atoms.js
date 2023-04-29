import { atom } from 'recoil'; 
import { v4 as uuidv4 } from 'uuid';
import anonymous from "./Pictures/anonymous.png";

export const playerState = atom({
    key: 'playerState',
    default: [{
        PlayerID: "none",
        PlayerName: "any",
        Lives: 0,
        Score: 0,
        InGame: "no",
        Icon: "default",
        Room: "none"
    }],
});


export const roomState = atom({
    key: 'roomState',
    default: '',
});


export const anonymousState = atom({
    key: 'anonymousState',
    default:anonymous
})

export const picState = atom({
    key: 'picState',
    default: 'default'
})

export const playerNameState = atom({
    key: 'playerNameState',
    default: ''
})

export const scoreState = atom({
    key: 'scoreState',
    default: ''
})


export const clickState = atom({
    key: 'clickState',
    default: true
})

export const ruleState = atom({
    key: 'ruleState',
    default:false
})



