let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;

const startButton = document.getElementById('start-btn');
const index = document.getElementById('index')
const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const result = document.querySelector('.result');

startButton.addEventListener('click', startGame)

function startGame () {
    index.classList.add('hide')
    startButton.classList.add('hide')
    container.classList.remove('hide')
    generateQuestions()
}
 
function generateQuestions (index) {
    
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    const option4Total = questions[index].answer4Total;
    
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option4.setAttribute('data-total', `${option4Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
    option4.innerHTML = `${question.answer4}`
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');

    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }

    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    score.push(answerScore);

    selectedAnswersData.push()
    
    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    currentQuestion++;

    selectedOption.checked = false;

    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }

    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
        result.innerHTML =
         `<h1 class="final-score">Your Result</h1>
          <div class="summary">
            <p>${totalScore}</p>
          </div>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}

function loadPreviousQuestion() {
    currentQuestion--;
    score.pop();
    generateQuestions(currentQuestion);
}

generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);


