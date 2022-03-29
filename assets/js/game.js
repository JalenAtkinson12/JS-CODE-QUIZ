const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const ProgressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
 const timerEl = document.getElementById("time");

 let timerId;


let currentQuestion = {}
let acceptingAnswers = true;
let score = 0
let questionCounter = 0
let availableQuestions= []

let questions = [
   {
       question:'What tag is used to define an unordered list that is bulleted?',
       choice1: '<ul>',
       choice2:  '<u>',
       choice3:  '<s>',
       choice4:   '<li>',
       answer: 1,
   },
   {
    question:'What group of tags are used to define the text headers?',
    choice1: '<footer>',
    choice2:  '<button>',
    choice3:  '<h1> to <h6>',
    choice4:   '<body>',
    answer: 3,
 },
 {
    question:'What  is the value called that defines colors such as the following: #FFFF00',
    choice1: 'Color Value',
    choice2:  'Hex Value',
    choice3:  'RGB Value',
    choice4:   'Decimal Value',
    answer: 2,
 },
 {
    question:'CSS can be used to greatly improve the____of an HTML form',
    choice1: 'Appearance',
    choice2:  'Layout',
    choice3:  'Performance',
    choice4:   'Colors',
    answer: 1,
 },
 {
    question:'What is the CSS property that offers extra information about something when you over over an element?',
    choice1: 'Tutorial',
    choice2:  'Hint',
    choice3:  'Info Block',
    choice4:   'Tooltip',
    answer: 4,
 }

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score= 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion =() => {
    if(availableQuestions.length===0 || questionCounter > MAX_QUESTIONS) {
       localStorage.setItem('mostRecentScore',score) 
       
       return window.location.assign("end.html")
    }

    questionCounter++
    ProgressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
       const number = choice.dataset['number']
       choice.innerText = currentQuestion['choice'+ number]
    })


    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}   

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)


        
    })

    
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}




startGame()