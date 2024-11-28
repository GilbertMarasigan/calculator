console.log('calc.js');

const currentOperand = document.querySelector('.current-operand');
const previousOperand = document.querySelector('.previous-operand');

let arrCurrentOperand = [];
let currentNumberOperand = 0;

// initialize calculator
function initCalc() {
    currentOperand.textContent = "0";
    previousOperand.textContent = "";
    currentNumberOperand = 0;
    arrCurrentOperand = [];
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
           
            arrCurrentOperand.pop();
            currentNumberOperand = arrCurrentOperand.join('');

            if(arrCurrentOperand.length == 0){
                currentNumberOperand = 0;
                arrCurrentOperand = [];
                initCalc();
                return;
            }

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