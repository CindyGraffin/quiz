import { sortedQuestionsAndAnswers } from "./questions.js";

/* =========== SELECTORS ============ */
/* quiz container */
const quizContainer = document.querySelector('.quiz__container');
/*quiz starter */
const starterButton = document.querySelector('.starter');
/* quiz questions */
const questionNumberContainer = document.querySelector('.number');
const questionContainer = document.querySelector('.question');
/* quiz answers */
const quizAnswersContainer = document.querySelector('.quiz__answers');
const quizAnswers = document.querySelectorAll('.answer');
/* quiz validation */
const validateButtonContainer = document.querySelector('.quiz__validate');
const validateAnswerButton = document.querySelector('.validate');
/* quiz message */
const quizMessage = document.querySelector('.message');
/* next question button */
const nextQuestionButtonContainer = document.querySelector('.quiz__next');
const nextQuestionButton = document.querySelector('.next');
/* see results button */
const resultButtonContainer = document.querySelector('.quiz__finisher');
const resultButton = document.querySelector('.finisher');
/* quiz score */
const quizScoreContainer = document.querySelector('.quiz__score');
const quizScore = document.querySelector('.score');
/* replay button */
const replayButton = document.querySelector('.replay');
/* questions responses container */
const recapContainer = document.querySelector('.quiz__recap');


/* =========== QUESTIONS AND ANSWERS ============ */
console.log(sortedQuestionsAndAnswers)
/* function that shuffle the questions and answers array */
const shuffleQuestionsAndAnswers = (questionsAndAnswers) => {
    let array = questionsAndAnswers
    let newArray = [];
    for (let i = 0; i < 20; i++) {
        let randomIndex = Math.floor(Math.random()* (array.length-1))
        console.log(randomIndex);
        let element = array[randomIndex];
        array.splice(randomIndex, 1)
        newArray.push(element)
    }
    return newArray
}
let questionsAndAnswers = shuffleQuestionsAndAnswers(sortedQuestionsAndAnswers)
console.log(questionsAndAnswers)
/* =========== ASSESMENTS ============ */
const assessments = [
    'Tu es réélement un génie !',
    'La culture générale est ton amie',
    'Très bien, mais je suis sûre que tu peux mieux faire !',
    'C\'est pas ouf, tu es en dessous de la moyenne !',
    'C\'esr vraiment honteux !',
    'Tu es un cas desespéré ...'
];
/* function that return an assessment based on the grade obtained after the quizz */
const attributeAssessment = (grade) => {
    if (grade >= 18) {
        return assessments[0];
    } else if (grade >=14) {
        return assessments[1];
    } else if (grade >= 10) {
        return assessments[2];
    } else if (grade >= 6) {
        return assessments[3];
    } else if (grade >= 2) {
        return assessments[4];
    } else {
        return assessments[5];
    }
}

/* =========== GAME LOGIC ============ */
/* num of the question */
let questionNumber = 1;
let playerScore = 0;
let responseChoice;
/*  stocks the questions, user responses and if it is good or not*/
let userQuestionsResponses = [];

/* function that display the four answers of the question number */
const displayAnswers = (quizAnswers) => {
    let answerIndex = 0; 
    quizAnswers.forEach((answer) => {
        answer.innerText = (answerIndex +1) + '. ' + questionsAndAnswers[questionNumber-1][1][answerIndex]
        answerIndex++;
    })
}
/* function that display the question, her number and the four answers */
const displayQuestionAndAnswers = (quizAnswers) => {
    questionNumberContainer.innerText = questionNumber;
    console.log(questionsAndAnswers[questionNumber-1][0])
    questionContainer.classList.add('.question');
    questionContainer.innerText = questionsAndAnswers[questionNumber-1][0]
    displayAnswers(quizAnswers)
}

/* function that updates the response's choice of the user */
quizAnswers.forEach(answer => {
    answer.addEventListener('click', (answer) => {
        responseChoice = parseInt(answer.value);
    })
})
    
