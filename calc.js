console.log('calc.js');

const currentOperand = document.querySelector('.current-operand');
const previousOperand = document.querySelector('.previous-operand');

let arrCurrentOperand = [];
let currentNumberOperand = 0;

// initialize calculator
function initCalc() {
    currentOperand.textContent = "";
    previousOperand.textContent = "";
    currentNumberOperand = 0;
}

initCalc();

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener("click", function (e) {

        console.log(`${this.className} clicked!`);

        // number
        if (this.className == "number") {
            arrCurrentOperand.push(this.textContent);
            currentNumberOperand = arrCurrentOperand.join('');
        }

        // operator

        // delete
        if (this.className == "delete") {
            if(arrCurrentOperand.length == 1){
                currentNumberOperand = 0;
                return;
            }

            arrCurrentOperand.pop();
            currentNumberOperand = arrCurrentOperand.join('');
        }

        // clear
        if (this.className == "clear") {
            initCalc();
        }

        // number zero

        // equals

        
        // display event
        currentOperand.textContent = currentNumberOperand;

    });
})