
let value = 0;
var resultsResizableArr = [0]; //could just make this belong to own calcs.

function calc(string) {
  var push = function(value){ //should be prototype so no have mem for it in each calc, wasteful.
    resultsResizableArr.unshift(value);
  };
  var pop = function(value){
    var newValue = resultsResizableArr.shift();
    console.log("popped:" + newValue);
    return newValue;
  };
  var print = function (){     //print top to bottom.
    //see collection format for push/pop Vs. unshift/shift.
    /* print this.
    [top to bottom]
    [3, 2, 1, 0]
    */
    console.log("printing:"+ resultsResizableArr);
  };



    //convert string to JSON
    let operation = JSON.parse(string);

    //MULTI-EXPRESSION //The stack IS altered.
    if (operation.expr) {
        let opArr = [];
        opArr.push(operation.op);
        let lastKnownExpr = operation;
        let checkExpr = operation.expr;
        while (checkExpr) { 
            lastKnownExpr = checkExpr;
            opArr.push(lastKnownExpr.op);
            checkExpr = checkExpr.expr;
        } //checkExpr should be nothing and lastKnownExpr has last Known Expr;
        let currentOp;
        currentOp = opArr.pop();
        console.log("arr:" + resultsResizableArr );
        value = resultsResizableArr[0];
        console.log("value:" + value + " & num:" + lastKnownExpr.number + " & arr:" + resultsResizableArr );
        switch (currentOp) {
          case "add":
              value = value + lastKnownExpr.number;
              break;
          case "subtract":
              value = value - lastKnownExpr.number;
              break;
          case "multiply":
              value = value * lastKnownExpr.number;
              break;
          case "divide":
              value = value / lastKnownExpr.number;
              break;
          case "push":
              push(value);
              break;
          case "pop":
              var res = pop();
              if (res === undefined){
                return "(what? You have an empty stack now)\n";
              }
              break;
          default:
              console.log("please enter a valid operation in your inner most expression. ex:\'{\"op\" : \"add\", \"number\" : 5}\' ");
        }
        console.log("value:" + value + " & arr:" + resultsResizableArr );
        while (opArr.length > 0) { //at this point there should be at least 1 operation left.
          switch (currentOp) {
            case "add":
                value += resultsResizableArr[0];
                break;
            case "subtract":
                value -= resultsResizableArr[0];
                break;
            case "push":
                push(value);
                break;
            case "pop":
                var res = pop();
                if (res === undefined){
                  return "(what? You have an empty stack now)\n";
                }
                break;
            default:
                console.log("please enter a valid operation in your expression. ex:\'{\"op\" : \"add\", \"number\" : 5}\' ")
          }
          console.log("value:" + value + " & arr2:" + resultsResizableArr );
        }
    }

    else {
      switch (operation.op) {
          case "add":
              value = value + operation.number;
              break;
          case "subtract":
              value = value - operation.number;
              break;
          case "push":
              push(value);
              break;
          case "pop":
              var res = pop();
              if (res === undefined){
                return "(You have an empty stack now)\n";
              }
              break;
          case "print":
              print();
              break;
          default:
              console.log("please enter a valid operation in your expression. ex:\'{\"op\" : \"add\", \"number\" : 5}\' ")
      }
      console.log("value:" + value + " & arr:" + resultsResizableArr );
    }
    return value;
}