/* event listener when we launch the game clicking the launch button */
starterButton.addEventListener('click', () => {
    starterButton.style.display = 'none';
    quizContainer.style.display = 'block';
    displayQuestionAndAnswers(quizAnswers)
})

/* event listener that updates the answer's choice of the user */
quizAnswers.forEach((answer) => {
    answer.addEventListener('click', () => {
        quizAnswers.forEach(answer => {
            answer.style.backgroundColor = 'aliceblue';
        })
        responseChoice = answer.value;
        answer.style.backgroundColor = 'yellow';

    })
})

/* function that push the question, the response of the user and if it is a great of false response */
const pushQuestionResponse = (goodOrNot) => {
    userQuestionsResponses.push(['Question ' + questionNumber + ' : ' + questionsAndAnswers[questionNumber-1][0], 'Votre réponse: ' +questionsAndAnswers[questionNumber-1][1][responseChoice], goodOrNot])
}
/* function that verifies if the response of the user is correct (if it is adds one to his score) or not */
const verifyAnswer = (responseChoice) => {
    if (parseInt(responseChoice) === questionsAndAnswers[questionNumber-1][2]) {
        playerScore += 1;
        quizMessage.innerText = 'Bonne réponse trop fort !';
        pushQuestionResponse('Bonne réponse !')
    } else {
        quizMessage.innerText = 'Mauvaise réponse, fais un effort !';
        pushQuestionResponse('Mauvaise réponse !')
    }
}

/* event listener that check the answer, add one to the question number, then it checks if it's or not the last question */
validateAnswerButton.addEventListener('click', () => {
    verifyAnswer(responseChoice)
    questionNumber++
    validateAnswerButton.style.display = 'none';
    if (questionNumber <= 20) {
        nextQuestionButtonContainer.style.display = 'block';
    }
    if (questionNumber > 20) {
        resultButtonContainer.style.display = 'block';
    }
})

/* event listner that allow to display the next question with it answers */
nextQuestionButton.addEventListener('click', () => {
    quizAnswers.forEach(answer => {
        answer.style.backgroundColor = 'aliceblue';
    })
    validateAnswerButton.style.display = 'block';
    nextQuestionButtonContainer.style.display = 'none';
    quizMessage.innerText = '';
    displayQuestionAndAnswers(quizAnswers);
})

/* function that create three paragraphs element for each question/response and tells if it was good or not */
const createRecapElement = (userQuestionsResponses) => {
    userQuestionsResponses.forEach(questionResponse => {
        let question = document.createElement('p');
        let userResponse = document.createElement('p');
        let goodOrFalse = document.createElement('p');
        question.innerHTML = `<p><i class="uil uil-question-circle"></i>${questionResponse[0]}</p>`
        userResponse.innerHTML = `<p>${questionResponse[1]}</p>`
        goodOrFalse.innerHTML = `<p>${questionResponse[2]}</p>`
        recapContainer.appendChild(question);
        recapContainer.appendChild(userResponse);
        recapContainer.appendChild(goodOrFalse);
    })
}

/* event listener that allow to show the results*/
resultButton.addEventListener('click', () => {
    quizMessage.innerText = attributeAssessment(playerScore);
    quizContainer.style.display = 'none';
    quizScore.innerText = playerScore;
    quizScoreContainer.style.display = 'block';
    let scoreMessage = document.createElement('p');
    scoreMessage.innerText = attributeAssessment(playerScore);
    recapContainer.appendChild(scoreMessage);
    createRecapElement(userQuestionsResponses);
    
})

/* event listener that allow to replay the game */
replayButton.addEventListener('click', () => {
    questionNumber = 1;
    playerScore = 0;
    replayButton.style.display = 'none';
    quizScoreContainer.style.display = 'none';
    starterButton.style.display = 'block';
    resultButtonContainer.style.display = 'none';
    validateAnswerButton.style.display = 'block';
    quizMessage.innerText = '';
})


