//Math.floor(Math.random() * (max - min + 1) + min);
let question = document.querySelector("#question");
let multipleChoiceList = document.querySelector("#multipleChoice");
let btnStartQuiz = document.querySelector("#startBtn");

let multipleChoiceOptions = [
    "if statements",
    "arrays",
    ".length",
    ".sort()",
    "global scope",
    "key value pairs",
];
let questionListArray = [1, 2, 3, 4, 5];

let questionList = {
    1: ["_____ adds interactivity to a static website", "JavaScript"],
    2: ["This converts objects to strings: ", "JSON.stringify()"],
    3: ["This method selects all the elements that match", ".querySelectorAll('')"],
    4: ["A very useful tool used during development and debugging for printing content to the debugger is:", "console.log"],
    5: ["String values must be enclosed within _____ when being assigned to variables", "quotes"],
};

let randomOrder = function (arr) {
    let b = 0;
    let c = 0;
    for (a = 0; a < arr.length; a++) {
        b = Math.floor(Math.random() * (arr.length - 1) + 1);
        c = arr[a];
        arr[a] = arr[b];
        arr[b] = c;
    }
    return arr;
};

randomOrder(questionListArray); //put into a function later
console.log(questionListArray);

//display the question on the screen based on the random order
//should remove the i into another part

for (let i = 0; i < questionListArray.length; i++) {
    let index = questionListArray[1];
    question.textContent = questionList[index][0];
    multipleChoiceOptions = randomOrder(multipleChoiceOptions); //shuffling the options from multipleChoiceOptions

    //need to print 4 random values from multiplechoiceoptions
    for (let j = 0; j < 4; j++) {
        let list = document.createElement("button"); //creating 4 buttons
        list.textContent = multipleChoiceOptions[j]; //changing the text to MCO array
        list.setAttribute("id", j); //gives <button data-index="0"> , 1,2,3 in this case because of the j for loop
        multipleChoiceList.appendChild(list);
        console.log(list);
    }
    let answer = questionList[index][1]; //choosing the correct answer from the question list
    let indexReplace = Math.floor(Math.random() * 4); //choosing a random spot in the options
    let replaceBtn = document.getElementById(indexReplace);
    replaceBtn.textContent = answer; //finding the index, deleting one, and replacing it with the correct answer
    console.log(multipleChoiceOptions);
}

//when start button is clicked, the quiz begins
btnStartQuiz.addEventListener("click", function (event) {
    document.getElementById("intro").setAttribute("style", "display:none;");
    document.getElementById("quiz").setAttribute("style", "display: unset");
    //console.log(randomOrder());//call a function that randomizes a question for the user
    //spit out a question
});

let randomQuestion = function () { };

multipleChoiceList;

//object with 5 questions and associated answers

//array of multiple choices for the user to choose from

//when start button is pressed, run the quiz function
//when quiz function is running, start the timer
//go through questions until time runs out or all questions are answered
//when all are answered/time runs out, run function that records initials and score

//Quiz function
//needs to ask a question
//needs to display multiple choices for the user to choose from
//choices need to be clickable
//compare user choice to the answer
//output whether they are right or wrong
//keep score of number of correct answers

//timer function
//set a count for 60 seconds
//if answer=wronng, -5 seconds immediately
//keep score of

//
