import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, Link, useNavigate } from "react-router-dom";
import styles from './../styles.css';

const Intro = () => {
    const [percentage, setPercentage] = useState(60);
    const [total, setTotal] = useState(100);
    const [pError, setpError] = useState('');
    const [nError, setnError] = useState('');
    const navigate = useNavigate();
    const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
    
    function handlePercentageChange(event) {
        setPercentage(event.target.value)
    }

    function handleTotalChange(event) {
        setTotal(event.target.value)
    }

    const toGame = () => {
        const tempP = parseInt(percentage);
        const tempN = parseInt(total);
        if (tempP < 0 || tempP > 100){
            setpError('The percentage (p) must be between 0 and 100 inclusive. Fix This Issue Above Before Beginning.');
            setnError('');
            if (tempN <= 0){
                setnError('The number of tosses (N) must be greater than 0. Fix This Issue Above Before Beginning.');
            }
        }
        else if (tempN <= 0){
            setpError('');
            setnError('The number of tosses (N) must be greater than 0. Fix This Issue Above Before Beginning.');
        }
        else{
            setpError('');
            setnError('');
            const percent = parseFloat(percentage) / 100;
            console.log(percent);
            navigate('/Game', {state: {p: percent, n: total}});
        }
    }

    return(
    <div>
        <div class ='Intro'>
            <h1 class = 'Header'>Description:</h1>
            <p>Imagine you have a starting capital of C=$100, and you are allowed to bet a percentage of your capital on a coin toss that has a p=60% chance to come up heads. 
                <br />If you bet $1 and you win, you’ll your new capital will be $101, if you lose you’ll have $99 now.

                <br /><br />Let’s also assume that you get to repeat the game until a total of N=100 coin tosses have been played. You may change the percentage you wish to bet each time.

                <br /><br />Let’s also assume that your capital can grow to a maximum of M=$1000.

                <br />If you reach the maximum at any time during the 100 coin tosses, the game stops and you can take pride in having made the maximum. 
                <br /> <br />If you reach $0 at any time of the game, the game also stops.

                <br /><br />So what percentage are you going to bet each time? Play the game, and see how much money you’ll have after 100 games.
                <br /><br />
            </p>
        </div>

        <div  class='Label'>
            <br />
            <p>If you would like to change the coin's probability or number of game repititions, do so below:</p>
            <label>Percentage To Come Up Heads = p:    </label>
            <input value={percentage} onChange={handlePercentageChange} onKeyDown = {blockInvalidChar} type="number" defaultValue= '60' step = "1" min = "0" max = "100"/>
            <label>%</label>

            <br />
            <label>Total Coin Tosses = N:    </label>
            <input value={total} onChange={handleTotalChange} onKeyDown = {blockInvalidChar} type="number" defaultValue="100" step = "1" min = "0"/> 
        </div>

        <br /> 
        <div class ='Container'>
            <button class='Button' onClick = {toGame}><span>Begin Game</span></button>
        </div>
        <p class = 'Error'><mark>{pError}</mark></p>
        <p class = 'Error'><mark>{nError}</mark></p>
    </div>
    );
  };
  
export default Intro;