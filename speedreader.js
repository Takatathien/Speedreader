/**
 * Created by Takatathien on 10/18/2016.
 * This page is the JavaScript of speedreader.html
 * It control how to display the input text, the speed of text display,
 * and the size of the text.
 */
(function() {
    'use strict';

    var index = 0;
    var timer = null;
    var speed = null;
    var repeat = false;

    window.onload = function() {
        document.getElementById("start").onclick = setupTimer;
        document.getElementById("stop").onclick = setupTimer;
        document.getElementById("speed").onchange = changeSpeed;

        var fontSizes = document.getElementsByName("size");
        for (var j = 0; j < fontSizes.length; j++) {
            fontSizes[j].onchange = changeSize;
        }

        document.getElementById("stop").disabled = true; // disabled stop button initially
        document.getElementById("stop").classList.add("disabled");
        changeSpeed(); //set text speed to default
        changeSize(); //set font size to default
    };

    // This function would start the program after a specific interval
    // and stop the program and reset the timer once the user wanted to.
    function setupTimer() {
        if (timer === null) {
            timer = setInterval(startRead, speed);
        } else {
            clearInterval(timer);
            timer = null;
            stopRead();
        }
    }

    // This function take in the user input and split them into individual
    // word to display. Each call only show one word at a specific index
    // and the index would increase at the program continue to get call.
    function startRead() {
        var inputText = document.getElementById("input_area").value.split(/[ \t\n]+/);
        if (index < inputText.length) {
            if (inputText[index].endsWith(",") || inputText[index].endsWith(".")
                || inputText[index].endsWith("!") || inputText[index].endsWith("?")
                || inputText[index].endsWith(":") || inputText[index].endsWith(";")) {
                inputText[index] = inputText[index].substring(0, inputText[index].length - 1);
                document.getElementById("output_area").innerHTML = inputText[index];
                if (repeat === false) {
                    repeat = true;
                } else {
                    index++;
                    repeat = false;
                }
            } else {
                document.getElementById("output_area").innerHTML = inputText[index];
                index++;
            }
            document.getElementById("start").disabled = true;
            document.getElementById("start").classList.add("disabled");
            document.getElementById("stop").disabled = false;
            document.getElementById("stop").classList.remove("disabled");
        } else {
            setupTimer();
        }


    }

    // This program stop displaying the word once the user chose to and
    // reset the index.
    function stopRead() {
        document.getElementById("output_area").innerHTML = "";
        index = 0;

        document.getElementById("start").disabled = false;
        document.getElementById("start").classList.remove("disabled");
        document.getElementById("stop").disabled = true;
        document.getElementById("stop").classList.add("disabled");
    }

    // This program change the speed of the text display depends on user's
    // option and can be change while the program is running.
    function changeSpeed() {
        var textSpeeds = document.getElementById("speed");
        for (var z = 0; z < textSpeeds.length; z++) {
            if (textSpeeds.options[z].selected) {
                speed = textSpeeds.options[z].value;
            }
        }

        if (timer !== null) {
            clearInterval(timer);
            timer = null;
            setupTimer();
        }
    }

    // This program change the size of the text display depends on the user's
    // option and can be change while the program is running.
    function changeSize() {
        var fontSizes = document.getElementsByName("size");
        for (var k = 0; k < fontSizes.length; k++) {
            document.getElementById("output_area").classList.remove(fontSizes[k].value);
            if(fontSizes[k].checked) {
                document.getElementById("output_area").classList.add(fontSizes[k].value);
            }
        }
    }
}());