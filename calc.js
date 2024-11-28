console.log('calc.js');

const currentOperand = document.querySelector('.current-operand');
const previousOperand = document.querySelector('.previous-operand');

let arrCurrentOperand = [];
let currentNumberOperand = 0;
let operatorCount = 0;

// initialize calculator
function initCalc() {
    currentOperand.textContent = "0";
    previousOperand.textContent = "";
    currentNumberOperand = 0;
    arrCurrentOperand = [];
    operatorCount = 0;
}

initCalc();

function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function roundToNearest(number, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function hasOperator(arr) {
    return arr.some(item => ["+", "-", "×", "÷"].includes(item));
}

function isOperator(str) {
    return ["+", "-", "×", "÷"].includes(str);
}

function operate() {

    let num1 = [];
    let num2 = [];
    let operator = null;
    let result = null;

    console.log(!hasOperator(arrCurrentOperand));
    if (!hasOperator(arrCurrentOperand)) {
        return true;
    }

    arrCurrentOperand.forEach((item) => {

        if (["+", "-", "×", "÷"].includes(item)) {
            operator = item;
        } else {
            if (operator) {
                num2.push(item);
            } else {
                num1.push(item);
            }
        }

    });

    num1 = Number(num1.join(''));
    num2 = Number(num2.join(''));

    console.log({
        "num1": num1,
        "num2": num2,
        "operator": operator
    });


    if (num2 == 0 && operator == "÷") {
        alert('lol!');
        initCalc();
        return
    }

    // perform operation
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "÷":
            result = num1 / num2;
            break;
        case "×":
            result = num1 * num2;
            break;
        default:
            break;
    }

    result = roundToNearest(result, 2);

    console.log({ result });

    // display on previous operation
    previousOperand.textContent = `${num1} ${operator} ${num2}`;
    currentNumberOperand = result;
    currentOperand.textContent = `${result}`;
    arrCurrentOperand = result.toString().split('');
    console.log(arrCurrentOperand);
    operatorCount = 0;

}

const buttons = document.querySelectorAll('button');

/*
document.onkeypress = function (e) {
    e = e || window.event;
    console.log(e.key);

    if (isNumber(e.key)) {
        addNumber(e.key);
    }
    else if (isOperator(e.key)) {
        addOperator(e.key);
    }
    else if (e.key == ".") {
        addDot();
    }
    else if(e.key == "Enter" || e.key == "="){
        operate(arrCurrentOperand);
    }

    // update display
    currentOperand.textContent = currentNumberOperand;

};
*/

function addNumber(number) {
    arrCurrentOperand.push(number);
    currentNumberOperand = arrCurrentOperand.join('');
}

function addOperator(operator) {
    if (operatorCount < 1) {
        arrCurrentOperand.push(operator);
        currentNumberOperand = arrCurrentOperand.join('');
        operatorCount++;
    }
    else {
        alert("Can only perform one operation at a time");
    }
}

function addDot() {
    console.log(arrCurrentOperand);
    if (!arrCurrentOperand.includes(".")) {
        arrCurrentOperand.push(".");
        currentNumberOperand = arrCurrentOperand.join('');
    }
    else {
        alert('only one dot allowed');
    }
}


buttons.forEach(button => {

    button.addEventListener("click", function (e) {

        console.log(`${this.className} clicked!`);

        // number
        if (this.className == "number" || this.className == "number zero") {
            addNumber(this.textContent);
        }

        // operator
        else if (this.className == "operator") {
            addOperator(this.textContent);
        }

        // delete
        else if (this.className == "delete") {

            const lastElement = arrCurrentOperand.pop();

            if (!isNumber(lastElement)) operatorCount = 0;
            currentNumberOperand = arrCurrentOperand.join('');

            if (arrCurrentOperand.length == 0) {
                currentNumberOperand = 0;
                arrCurrentOperand = [];
                initCalc();
                return;
            }

        }

        // clear
        else if (this.className == "clear") {
            initCalc();
        }


        // equals
        else if (this.className == "equals") {
            operate(arrCurrentOperand);
        }

        // dot
        else if (this.className == "dot") {
            addDot();
        }

        else {

        }

        // update display 
        currentOperand.textContent = currentNumberOperand;

    });
})