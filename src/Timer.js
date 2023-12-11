import React, { useState, useEffect } from 'react';
import './Timer.css'

const Timer = () => {
    const [inputMinutes, setInputMinutes] = useState();
    const [totalSeconds, setTotalSeconds] = useState(inputMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setTotalSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        if (totalSeconds === 0) {

            setIsRunning(false);
        }
    }, [totalSeconds]);

    const startTimer = () => {
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setTotalSeconds(0);
        setIsRunning(false);
        setInputMinutes(String("minutes"));
    };

    const handleInputChange = (event) => {
        const minutes = parseInt(event.target.value, 10);
        setInputMinutes(minutes);
        setTotalSeconds(minutes * 60);
    };

    const hours = Math.floor(totalSeconds / 3600);
    const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    return (
        <div className="timer-container">

            <h1 className="title">Countdown Timer</h1>
            <p className="time">
                Time {hours > 0 ? hours : String("00")}:{remainingMinutes > 0 ? remainingMinutes : String("00")}:{remainingSeconds > 0 ? remainingSeconds : String("00")}
            </p>
            <div className='input-field'>
            <label className='timer-lable'>
                Enter minutes:
                <input  type="number" value={inputMinutes} onChange={handleInputChange} />
            </label>
            </div>
            <div className="timer-buttons">
                <button onClick={startTimer}>Start</button>
                <button onClick={stopTimer}>Stop</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;

