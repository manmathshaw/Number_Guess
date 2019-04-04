var myVar, num2Guess;

window.onload = generateNumber;

function generateRandom() {
    var notRandomNumbers = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
    var idx = Math.floor(Math.random() * notRandomNumbers.length);
    return notRandomNumbers[idx].toString();
}

function generateNumber() {
	var finalNum = '', num = 0;
    var options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for(var i=0; i<4; i++) {
    	idx = Math.floor(Math.random() * options.length);
    	finalNum = finalNum + options[idx].toString();
    	options.splice(options.indexOf(options[idx]), 1);
    }
    num2Guess = finalNum;
    console.log(num2Guess)
}

function cloneRow() {
	var row = document.getElementById("rowToClone");
	var table = document.getElementById("mainTable");
	var clone = row.cloneNode(true);
	clone.id = "newID";
	table.appendChild(clone);
}

function validateInputs(rowIdx) {
	var digit1 = document.getElementsByName('digit1')[rowIdx].value;
	var digit2 = document.getElementsByName('digit2')[rowIdx].value;
	var digit3 = document.getElementsByName('digit3')[rowIdx].value;
	var digit4 = document.getElementsByName('digit4')[rowIdx].value;
	var msgElement = document.getElementById('messageDiv');
	var errorMsg = "";
	if(digit1 == "") {
		errorMsg = "<p>* First digit is blank.</p>";
		msgElement.innerHTML = errorMsg;
		return false;
	} else if(digit2 == "") {
		errorMsg = "<p>* Second digit is blank.</p>";
		msgElement.innerHTML = errorMsg;
		return false;
	} else if(digit3 == "") {
		errorMsg = "<p>* Third digit is blank.</p>";
		msgElement.innerHTML = errorMsg;
		return false;
	} else if(digit4 == "") {
		errorMsg = "<p>* Fourth digit is blank.</p>";
		msgElement.innerHTML = errorMsg;
		return false;
	}
	var uniqueDigits = [false, false, false, false, false, false, false, false, false, false];
	uniqueDigits[digit1] = true;
	if(uniqueDigits[digit2]) {
		errorMsg = "<p>* All digits are not unique.</p>";
		msgElement.innerHTML = errorMsg;
		return false;
	} else {
		uniqueDigits[digit2] = true;
	}
	if(uniqueDigits[digit3]) {
		errorMsg = "<p>* All digits are not unique.</p>";
		msgElement.innerHTML = errorMsg;
		return false;
	} else {
		uniqueDigits[digit3] = true;
	}
	if(uniqueDigits[digit4]) {
		errorMsg = "<p>* All digits are not unique.</p>";
		msgElement.innerHTML = errorMsg;
		return false;
	}
	return true;
}

function compareNumbers(element) {
	var numToGuess = num2Guess.toString().split('');
	var rowIdx = element.closest('tr').rowIndex;
	if(validateInputs(rowIdx)) {
		var guessedNum = (document.getElementsByName('digit1')[rowIdx].value + document.getElementsByName('digit2')[rowIdx].value +
					  document.getElementsByName('digit3')[rowIdx].value + document.getElementsByName('digit4')[rowIdx].value).split('');
		var orangeDot = 0, greenDot = 0, idx = 0;
		for(var i=0; i<4; i++) {
			idx = numToGuess.indexOf(guessedNum[i]);
			if(idx > -1) {
				if(idx == i) {
					greenDot++;
				} else {
					orangeDot++;
				}
			}
		}
		console.log("greenDot - " + greenDot + " - orangeDot - " + orangeDot);
		var dotId = "", dotNo = 1;
		for(var i=0; i<greenDot; i++) {
			dotId = "dot" + dotNo;
			document.getElementsByName(dotId)[rowIdx-1].classList.remove("red");
			document.getElementsByName(dotId)[rowIdx-1].classList.remove("orange");
			document.getElementsByName(dotId)[rowIdx-1].classList.add("green");
			dotNo++;
		}
		for(var i=0; i<orangeDot; i++) {
			dotId = "dot" + dotNo;
			document.getElementsByName(dotId)[rowIdx-1].classList.remove("red");
			document.getElementsByName(dotId)[rowIdx-1].classList.remove("green");
			document.getElementsByName(dotId)[rowIdx-1].classList.add("orange");
			dotNo++;
		}
		if(greenDot == 4) {
			document.getElementsByName('digit1')[0].value = numToGuess[0];
			document.getElementsByName('digit2')[0].value = numToGuess[1];
			document.getElementsByName('digit3')[0].value = numToGuess[2];
			document.getElementsByName('digit4')[0].value = numToGuess[3];
			var msgElement = document.getElementById('messageDiv');
			errorMsg = "<p>* CONGRATULATIONS.!!! You are one among the world's greatest minds. </p>";
			msgElement.innerHTML = errorMsg;
		} else {
			if(rowIdx == 10) {
				document.getElementsByName('digit1')[0].value = numToGuess[0];
				document.getElementsByName('digit2')[0].value = numToGuess[1];
				document.getElementsByName('digit3')[0].value = numToGuess[2];
				document.getElementsByName('digit4')[0].value = numToGuess[3];
				var msgElement = document.getElementById('messageDiv');
				errorMsg = "<p>* Attempts over. Nothing to be worried because you are one among the 97%. Better luck next time.!!! You can see the correct answer above.</p>";
				msgElement.innerHTML = errorMsg;
			} else {
				cloneRow();
			}
		}
	}
}
function shiftFocus(element, digit) {
	var rowIdx = element.closest('tr').rowIndex;
	if(digit === 'digit1') {
		document.getElementsByName('digit2')[rowIdx].focus();
	} else if(digit === 'digit2') {
		document.getElementsByName('digit3')[rowIdx].focus();
	} else if(digit === 'digit3') {
		document.getElementsByName('digit4')[rowIdx].focus();
	}
}