console.log('calc.js');

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener("click", function(e){
        console.log(`${this.className} clicked!`);
    });
})