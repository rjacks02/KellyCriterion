import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const Game = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

    const percentage = location.state.p
    const total = location.state.n

    const [count, setCount] = useState(1);
    const [capital, setCapital] = useState(100);
    const [wagerP, setWagerP] = useState(0);
    const [wagerM, setWagerM] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    function handleWagerChange(event) {
        const newP = event.target.value
        setWagerP(newP);
        let money = parseFloat(capital) * parseFloat(newP) / 100;
        money = parseFloat(money.toFixed(2));
        if (isNaN(money)){
            money = 0;
        }
        setWagerM(money);
    }

    function runFlip(){
        if (wagerP < 0 || wagerP > 100){
            setError('Your wager must be between 0 and 100 inclusive. Fix above before continuing.')
        }
        else{
            const flip = Math.random();
            let newCap = 0;

            if (parseFloat(flip) < percentage){
                setMessage('The Last Flip Was Heads! You Have Gained $' + wagerM + "!");
                newCap = parseFloat(capital) + parseFloat(wagerM)
                setCapital(newCap.toFixed(2));
            }
            else{
                setMessage('The Last Flip Was Tails! You Have Lost $' + wagerM + "!");
                newCap = parseFloat(capital - wagerM)
                setCapital(newCap.toFixed(2));
            }

            let money = parseFloat(newCap) * parseFloat(wagerP) / 100;
            money = parseFloat(money.toFixed(2));
            if (isNaN(money)){
                money = 0;
            }
            setWagerM(money);

            setCount(count+1);
            if (newCap <= 0){
                navigate('/End', {state: {cap: 0, num: count}});
            }
            else if (newCap >= 1000){
                navigate('/End', {state: {cap: newCap, num: count}});
            }
            else if (count >= total){
                navigate('/End', {state: {cap: newCap, num: count}});
            }
        }
    }

    return(
    <div>
        <h1 class='Header'>Game {count}</h1>
        <p class = 'Label'>You Have Up To {total-count+1} Coin Flips Remaining!</p>
        <p class = 'Container'> <span class = 'Capital'>Current Capital = ${capital} </span></p>
        <div class = 'Label'>
            <label >Wager:    </label>
            <input onChange={handleWagerChange} onKeyDown = {blockInvalidChar} type="number" defaultValue="0" step = "1" min = "0" max = "100"/>
            <label >%</label>
            <p>You Will Be Wagering ${wagerM.toFixed(2)}</p>
        </div>
        <div class='Container'>
            <button class='Button' onClick={runFlip}><span>Flip The Coin!</span></button>
        </div>
        <p class = 'Error'><mark>{error}</mark></p>
        <p class = 'Label'>{message}</p>
    </div>
    );
  };
  
export default Game;