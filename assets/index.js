//Math.floor(Math.random() * (max - min + 1) + min);
let question = document.querySelector("#question");
let multipleChoiceList = document.querySelector("#multipleChoice");
let validate = document.querySelector("#validate");
let btnStartQuiz = document.querySelector("#startBtn");
let timeCount = document.querySelector("#timeCount");
let score = document.querySelector("#score");
let highscores = document.querySelector("#highscores");
let initials = document.querySelector("#initials");
let hsList = document.querySelector("#hsList");
let replaceBtn;
let i = 0;
let count = 60;//////////////change back to 60/////////////////
let indexReplace;
let answer;
let highscoreInitials = [];
let highscoreCount = [];
let timerID;

let multipleChoiceOptions = [
    "if statements",
    "arrays",
    ".length",
    ".sort()",
    "global scope",
    "key value pairs",
];

let questionListArray = [1, 2, 3, 4, 5]; //is directly related to questionList object. could make it more flexible but for the sake of time and effort, i'll just leave it as an array

let questionList = {
    1: ["_____ adds interactivity to a static website", "JavaScript"],
    2: ["This converts objects to strings: ", "JSON.stringify()"],
    3: ["This method selects all the elements that match", ".querySelectorAll('')"],
    4: ["A very useful tool used during development and debugging for printing content to the debugger is:", "console.log"],
    5: ["String values must be enclosed within _____ when being assigned to variables", "quotes"],
};

///////////////////////Randomizer function///////////////////////////////////////////
let randomOrder = function (arr) { //will randomize the order of what ever array you put in its parameters
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


/////////////////////////////displays the question/////////////////////////////////////////
//display the question on the screen based on the random order
//should remove the i into another part so i updates only after the user answers
//when starting big loop, reset everything but keep track of the timer
let displayQuestion = function () {

    if (i < questionListArray.length) {
        let index = questionListArray[i]; //i-th question on our list
        question.textContent = questionList[index][0]; //displaying the question on the page
        answer = questionList[index][1]; //choosing the correct answer from the question list


        multipleChoiceOptions = randomOrder(multipleChoiceOptions); //shuffling the options from multipleChoiceOptions (answers)
        console.log(question);
        displayAnswers();
    } else {
        finish();
    }
}

////////////////displays the multiple Choice answers//////////////////////
let displayAnswers = function () {
    //need to print 4 random values from multiplechoiceoptions
    for (let j = 0; j < 4; j++) { //looping the process 4 times
        let list = document.createElement("button"); //creating buttons
        list.textContent = multipleChoiceOptions[j]; //changing the text to MCO array[j]
        list.setAttribute("id", j); //gives <button id="0"> , 1,2,3 in this case because of the j for loop
        multipleChoiceList.appendChild(list); //displaying the "answers" on the page (attacking to "multipleChoice ul")
    }

    indexReplace = Math.floor(Math.random() * 4); //choosing a random spot in the options
    replaceBtn = document.getElementById(indexReplace); //using the random spot and assigning it to replaceBtn
    replaceBtn.textContent = answer; //changing the text content of that button to the correct answer
}


//////////////////////////////checking if the answer is correct/////////////////////////////
multipleChoiceList.addEventListener("click", function (event) { //listens if buttons are pressed
    let userAns = event.target; //setting userAns to whatever was pressed

    if (userAns == replaceBtn) {
        validate.textContent = "Correct!";
    } else {
        validate.textContent = "Wrong!";
        count = count - 10;
    }

    setTimeout(() => {  //give it a pause so the viewer can see if it was right or wrong
        validate.textContent = "";

        for (let c = 3; c >= 0; c--) { //removing the multiple choice answers
            multipleChoiceList.children[c].remove();
        }

        i++; //index for the next question
        displayQuestion(); //calling the function to display the question

    }, "500");
})

//////////////////////////All done page//////////////////////////////
let finish = function () {
    clearInterval(timerID);
    document.getElementById("quiz").setAttribute("style", "display: none");
    document.getElementById("finish").setAttribute("style", "display: unset");
    score.textContent = count;
    storeHighScore();
}

let storeHighScore = function () {
    document.querySelector("#submitBtn").addEventListener("click", function (event) {
        event.preventDefault()
        highscoreCount = JSON.parse(localStorage.getItem("hi-scores")) || [];

        let newScore = {
            initials: initials.value,
            score: count
        };

        highscoreCount.push(newScore);
        localStorage.setItem("hi-scores", JSON.stringify(highscoreCount));
        highscoresPage();
    })
}

///////////////////////////HighScores page///////////////////
let highscoresPage = function () {
    clearInterval(timerID);
    document.getElementById("intro").setAttribute("style", "display: none");
    document.getElementById("quiz").setAttribute("style", "display: none");
    document.getElementById("finish").setAttribute("style", "display: none");
    highscores.setAttribute("style", "display: unset");

    let myHighscores = JSON.parse(localStorage.getItem("hi-scores")) || [];
    myHighscores.sort(function (x, y) {
        return y.score - x.score;
    })

    hsList.innerHTML = "";
    for (let a = 0; a < myHighscores.length; a++) {
        let li = document.createElement("li");
        li.textContent = myHighscores[a].initials + " -- " + myHighscores[a].score;
        hsList.appendChild(li);
    }


    //localStorage.getItem(initials);

    document.querySelector("#backBtn").addEventListener("click", function () {
        highscores.setAttribute("style", "display: none");
        document.getElementById("intro").setAttribute("style", "display:unset;");
        window.location.reload();
    })

    document.querySelector("#clearBtn").addEventListener("click", function () {
        localStorage.removeItem("hi-scores");
    })

}


///////////////////////if Highscores page is clicked take them to highscores page/////////
document.querySelector("a").addEventListener("click", function (event) {
    if (event.target) {
        highscoresPage();
    }
})

//////////////////////////////timer function///////////////////////////////////////
function timer() {
    timerID = setInterval(function () {
        if (count <= 0) {
            timeCount.textContent = "times up";
            count = 0;
            finish();
            return;
        }
        timeCount.textContent = count;
        count--;
    }, 1000);

}


//////////////////////////////////when start is clicked///////////////////////////////////
//when start button is clicked, the quiz begins
//hides the intro section and shows the quiz section
//starts the timer
btnStartQuiz.addEventListener("click", function (event) {
    document.getElementById("intro").setAttribute("style", "display:none;");
    document.getElementById("quiz").setAttribute("style", "display: unset");
    displayQuestion();
    timer();
});


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
