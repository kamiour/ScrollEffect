let container = document.querySelector('#section-scroll');
let body = document.querySelector('body');
let slidePhones = $('.col-slide'); //animated phones columns
let LeftContent = document.querySelector('.section-main.sectionLeft');
let leftBG = document.querySelector('.background-image-gradient.sectionLeft');
let rightBG = document.querySelector('.background-image-gradient.sectionRight');
let RightContent = document.querySelector('.section-main.sectionRight');
let step = 0; //step of movement
let initTop = []; //array of initial top values of columns
let finalTop = []; //array of final top values of columns
let slideAccel = [1.2, 1.1, 0.75, 1, 1.1] //acceleration for sliding; 1 is a normal step value
let SlowestIndex = slideAccel.findIndex(item => item == Math.min(...slideAccel)); //checking the index of the slowest accelarator
let startArr = []; //array for columns moved to the start position
let finalArr = []; //array for columns moved to the end position
let currentProgress; //state of phones scroll
let headerMain = document.querySelector('.header');
let headerBG = document.querySelector('.header-background.header-main');
let headersectionRightBG = document.querySelector('.header-background.header-sectionRight');
let headerBgStyles = []; //array for header background styles

$(document).ready(function() {
    "use strict";

    for (let i = 0; i < slidePhones.length; i++) {
        initTop[i] = slidePhones[i].offsetTop;
    }
    for (let i = 0; i < slidePhones.length; i++) {
        finalTop[i] = (initTop[i] + window.innerHeight*2 - window.innerHeight*0.2);
    }

    $(container).mousewheel(function(event) {
        step = (-event.deltaY/Math.abs(event.deltaY))*(0.4*(container.clientHeight)/0.7071);
                    
        //making phones move
        for (let i = 0; i < slidePhones.length; i++) {
            if (step < 0 && !startArr.includes(i))  {
                if (slidePhones[i].offsetTop > (initTop[i] - step)) {
                    finalArr = [];
                    slidePhones[i].style.top = slidePhones[i].offsetTop + step*slideAccel[i] + "px";
                } else {
                    startArr.push(i);
                    slidePhones[i].style.top = initTop[i] + "px";
                }
            } else if (step > 0 && !finalArr.includes(i))  {
                if (slidePhones[i].offsetTop < (finalTop[i] - step)) {
                    startArr = [];
                    slidePhones[i].style.top = slidePhones[i].offsetTop + step*slideAccel[i] + "px";
                } else {
                    finalArr.push(i);
                    slidePhones[i].style.top = finalTop[i] + "px";
                }
            }
        }
        //making content+bg change
        currentProgress = ((parseInt(slidePhones[SlowestIndex].style.top)-initTop[SlowestIndex])/(finalTop[SlowestIndex]-initTop[SlowestIndex])).toFixed(1);
        LeftContent.style.opacity = 1 - currentProgress;
        RightContent.style.opacity = 1 - LeftContent.style.opacity;
        leftBG.style.opacity = 1 - currentProgress;
        rightBG.style.opacity = 1 - LeftContent.style.opacity;
        headerBG.style.opacity = 1 - currentProgress;
        headersectionRightBG.style.opacity = 1 - headerBG.style.opacity;

        PointerEvents(currentProgress);
    });
});

//function for checking the current scroll progress for mobile phones on page load:
function PointerEvents(currentState) {
    if (!currentState) {
        RightContent.style.pointerEvents = "none";
        LeftContent.style.pointerEvents = "auto";
    } else if (currentState > 0 && currentState < 1) {
        LeftContent.style.pointerEvents = "auto";
        RightContent.style.pointerEvents = "auto";
    } else if (currentState == 1) {
        LeftContent.style.pointerEvents = "none";
        RightContent.style.pointerEvents = "auto";
    }
}