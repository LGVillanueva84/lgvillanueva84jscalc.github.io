//Lester G. Villannueva Assignment 1 CMSC 207 Web Programmming and Development
//This is the javascript code for the Web Calculator App

//Defining the values for the number keys. When the user clicks the number button on the app, it is added on the input string

function myFunction1() {
  document.getElementById("myText").value+="1";
}
function myFunction2() {
  document.getElementById("myText").value+="2";
}
function myFunction3() {
  document.getElementById("myText").value+="3";
}
function myFunction4() {
  document.getElementById("myText").value+="4";
}
function myFunction5() {
  document.getElementById("myText").value+="5";
}
function myFunction6() {
  document.getElementById("myText").value+="6";
}
function myFunction7() {
  document.getElementById("myText").value+="7";
}
function myFunction8() {
  document.getElementById("myText").value+="8";
}
function myFunction9() {
  document.getElementById("myText").value+="9";
}
function myFunction0() {
  document.getElementById("myText").value+="0";
}
function myFunctiondecimal() {
  document.getElementById("myText").value+=".";
}

//Defining the values for the operator keys. When the user clicks the operator button on the app, it is added on the input string

function myFunctionplus() {
  document.getElementById("myText").value+="+";
}
function myFunctionminus() {
  document.getElementById("myText").value+="-";
}
function myFunctiontimes() {
  document.getElementById("myText").value+="*";
}
function myFunctiondivide() {
  document.getElementById("myText").value+="/";
}
function myOpenParentheses() {
  document.getElementById("myText").value+="(";
}
function myCloseParentheses() {
  document.getElementById("myText").value+=")";
}
function myFunctionExponent() {
  document.getElementById("myText").value+="^";
}
function myFunctionPercent() {
  document.getElementById("myText").value+="%";
}

//Function to clear the input and result textboxes

function myFunctionAllClear() {
  document.getElementById("myText").value ='';
  document.getElementById("myResult").value ='';
}

//Function to delete the last character in the input string

function myFunctionDelete() {
  document.getElementById("myText").value = document.getElementById("myText").value.substring(0, document.getElementById("myText").value.length-1);
}

//function to convert the expression into a Reverse Polish Notation(RPN) also known as the Shunting Yard Algorithm
//in the RPN the operators follows the operands
//refactored code from https://www.thepolyglotdeveloper.com/2015/03/parse-with-the-shunting-yard-algorithm-using-javascript/

String.prototype.isNumeric = function() {
    return !isNaN(parseFloat(this)) && isFinite(this);
}
Array.prototype.clean = function() {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === "") {
            this.splice(i, 1);
        }
    }
    return this;
}
function GenerateRPN() {
    this.infixToPostfix = function(infix) {
        var outputQueue = "";
        var operatorStack = [];
        var operators = {
            "^": {
                precedence: 4,
                associativity: "Right"
            },
			"%": {
                precedence: 4,
                associativity: "Right"
            },
            "/": {
                precedence: 3,
                associativity: "Left"
            },
            "*": {
                precedence: 3,
                associativity: "Left"
            },
            "+": {
                precedence: 2,
                associativity: "Left"
            },
            "-": {
                precedence: 2,
                associativity: "Left"
            }
        }
        infix = infix.replace(/\s+/g, "");
        infix = infix.split(/([\+\-\*\/\^\%\(\)])/).clean();
        for(var i = 0; i < infix.length; i++) {
            var token = infix[i];
            if(token.isNumeric()) {
                outputQueue += token + " ";
            } else if("^*/+-%".indexOf(token) !== -1) {
                var o1 = token;
                var o2 = operatorStack[operatorStack.length - 1];
                while("^*/+-%".indexOf(o2) !== -1 && ((operators[o1].associativity === "Left" && operators[o1].precedence <= operators[o2].precedence) || (operators[o1].associativity === "Right" && operators[o1].precedence < operators[o2].precedence))) {
                    outputQueue += operatorStack.pop() + " ";
                    o2 = operatorStack[operatorStack.length - 1];
                }
                operatorStack.push(o1);
            } else if(token === "(") {
                operatorStack.push(token);
            } else if(token === ")") {
                while(operatorStack[operatorStack.length - 1] !== "(") {
                    outputQueue += operatorStack.pop() + " ";
                }
                operatorStack.pop();
            }
        }
        while(operatorStack.length > 0) {
            outputQueue += operatorStack.pop() + " ";
        }
        return outputQueue;
    }
}

//function to evaluate the expression in Reverse Polish Notation
//refactored code from https://www.thepolyglotdeveloper.com/2015/04/evaluate-a-reverse-polish-notation-equation-with-javascript/

function MathSolver() {

    this.solvePostfix = function(postfix) {
        var resultStack = [];
        postfix = postfix.split(" ");
        for(var i = 0; i < postfix.length; i++) {
            if(postfix[i].isNumeric()) {
                resultStack.push(postfix[i]);
            } else {
                var a = resultStack.pop();
                var b = resultStack.pop();
                if(postfix[i] === "+") {
                    resultStack.push(parseFloat(a) + parseFloat(b));
                } else if(postfix[i] === "-") {
                    resultStack.push(parseFloat(b) - parseFloat(a));
                } else if(postfix[i] === "*") {
                    resultStack.push(parseFloat(a) * parseFloat(b));
                } else if(postfix[i] === "/") {
                    resultStack.push(parseFloat(b) / parseFloat(a));
                } else if(postfix[i] === "^") {
                    resultStack.push(Math.pow(parseFloat(b), parseFloat(a)));
                } else if(postfix[i] === "%") {
                    resultStack.push((parseFloat(b)% parseFloat(a)));
                }
            }
        }
        if(resultStack.length > 1) {
            return "error";
        } else {
            return resultStack.pop();
        }
    }
}

//function to call the functions for RPN and evaluation of RPN

function getResult() {
		var grpn = new GenerateRPN();
		var grpnResult = grpn.infixToPostfix(document.getElementById("myText").value);
		var ms = new MathSolver();
		document.getElementById("myResult").value = ms.solvePostfix(grpnResult.trim());
}