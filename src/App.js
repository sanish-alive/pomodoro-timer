import './App.css';
import { useState } from 'react';
import ToDo from './ToDo';

let timer;
let isPaused = false;

function startPomodoro(takeTime) {
    let timerDiv = document.getElementById('timer');
    let timeInput = document.getElementById('time');
    let startButton = document.getElementById('startBtn');
    let stopButton = document.getElementById('stopBtn');
    let pauseButton = document.getElementById('pauseBtn')

    timeInput.style.display = "none";
    timerDiv.style.display = "block";

    startButton.style.display = "none";
    stopButton.style.display = "initial";
    pauseButton.style.display = "initial";

    let minutes = parseInt(takeTime, 10) - 1;
    let seconds = 60;

    clearInterval(timer);

    if(isNaN(minutes) || minutes < 0) {
        alert("Enter valid input.");
        stopPomodoro();
    }

    timer = setInterval(function() {
        if(isPaused) return;
        if(seconds === 0) {
            seconds = 60
            if(minutes === 0) {
                clearInterval(timer);
                isPaused = false;
                playSound();
                timeInput.style.display = "block";
                timerDiv.style.display = "none";
                startButton.style.display = "block";
                stopButton.style.display = "none";
                pauseButton.style.display = "none";
                return;
            }
            minutes--;
        } 
        seconds--;

        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        document.title = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0')
    }, 1000)
}

function stopPomodoro(){
    clearInterval(timer);

    let timeInput = document.getElementById('time');
    let timerDiv = document.getElementById('timer');
    timeInput.style.display = "block";
    timerDiv.style.display = "none";
    document.getElementById('startBtn').style.display = "initial";
    document.getElementById('stopBtn').style.display = "none";
    document.getElementById('pauseBtn').style.display = "none";
    document.title = "Timer Stopped";
}

function pausePomodoro() {
    isPaused = !isPaused;

    if(isPaused) {
        document.title = "Timer Paused";
        document.getElementById('pauseBtn').innerHTML = '<i class="fas fa-play"></i>';
    } else {
        document.getElementById('pauseBtn').innerHTML = '<i class="fas fa-pause"></i>';
        document.title = "paused";
    }
}

function playSound() {
    var sound = new Audio('inclouds.mp3');
    sound.play();
}

function App() {
    const [minutes, setMinutes] = useState("25");

    return (
    <div className='main-container'>
        <div className="pomodoro-container">
            <input type="text" id="time" value={minutes} onChange={(e) => setMinutes(e.target.value)}/><br/>
            <div id="timer" style={{display: "none"}}>
                <span id="minutes">--</span><span>:</span><span id="seconds">--</span>
            </div>
            <div className="pomodoro-button">
                <button onClick={() => startPomodoro(minutes)} id="startBtn">Start</button>
                <button onClick={stopPomodoro} id="stopBtn" style={{display: "none"}}><i className="fas fa-stop"></i></button>
                <button onClick={pausePomodoro} id="pauseBtn" style={{display: "none"}}><i className="fas fa-pause"></i></button>
            </div>
        </div>
        <ToDo />
        <div className='github' onClick={() => {
            window.open("https://github.com/mostanglan/pomodoro-timer", "_blank")
        }}
        alt="about me">
            <i class="fab fa-github"></i>
        </div>
    </div>
    
    );
}

export default App;
