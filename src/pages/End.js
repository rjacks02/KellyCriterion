import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const End = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const capital = location.state.cap
    const count = location.state.num

    function playAgain(){
        navigate('/Intro');
    }
    return(
    <div>
        <h1 class = 'Header'>End of Game</h1>
        <p class = 'Label'>Your Final Capital After {count} Flips:</p>
        <div class = 'Container'>
            < p class = 'Capital'>${capital.toFixed(2)}</p>
        </div>
        <div class = 'Container'>
            <button class = 'Button' onClick = {playAgain}><span>Play Again?</span></button>
        </div>
    </div>
    );
  };
  
export default End;