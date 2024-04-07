import { useState } from "react";

function Key({ value, enterDigit, rowSpan, colSpan, color }) {
    let c = 'digit';
    c = rowSpan ? c + ' rowSpan' : c;
    c = colSpan ? c + ' colSpan' : c;
    c = color ? c + ' ' + color : c;
    return <button className={c} onClick={() => enterDigit({ value })}>{value}</button>
}

export default function Calculator() {

    const [equation, setEquation] = useState("");

    let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let signs = ['+', '-', '*', '/', '=', '◄', 'C', '.'];

    //handle backspace and delete keys to actually delete stuff in the input
    const handleOnKeyDown = (event) => {
        let key = event.keyCode || event.charCode

        if (key == 8 || key == 46) {
            setEquation(equation.substring(0, equation.length - 1))
        }

        if (key == 13) {
            if (signs.some(el => equation.includes(el))) {
                if (!signs.includes(equation[equation.length - 1])) {
                    setEquation(eval(equation).toString())
                }
            }
        }
    }

    //using a second function to handle keyboard input. Event target value is null if you pass it in a function
    const handleInputChnage = (event) => {

        //disable backspace to replace characters
        if (event.target.value.length < equation.length && event.nativeEvent.inputType === 'deleteContentBackward') {
            return;
        }

        //get just the newest value from the input rather than the whole value we already have
        let value = event.target.value;
        value = value[value.length - 1]

        if (value == '◄') {
            setEquation(equation.substring(0, equation.length - 1))
            return
        }

        if (value == 'C') {
            setEquation('')
            return
        }

        //allow only numbers and signs
        if (!digits.includes(value + '') && !signs.includes(value + '')) {
            return;
        }

        //prevent numbers that start with 0
        if (equation.length == 1) {
            if (equation == '0') {
                if (digits.includes(value.toString())) {
                    return;
                }
            }
        }

        //prevent multiple signs chaining
        if (equation.length > 0) {
            if (signs.includes(equation[equation.length - 1]) && signs.includes(value)) {
                return;
            }
        }

        //prevent starting with a sign
        if (equation.length == 0) {
            if (signs.includes(value)) {
                return;
            }
        }

        //prevent multiple decimal points
        for (let i = equation.length - 1; i >= 0; i--) {
            if (signs.includes(equation[i])) {
                if (equation[i] == '.') {
                    if (value == '.') {
                        return
                    }
                }
                else {
                    if (value == '.') {
                        setEquation(equation + '.')
                        return
                    }
                }
            }
        }

        //prevent numbers starting with a 0 after a sign is entered
        if (equation.length > 1) {
            if (signs.includes(equation[equation.length - 2]) && equation[equation.length - 2] != '.') {
                if (equation[equation.length - 1] == '0') {
                    if (!signs.includes(value)) {
                        return;
                    }
                }
            }
        }

        //handles evaluating
        if (value == '=') {
            if (signs.some(el => equation.includes(el))) {
                if (!signs.includes(equation[equation.length - 1])) {
                    setEquation(eval(equation).toString())
                }
            }
            return
        }

        setEquation(equation + '' + value)
    }

    function updateInput({ value }) {

        if (value == '◄') {
            setEquation(equation.substring(0, equation.length - 1))
            return
        }

        if (value == 'C') {
            setEquation('')
            return
        }

        //allow only numbers and signs
        if (!digits.includes(value + '') && !signs.includes(value + '')) {
            return;
        }

        //prevent numbers that start with 0
        if (equation.length == 1) {
            if (equation == '0') {
                if (digits.includes(value.toString())) {
                    return;
                }
            }
        }

        //prevent multiple signs chaining
        if (equation.length > 0) {
            if (signs.includes(equation[equation.length - 1]) && signs.includes(value)) {
                return;
            }
        }

        //prevent starting with a sign
        if (equation.length == 0) {
            if (signs.includes(value)) {
                return;
            }
        }

        //prevent multiple decimal points
        for (let i = equation.length - 1; i >= 0; i--) {
            if (signs.includes(equation[i])) {
                if (equation[i] == '.') {
                    if (value == '.') {
                        return
                    }
                }
                else {
                    if (value == '.') {
                        setEquation(equation + '.')
                        return
                    }
                }
            }
        }

        //prevent numbers starting with a 0 after a sign is entered
        if (equation.length > 1) {
            if (signs.includes(equation[equation.length - 2]) && equation[equation.length - 2] != '.') {
                if (equation[equation.length - 1] == '0') {
                    if (!signs.includes(value)) {
                        return;
                    }
                }
            }
        }

        //handles evaluating
        if (value == '=') {
            if (signs.some(el => equation.includes(el))) {
                if (!signs.includes(equation[equation.length - 1])) {
                    setEquation(eval(equation).toString())
                }
            }
            return
        }

        setEquation(equation + '' + value)
    }

    return (
        <>
            <div className="container">
                <div className="calculator">
                    <input
                        type="text"
                        value={equation}
                        onChange={handleInputChnage}
                        onKeyDown={handleOnKeyDown}
                        className="inputBox"
                    />
                    <div className="grid-container">
                        <Key value={'C'} enterDigit={updateInput} color={'gray'}></Key>
                        <Key value={'◄'} enterDigit={updateInput} color={'gray'}></Key> {/* Windows = Alt + 17 */}
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