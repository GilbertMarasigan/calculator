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


function operate() {

    let num1 = [];
    let num2 = [];
    let operator = null;
    let result = null;

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

}

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {

    button.addEventListener("click", function (e) {

        console.log(`${this.className} clicked!`);

        // number
        if (this.className == "number" || this.className == "number zero") {
            arrCurrentOperand.push(this.textContent);
            currentNumberOperand = arrCurrentOperand.join('');
            // currentOperand.textContent = currentNumberOperand;
        }

        // operator
        else if (this.className == "operator") {
            if (operatorCount < 1) {
                arrCurrentOperand.push(this.textContent);
                currentNumberOperand = arrCurrentOperand.join('');
                // currentOperand.textContent = currentNumberOperand;
                operatorCount++;
            }
            else {
                alert("Can only perform one operation at a time");
            }
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
            operatorCount = 0;
        }

        // dot
        else if (this.className == "dot") {
            console.log(arrCurrentOperand);
            if (!arrCurrentOperand.includes(".")) {
                arrCurrentOperand.push(this.textContent);
                currentNumberOperand = arrCurrentOperand.join('');
            }
            else {
                alert('only one dot allowed');
            }
        }

        else {

        }

        currentOperand.textContent = currentNumberOperand;

    });
})