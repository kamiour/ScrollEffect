// Variables
let scrollElems = document.getElementsByClassName('scrollPage');
let article = document.querySelector('.article');
let durationTime = [400, 600, 800]; //time of animation duration for mobile
let indexOfSlowest = durationTime.indexOf(Math.max(...durationTime));
let durationSetAdditional = [250, 250, 250]; //time of animation of additional steps of splitting and dragging mobile phones
let durationTimeBG = []; //time of animation for bgColor change;
for (let i = 0; i < durationTime.length; i++) {
  durationTimeBG[i] = durationTime[i] + durationSetAdditional[i]*2;
}

let durationZero = [0, 0, 0];
let pow = 2; //power of timing function
let gradDBA = {
  color: [[231,78,44], [254,156,100]],
}
let gradMustang = {
  color: [[85,75,161], [105,199,237]],
}
let grad = {};
let compareGrad = {};
let currentGrad = {
  color: [[],[]],
};
let currentProgress;
let slidePhones = document.getElementsByClassName('col-slide'); //animated phones columns
let initTop = []; //array of initial top values of columns
let finalTop = []; //array of final top values of columns
let phoneHeight = window.innerHeight*0.6;
let cecilElems = [document.getElementsByClassName('colLeftCecil'), document.getElementsByClassName('colCenterCecil'), document.getElementsByClassName('colRightCecil')];
let dbaElems = [document.getElementsByClassName('colLeftDBA'), document.getElementsByClassName('colCenterDBA'), document.getElementsByClassName('colRightDBA')];
let distance = window.innerHeight; //distance between visible and invisible mobile phones
let currentTopCecil = [];
let newTopCecil = [];
let currentTopDBA = [];
let newTopDBA = [];
let finalDestinationBottom;
let finalDestinationTop;
let stopMove = false;

//requestAnimationFrame function
function animate({timing, draw, duration}) {
  let start = performance.now();
  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / (duration);
    if (timeFraction > 1) timeFraction = 1;
    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);
    draw(progress); // отрисовать её
    if (timeFraction < 1 && !stopMove) {
      requestAnimationFrame(animate);
    }
  });
}

//bg animation
function change(paramGrad1, paramGrad2, element, timeDurationSet) {
  grad = {...paramGrad1};
  grad.color = [...paramGrad1.color];
  compareGrad.color = [...paramGrad2.color];
  compareGrad = {...paramGrad2};

  for (let j = 0; j < grad.color.length; j++) {
    grad.color[j] = [...paramGrad1.color[j]];
    compareGrad.color[j] = [...paramGrad2.color[j]];
  }
  
  bgColor(element, timeDurationSet);
}

function bgColor(elem, setDuration) {
  return animate({
    duration: Math.max(...setDuration),
    timing: function (timeFraction) {
      return timeFraction;
    },
    draw: function(progress) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          currentGrad.color[i][j] = (grad.color[i][j] + (compareGrad.color[i][j]-grad.color[i][j]) * progress);
        }
      };
      elem.style.backgroundImage = ('linear-gradient(117deg, rgb('+currentGrad.color[0]+'), rgb('+currentGrad.color[1]+'))');
    }
  });
}

function currentPos() {
  for (let i = 0; i < scrollElems.length; i++) {
    if ((window.scrollY + window.innerHeight/2) >= scrollElems[i].offsetTop && (window.scrollY + window.innerHeight/2) < scrollElems[i].offsetTop + scrollElems[i].clientHeight) {
      return i;
    }  
  }
}

function currentPosStrict() {
  for (let i = 0; i < scrollElems.length; i++) {
    if ((window.scrollY) >= scrollElems[i].offsetTop && (window.scrollY) < scrollElems[i].offsetTop + scrollElems[i].clientHeight) {
      return i;
    }
  }
}

function dbaSection() {
  for (let i = 0; i < scrollElems.length; i++) {
    if (scrollElems[i].id == "dbafitness") {
      return i;
    }
  }
}

function mustangSection() {
  for (let i = 0; i < scrollElems.length; i++) {
    if (scrollElems[i].id == "mustangchain") {
      return i;
    }
  }
}
let progressValue;
//for phones animation
function mobileMove(durationSet) { 
  return new Promise((res, rej) => {
    for (let index = 0; index < slidePhones.length; index++) {
      animate({
        duration: durationSet[index],
        timing: function (timeFraction) {
          return Math.pow(timeFraction, pow);
        },
        draw: function(progress) {
            slidePhones[index].style.transform = 'translateY('+(((progress * finalTopArray[index]) + ((1-progress)*startTopArray[index])))+'px)';
            currentProgress[index] = (progress * finalTopArray[index]) + ((1-progress)*startTopArray[index]);

            progressValue = progress;
          
          if (progress == 1 && index == indexOfSlowest) {
            console.log('resolved')
            res();
          };
        }
      });
    }
  })
}

