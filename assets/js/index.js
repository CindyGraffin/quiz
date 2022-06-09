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
const questionsAndAnswers = [
    ['Qui a remporté le championnat pilote de formule 1 en 2021 ?',
        ['Lewis Hamilton', 'Max Verstappen', 'Charles Leclerc', 'Valteri Bottas'],
        1
    ],
    ['Parmi ces animaux, lequel peut vivre le plus longtemps ?',
        ['La méduse', 'L\'éléphant', 'Le homard', 'La baleine'],
        0
    ],
    ['En quelle année est sorti le tout premier jeu vidéo Tomb Raider ?',
        ['1992', '1994', '1996', '1998'],
        2
    ],
    ['Combien de rayures y a-t-il sur le drapeau américain ?',
        ['10', '11', '12', '13'],
        3
    ],
    ['Quel animal est nomé rainette ?',
        ['La grenouille', 'L\'oie', 'La souris', 'La Mangouste'],
        0
    ],
    ['En quelle année est sorti le tout premier jeu vidéo Tomb Raider ?',
        ['1992', '1994', '1996', '1998'],
        2
    ],
    ['En quelle année est sorti le tout premier jeu vidéo Tomb Raider ?',
        ['1992', '1994', '1996', '1998'],
        2
    ],
    ['En quelle année est sorti le tout premier jeu vidéo Tomb Raider ?',
        ['1992', '1994', '1996', '1998'],
        2
    ],
    ['En quelle année est sorti le tout premier jeu vidéo Tomb Raider ?',
        ['1992', '1994', '1996', '1998'],
        2
    ],
    ['En quelle année est sorti le tout premier jeu vidéo Tomb Raider ?',
        ['1992', '1994', '1996', '1998'],
        2
    ],
    ['En quelle année est sorti le tout premier jeu vidéo Tomb Raider ?',
        ['1992', '1994', '1996', '1998'],
        2
    ],
    ['En quelle année est sorti le tout premier jeu vidéo Tomb Raider ?',
        ['1992', '1994', '1996', '1998'],
        2
    ],
    ['En quelle année est sorti le tout premier jeu vidéo Tomb Raider ?',
        ['1992', '1994', '1996', '1998'],
        2
    ],
    ['En quelle année est sorti le tout premier jeu vidéo Tomb Raider ?',
        ['1992', '1994', '1996', '1998'],
        2
    ],
    ['En quelle année est sorti le tout premier jeu vidéo Tomb Raider ?',
        ['1992', '1994', '1996', '1998'],
        2
    ],
    ['En quelle année est sorti le tout premier jeu vidéo Tomb Raider ?',
        ['1992', '1994', '1996', '1998'],
        2
    ],
    ['En quelle année est sorti le tout premier jeu vidéo Tomb Raider ?',
        ['1992', '1994', '1996', '1998'],
        2
    ],
    ['En quelle année est sorti le tout premier jeu vidéo Tomb Raider ?',
        ['1992', '1994', '1996', '1998'],
        2
    ],
    ['En quelle année est sorti le tout premier jeu vidéo Tomb Raider ?',
        ['1992', '1994', '1996', '1998'],
        2
    ],
    ['En quelle année est sorti le tout premier jeu vidéo Tomb Raider ?',
        ['1992', '1994', '1996', '1998'],
        2
    ],
];
const goodAnswersIndex = [1, 0, 2];

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
        answer.innerText = questionsAndAnswers[questionNumber-1][1][answerIndex]
        answerIndex++;
    })
}
/* function that display the question, her number and the four answers */
const displayQuestionAndAnswers = (quizAnswers) => {
    questionNumberContainer.innerText = questionNumber;
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
    answer.addEventListener('click', (e) => {
        responseChoice = answer.value;
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
    if (questionNumber <= 5) {
        nextQuestionButtonContainer.style.display = 'block';
    }
    if (questionNumber > 5) {
        resultButtonContainer.style.display = 'block';
    }
})

/* event listner that allow to display the next question with it answers */
nextQuestionButton.addEventListener('click', () => {
    validateAnswerButton.style.display = 'block';
    nextQuestionButtonContainer.style.display = 'none';
    quizMessage.innerText = '';
    displayQuestionAndAnswers(quizAnswers);
})

/* event listener that allow to show the results*/
resultButton.addEventListener('click', () => {
    quizMessage.innerText = '';
    quizContainer.style.display = 'none';
    quizScore.innerText = playerScore;
    quizScoreContainer.style.display = 'block';
    userQuestionsResponses.forEach(questionResponse => {
        let question = document.createElement('p');
        let userResponse = document.createElement('p');
        let goodOrFalse = document.createElement('p');
        question.innerHTML = `<p>${questionResponse[0]}</p>`
        userResponse.innerHTML = `<p>${questionResponse[1]}</p>`
        goodOrFalse.innerHTML = `<p>${questionResponse[2]}</p>`
        recapContainer.appendChild(question);
        recapContainer.appendChild(userResponse);
        recapContainer.appendChild(goodOrFalse);
    })
})

replayButton.addEventListener('click', () => {
    questionNumber = 1;
    playerScore = 0;
    replayButton.style.display = 'none';
    quizScoreContainer.style.display = 'none';
    starterButton.style.display = 'block';
    resultButtonContainer.style.display = 'none';
    validateAnswerButton.style.display = 'block';
})
