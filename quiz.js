const question = document.querySelector ('#question');
const choices = Array.from(document.querySelectorAll ('.choice-text'));
const scoreText = document.querySelector('#score');
const progressText = document.querySelector ('#progressText');
const progressBarFull = document.querySelector ('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
{
question: "Let L be the set of all straight lines in the Euclidean plane. Two lines l1 and l2  are said to be related by the relation R i  is parallel to l2. Then the relation R is",
choice1: "Reflexive",
choice2: "Reflexive and Symmetric",
choice3: "Transitive and Equivalence",
choice4: "all",
answer: 4,
},

{
question: " Let A = {a, b, c} and B = {1, 2}. Consider a relation R  defined from set A to set B. Then R  is equal to set",
choice1: "A",
choice2: "B",
choice3: "AxB",
choice4: "BxA",
answer: 3,
},

{
question: " The runs scored by a batsman in 5 ODIs are 31,97,112, 63, and 12. The standard deviation is",
choice1: "24.79",
choice2: "23.79",
choice3: "25.79",
choice4: "26.79",
answer: 3   ,
},

{
question: " Three dice are tossed. Find the probability that the sum of the integers is 9",
choice1: '27/ 6^3',
choice2: '25/6^3',
choice3: '21/6^3',
choice4: '15/6^3',
answer: 4,
},

{
question: "Find the mode of the call received on 7 consecutive day 11,13,13,17,19,23,25",
choice1: "11",
choice2: "13",
choice3: "17",
choice4: "23",
answer: 1,
}
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startQuiz = () => {
questionCounter = 0
score = 0
availableQuestions = [...questions]
getNewQuestion()
}

getNewQuestion = () => {
if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign ('end.html')
}

questionCounter++
progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

const questionsIndex = Math.floor (Math.random() * availableQuestions.length)
currentQuestion = availableQuestions[questionsIndex]
question.innerText = currentQuestion.question

choices.forEach(choice =>{
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
})

availableQuestions.splice (questionsIndex, 1)

acceptingAnswers = true
}

choices.forEach (choice =>{
    choice.addEventListener('click', e =>{
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
        incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout (() =>{
    selectedChoice.parentElement.classList.remove(classToApply)
    getNewQuestion()
    }, 1000)
    })
})

incrementScore = num => {
    score+= num
    scoreText.innerText = score
}

startQuiz()