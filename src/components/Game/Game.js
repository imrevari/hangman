import React, { useState, useMemo, useEffect } from "react";
import './Game.css'
import WordToGuess from '../WordToGuess/WordToGuess'
import Letters from "../Letters/Letters";

const Game = ({wordToGuess, restartGame}) => {

    const GAME_TITLE = "The Hangman"
    const USED_LETTERS = "USED_LETTERS"
    const END_GAME = 'END GAME'
    const START_GAME = 'START NEW GAME'

    const SVG_PIC = [
        <path d="M1,11 h8" />,
        <path d="M9,11 v-10" />,
        <path d="M9,1 h-4" />,
        <path d="M5,1 v2" />,
        <circle cx="5" cy="4" r="1" />,
        <path d="M5,5 v3" />,
        <path d="M5,5 l-2,2" />,
        <path d="M5,5 l2,2" />,
        <path d="M5,8 l-2,2" />,
        <path d="M5,8 l2,2" />,
    ]

    const [usedLetters, setUsedLetters] = useState(window.localStorage.getItem(USED_LETTERS).split(','))

    const selectLetter = (letter) => {
        window.localStorage.setItem(USED_LETTERS, [...usedLetters, letter])
        setUsedLetters(prevState => [...prevState, letter])
    }

    const unguessedLetters = useMemo(() => {
        const unguessedLetters = [...usedLetters]
        const toReturn = unguessedLetters.filter((letter) => !(wordToGuess.toUpperCase().includes(letter)))
        console.log(toReturn)
        return toReturn
    }, [wordToGuess, usedLetters])

    const youWon = useMemo(() => {
        var wordToGuessArray = wordToGuess.toUpperCase().split('');
        const usedLettersCopy = [...usedLetters]
        const remainingLettersToGuess = wordToGuessArray.filter((letter) => !usedLettersCopy.includes(letter))
        return remainingLettersToGuess.length == 0
    }, 
    [wordToGuess, usedLetters])

    const youLost = useMemo(() => {
        return  unguessedLetters.length >= 10 
    }, 
    [unguessedLetters])

    const startNewGame = () =>{
        window.localStorage.setItem(USED_LETTERS, [])
        setUsedLetters([])
        restartGame()
    }

    const endGame = () =>{
        console.log('did not see if this button was determined')
    }


    return(<>
        <div className="parentdiv">
            <div className="leftdiv">
                <div>
                    <svg viewBox="0 0 10 12">
                        {SVG_PIC.map((e, index) => {if(index < unguessedLetters.length) return e })}
                    </svg>
                </div>
            </div>
            <div className="rightdiv">
                <h1>{GAME_TITLE}</h1>
                {youLost ? <h3>You lost</h3> : 
                    youWon ? <h3>You won</h3> :
                        <h3>{`It is a ${wordToGuess.length} letter word`}</h3>}
                {/* <WordToGuess /> */}
                <h2>{wordToGuess}</h2>
                <Letters selected={usedLetters} onSelect={selectLetter}/>
                <div>
                    <button className="button" onClick={() => endGame()}>{END_GAME}</button>
                    <button className="button" onClick={() => startNewGame() }>{START_GAME}</button>
                </div>
            </div>
        </div>



        
    </>)
}

export default Game;