function topMove(durationSet) {
  return new Promise((res, rej) => {
    for (let index = 0; index < slidePhones.length; index++) {
      if (!newTopCecil[index]) {
        newTopCecil[index] = 0;
      }
      currentTopCecil[index] = newTopCecil[index];
      if (finalDestinationTop == distance*(-1)) {
        finalDestinationTop = distance*(-1)
      } else {
        finalDestinationTop = 0
      }

      animate({
        duration: durationSet[index],
        timing: function (timeFraction) {
          return Math.pow(timeFraction, pow)
        },
        draw: function(progress) {
          for (let i = 0; i < cecilElems[index].length; i++) {
            cecilElems[index][i].style.transform = 'translateY('+((1-progress)*currentTopCecil[index] + progress*(finalDestinationTop))+'px)';
          }
          newTopCecil[index] = (1-progress)*currentTopCecil[index] + progress*(finalDestinationTop);
    
          if (progress == 1 && index == indexOfSlowest) {
            res();
          };
        }
      });
    }
  })
}

function bottomMove(durationSet) {
  return new Promise((res, rej) => {
    for (let index = 0; index < slidePhones.length; index++) {
      if (!newTopDBA[index]) {
        newTopDBA[index] = 0;
      }
      currentTopDBA[index] = newTopDBA[index];
      if (finalDestinationBottom == distance) {
        finalDestinationBottom = distance
      } else {
        finalDestinationBottom = 0
      }

      animate({
        duration: durationSet[index],
        timing: function (timeFraction) {
          return Math.pow(timeFraction, pow)
        },
        draw: function(progress) {
          for (let i = 0; i < dbaElems[index].length; i++) {
            dbaElems[index][i].style.transform = 'translateY('+((1-progress)*currentTopDBA[index] + progress*(finalDestinationBottom))+'px)';
          }
          newTopDBA[index] = (1-progress)*currentTopDBA[index] + progress*(finalDestinationBottom);

          if (progress == 1 && index == indexOfSlowest) {
            res();
          };
        }
      });
    }
  })
}
//end

//executing
window.addEventListener("load", function(){
  let shiftTop = [0, window.innerHeight*0.22, window.innerHeight*0.02];
  let shiftBottom = [window.innerHeight*0.4, window.innerHeight*0.22, phoneHeight*2]

  for (let i = 0; i < slidePhones.length; i++) {
    initTop[i] = slidePhones[i].offsetTop + shiftTop[i];
  }
  for (let i = 0; i < slidePhones.length; i++) {
    finalTop[i] = (initTop[i] + 5.3*phoneHeight - shiftTop[i] - shiftBottom[i]);
  }

  if (currentPos() > dbaSection()) {
    firstEnterMustang = false;
    firstEnterDBA = true;
    
    (async function() {
      newTopDBA = [0, 0, 0];
      finalDestinationBottom = distance;
      newTopCecil = [(-1)*distance, (-1)*distance, (-1)*distance];
      finalDestinationTop = 0;
      currentProgress = [...initTop];
      finalTopArray = [...finalTop];
      startTopArray = [...currentProgress];

      await topMove(durationZero);
      await mobileMove(durationZero);
      await bottomMove(durationZero);
    })();

    change(gradDBA, gradMustang, article, durationZero);
  } else {
    firstEnterDBA = false;
    firstEnterMustang = true;

    (async function() {
      newTopDBA = [distance, distance, distance];
      finalDestinationBottom = 0;
      newTopCecil = [0, 0, 0];
      finalDestinationTop = (-1)*distance;
      currentProgress = [...finalTop];
      finalTopArray = [...initTop];
      startTopArray = [...currentProgress];

      await bottomMove(durationZero);
      await mobileMove(durationZero);
      await topMove(durationZero);
    })();

    change(gradMustang, gradDBA, article, durationZero);
  }
  
  document.addEventListener("scroll", function(event) {

    if (currentPos() == dbaSection() && firstEnterDBA == true) {

      let pr = new Promise((res, rej) => {
        stopMove = true;
        setTimeout(() => {
          res();
        }, 0)
      });
      pr.then(() => {
        stopMove = false;

        finalDestinationBottom = 0;
        finalDestinationTop = (-1)*distance;
        finalTopArray = [...initTop];
        startTopArray = [...currentProgress];

        (async function() {
          change(currentGrad, gradDBA, article, durationTimeBG);
          await bottomMove(durationSetAdditional);
          await mobileMove(durationTime);
          await topMove(durationSetAdditional);
        })();
      });
      
      firstEnterDBA = false;
      firstEnterMustang = true;

    } else if (currentPos() == mustangSection() && firstEnterMustang == true) {
      let pr1 = new Promise((res, rej) => {
        stopMove = true;
        setTimeout(() => {
          res();
        }, 0)
      });
      pr1.then(() => {
        stopMove = false;

        finalDestinationTop = 0;
        startTopArray = [...currentProgress];
        finalTopArray = [...finalTop];
        finalDestinationBottom = distance;

        (async function() {
          change(currentGrad, gradMustang, article, durationTimeBG);
          await topMove(durationSetAdditional);
          await mobileMove(durationTime);
          await bottomMove(durationSetAdditional);
        })();
      });

      firstEnterMustang = false;
      firstEnterDBA = true;
    }
  });

});