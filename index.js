let correctAnswer; // Variable to store the correct answer


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateEquation() {
    // Generate random equation
    const operations = ['+', '-', '*'];
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const randomOperation = operations[getRandomInt(0, operations.length - 1)];
    
    // Display equation on the screen
    const questionEl = document.getElementById('equation');
    questionEl.innerText = `What is ${num1} ${randomOperation} ${num2}?`;
    
    // Compute the answer of the equation
    switch(randomOperation) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
    }
}

function checkAnswer(event) {
    event.preventDefault(); 
    // Get the user's answer
    const inputEl = document.getElementById('answer');
    const userAnswer = parseInt(inputEl.value, 10);

    // Check if the answer is correct
    if (userAnswer === correctAnswer) {
        console.log("correct");
        updateScore(true);
    } else {
        console.log('wrong');
        updateScore(false);
    }
    
    // Clear the input field
    inputEl.value = '';

    // Generate a new equation
    generateEquation();
}

function updateScore(answervalue) {
    let score = JSON.parse(localStorage.getItem('score')); // Retrieve the current score
    if(answervalue===true){
        score++;
    }
    else{
        score--;
    }
    localStorage.setItem('score', JSON.stringify(score)); // Save the updated score

    // Display the updated score
    const scoreEl = document.getElementById('score');
    scoreEl.innerText = `score: ${score}`;
}

const formEl = document.getElementById('quiz-box');
formEl.addEventListener('submit', checkAnswer);
// Initialize score in localStorage if not already set
if (localStorage.getItem('score') === null) {
    localStorage.setItem('score', JSON.stringify(0));
}

generateEquation();
localStorage.clear();