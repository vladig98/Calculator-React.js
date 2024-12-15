import { useState } from "react";
import { Key } from "./Key.js";

export default function Calculator() {

    const [equation, setEquation] = useState("");

    let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let signs = ['+', '-', '*', '/', '=', '◄', 'C', '.'];
    let operationSigns = ['+', '-', '*', '/'];

    // Handles special keys
    const handleOnKeyDown = (event) => {
        handleDeleteKeys(event)
        handleEnterKey(event)
    }

    const handleDeleteKeys = (event) => {
        let key = event.keyCode || event.charCode

        // 8 - backspace
        // 46 - delete key
        if (key !== 8 && key !== 46) {
            return
        }

        // Delete the last symbol in the equation
        deleteLastSymbol()
    }

    const deleteLastSymbol = () => {
        setEquation(equation.substring(0, equation.length - 1))
    }

    const handleEnterKey = (event) => {
        let key = event.keyCode || event.charCode

        // 13 - Enter
        if (key !== 13) {
            return
        }

        // Don't proceed if we don't have at least one sign in the equation
        if (!operationSigns.some(s => equation.includes(s))) {
            return
        }

        // Don't calculate if the equation ends with a sign
        if (signs.includes(equation[equation.length - 1])) {
            return
        }

        // Evaluate the equation
        setEquation(eval(equation).toString())
    }

    //using a second function to handle keyboard input. Event target value is null if you pass it in a function
    const handleInputChange = (event) => {
        // Backspace can mess up the input so we're disabling it here
        if (event.target.value.length < equation.length && event.nativeEvent.inputType === 'deleteContentBackward') {
            return;
        }

        // Get only the last inserted symbol
        let value = event.target.value;
        value = value[value.length - 1]

        handleInput(value)
    }

    const handleInput = (value) => {
        if (value === '◄') {
            deleteLastSymbol()
            return
        }

        if (value === 'C') {
            setEquation('')
            return
        }

        // Allow only numbers and signs
        if (!digits.includes(value + '') && !signs.includes(value + '')) {
            return;
        }

        // Prevent numbers that start with 0
        // If we have a 0 but we enter an operator, we will allow it
        if (equation.length == 1 && equation === '0' && digits.includes(value.toString())) {
            return;
        }

        // Prevent multiple signs chaining
        if (equation.length > 0) {
            if (signs.includes(equation[equation.length - 1]) && signs.includes(value)) {
                return;
            }
        }

        // Prevent starting with a sign
        if (equation.length == 0 && signs.includes(value)) {
            return;
        }

        // Prevent multiple decimal points
        for (let i = equation.length - 1; i >= 0; i--) {
            if (equation[i] == '.' && value == '.') {
                return
            }
            else {
                setEquation(equation + '.')
                return
            }
        }

        // Prevent numbers starting with a 0 after a sign is entered
        // Ensure that the second last element is a sign different than a decimal point (.)
        // Ensure that the last symbol is a 0
        // Ensure that the new symbol you get is a sign
        if (equation.length > 1) {
            if (signs.includes(equation[equation.length - 2]) && equation[equation.length - 2] != '.' && equation[equation.length - 1] == '0' && !signs.includes(value)) {
                return;
            }
        }

        // Handles evaluating
        // Evaluate if we have at least one operator sign and we end with a digit
        if (value == '=' && operationSigns.some(el => equation.includes(el)) && !operationSigns.includes(equation[equation.length - 1])) {
            setEquation(eval(equation).toString())
        }

        // Append the new symbol to the equation
        setEquation(equation + '' + value)
    }

    function updateInput({ value }) {
        handleInput(value)
    }

    return (
        <>
            <div className="container">
                <div className="calculator">
                    <input
                        type="text"
                        value={equation}
                        onChange={handleInputChange}
                        onKeyDown={handleOnKeyDown}
                        className="inputBox"
                    />
                    <div className="grid-container">
                        <Key value={'C'} enterDigit={updateInput} color={'gray'}></Key>
                        {/* Alt + 17 on Windows to produce ◄ */}
                        <Key value={'◄'} enterDigit={updateInput} color={'gray'}></Key>
                        <Key value={'/'} enterDigit={updateInput} color={'gray'}></Key>
                        <Key value={'*'} enterDigit={updateInput} color={'orange'}></Key>
                        <Key value={7} enterDigit={updateInput} color={'black'}></Key>
                        <Key value={8} enterDigit={updateInput} color={'black'}></Key>
                        <Key value={9} enterDigit={updateInput} color={'black'}></Key>
                        <Key value={'-'} enterDigit={updateInput} color={'orange'}></Key>
                        <Key value={4} enterDigit={updateInput} color={'black'}></Key>
                        <Key value={5} enterDigit={updateInput} color={'black'}></Key>
                        <Key value={6} enterDigit={updateInput} color={'black'}></Key>
                        <Key value={'+'} enterDigit={updateInput} rowSpan={true} color={'orange'}></Key>
                        <Key value={1} enterDigit={updateInput} color={'black'}></Key>
                        <Key value={2} enterDigit={updateInput} color={'black'}></Key>
                        <Key value={3} enterDigit={updateInput} color={'black'}></Key>
                        <Key value={0} enterDigit={updateInput} color={'black'}></Key>
                        <Key value={'.'} enterDigit={updateInput} color={'black'}></Key>
                        <Key value={'='} enterDigit={updateInput} colSpan={true} color={'orange'}></Key>
                    </div>
                </div>
            </div>
        </>
    );
}