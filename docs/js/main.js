let scrollElems=document.getElementsByClassName("scrollPage"),article=document.querySelector(".article"),durationTime=[400,600,800],indexOfSlowest=durationTime.indexOf(Math.max(...durationTime)),durationSetAdditional=[250,250,250],durationTimeBG=[];for(let i=0;i<durationTime.length;i++)durationTimeBG[i]=durationTime[i]+2*durationSetAdditional[i];let currentProgress,finalDestinationBottom,finalDestinationTop,durationZero=[0,0,0],pow=2,gradDBA={color:[[231,78,44],[254,156,100]]},gradMustang={color:[[85,75,161],[105,199,237]]},grad={},compareGrad={},currentGrad={color:[[],[]]},slidePhones=document.getElementsByClassName("col-slide"),initTop=[],finalTop=[],phoneHeight=.6*window.innerHeight,cecilElems=[document.getElementsByClassName("colLeftCecil"),document.getElementsByClassName("colCenterCecil"),document.getElementsByClassName("colRightCecil")],dbaElems=[document.getElementsByClassName("colLeftDBA"),document.getElementsByClassName("colCenterDBA"),document.getElementsByClassName("colRightDBA")],distance=window.innerHeight,currentTopCecil=[],newTopCecil=[],currentTopDBA=[],newTopDBA=[],stopMove=!1;function animate({timing,draw,duration}){let start=performance.now();requestAnimationFrame(function animate(time){let timeFraction=(time-start)/duration;timeFraction>1&&(timeFraction=1);let progress=timing(timeFraction);draw(progress),timeFraction<1&&!stopMove&&requestAnimationFrame(animate)})}function change(paramGrad1,paramGrad2,element,timeDurationSet){(grad={...paramGrad1}).color=[...paramGrad1.color],compareGrad.color=[...paramGrad2.color],compareGrad={...paramGrad2};for(let j=0;j<grad.color.length;j++)grad.color[j]=[...paramGrad1.color[j]],compareGrad.color[j]=[...paramGrad2.color[j]];bgColor(element,timeDurationSet)}function bgColor(elem,setDuration){return animate({duration:Math.max(...setDuration),timing:function(timeFraction){return timeFraction},draw:function(progress){for(let i=0;i<2;i++)for(let j=0;j<3;j++)currentGrad.color[i][j]=grad.color[i][j]+(compareGrad.color[i][j]-grad.color[i][j])*progress;elem.style.backgroundImage="linear-gradient(117deg, rgb("+currentGrad.color[0]+"), rgb("+currentGrad.color[1]+"))"}})}function currentPos(){for(let i=0;i<scrollElems.length;i++)if(window.scrollY+window.innerHeight/2>=scrollElems[i].offsetTop&&window.scrollY+window.innerHeight/2<scrollElems[i].offsetTop+scrollElems[i].clientHeight)return i}function currentPosStrict(){for(let i=0;i<scrollElems.length;i++)if(window.scrollY>=scrollElems[i].offsetTop&&window.scrollY<scrollElems[i].offsetTop+scrollElems[i].clientHeight)return i}function dbaSection(){for(let i=0;i<scrollElems.length;i++)if("dbafitness"==scrollElems[i].id)return i}function mustangSection(){for(let i=0;i<scrollElems.length;i++)if("mustangchain"==scrollElems[i].id)return i}function mobileMove(durationSet){return new Promise((res,rej)=>{for(let index=0;index<slidePhones.length;index++)animate({duration:durationSet[index],timing:function(timeFraction){return Math.pow(timeFraction,pow)},draw:function(progress){slidePhones[index].style.transform="translateY("+(progress*finalTopArray[index]+(1-progress)*startTopArray[index])+"px)",currentProgress[index]=progress*finalTopArray[index]+(1-progress)*startTopArray[index],1==progress&&index==indexOfSlowest&&(console.log("resolved"),res())}})})}function topMove(durationSet){return new Promise((res,rej)=>{for(let index=0;index<slidePhones.length;index++)newTopCecil[index]||(newTopCecil[index]=0),currentTopCecil[index]=newTopCecil[index],finalDestinationTop=finalDestinationTop==-1*distance?-1*distance:0,animate({duration:durationSet[index],timing:function(timeFraction){return Math.pow(timeFraction,pow)},draw:function(progress){for(let i=0;i<cecilElems[index].length;i++)cecilElems[index][i].style.transform="translateY("+((1-progress)*currentTopCecil[index]+progress*finalDestinationTop)+"px)";newTopCecil[index]=(1-progress)*currentTopCecil[index]+progress*finalDestinationTop,1==progress&&index==indexOfSlowest&&res()}})})}function bottomMove(durationSet){return new Promise((res,rej)=>{for(let index=0;index<slidePhones.length;index++)newTopDBA[index]||(newTopDBA[index]=0),currentTopDBA[index]=newTopDBA[index],finalDestinationBottom=finalDestinationBottom==distance?distance:0,animate({duration:durationSet[index],timing:function(timeFraction){return Math.pow(timeFraction,pow)},draw:function(progress){for(let i=0;i<dbaElems[index].length;i++)dbaElems[index][i].style.transform="translateY("+((1-progress)*currentTopDBA[index]+progress*finalDestinationBottom)+"px)";newTopDBA[index]=(1-progress)*currentTopDBA[index]+progress*finalDestinationBottom,1==progress&&index==indexOfSlowest&&res()}})})}window.addEventListener("load",function(){let shiftTop=[0,.22*window.innerHeight,.02*window.innerHeight],shiftBottom=[.4*window.innerHeight,.22*window.innerHeight,2*phoneHeight];for(let i=0;i<slidePhones.length;i++)initTop[i]=slidePhones[i].offsetTop+shiftTop[i];for(let i=0;i<slidePhones.length;i++)finalTop[i]=initTop[i]+5.3*phoneHeight-shiftTop[i]-shiftBottom[i];currentPos()>dbaSection()?(firstEnterMustang=!1,firstEnterDBA=!0,newTopDBA=[0,0,0],finalDestinationBottom=distance,newTopCecil=[-1*distance,-1*distance,-1*distance],finalDestinationTop=0,currentProgress=[...initTop],finalTopArray=[...finalTop],startTopArray=[...currentProgress],async function(){change(gradDBA,gradMustang,article,durationZero),await topMove(durationZero),await mobileMove(durationZero),await bottomMove(durationZero)}()):(firstEnterDBA=!1,firstEnterMustang=!0,newTopDBA=[distance,distance,distance],finalDestinationBottom=0,newTopCecil=[0,0,0],finalDestinationTop=-1*distance,currentProgress=[...finalTop],finalTopArray=[...initTop],startTopArray=[...currentProgress],async function(){change(gradMustang,gradDBA,article,durationZero),await bottomMove(durationZero),await mobileMove(durationZero),await topMove(durationZero)}()),document.addEventListener("scroll",function(event){if(currentPos()==dbaSection()&&1==firstEnterDBA){new Promise((res,rej)=>{stopMove=!0,setTimeout(()=>{res()},0)}).then(()=>{stopMove=!1,finalDestinationBottom=0,finalDestinationTop=-1*distance,finalTopArray=[...initTop],startTopArray=[...currentProgress],async function(){change(currentGrad,gradDBA,article,durationTimeBG),await bottomMove(durationSetAdditional),await mobileMove(durationTime),await topMove(durationSetAdditional)}()}),firstEnterDBA=!1,firstEnterMustang=!0}else if(currentPos()==mustangSection()&&1==firstEnterMustang){new Promise((res,rej)=>{stopMove=!0,setTimeout(()=>{res()},0)}).then(()=>{stopMove=!1,finalDestinationTop=0,startTopArray=[...currentProgress],finalTopArray=[...finalTop],finalDestinationBottom=distance,async function(){change(currentGrad,gradMustang,article,durationTimeBG),await topMove(durationSetAdditional),await mobileMove(durationTime),await bottomMove(durationSetAdditional)}()}),firstEnterMustang=!1,firstEnterDBA=!0}})});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFZhcmlhYmxlc1xyXG5sZXQgc2Nyb2xsRWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzY3JvbGxQYWdlJyk7XHJcbmxldCBhcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFydGljbGUnKTtcclxubGV0IGR1cmF0aW9uVGltZSA9IFs0MDAsIDYwMCwgODAwXTsgLy90aW1lIG9mIGFuaW1hdGlvbiBkdXJhdGlvbiBmb3IgbW9iaWxlXHJcbmxldCBpbmRleE9mU2xvd2VzdCA9IGR1cmF0aW9uVGltZS5pbmRleE9mKE1hdGgubWF4KC4uLmR1cmF0aW9uVGltZSkpO1xyXG5sZXQgZHVyYXRpb25TZXRBZGRpdGlvbmFsID0gWzI1MCwgMjUwLCAyNTBdOyAvL3RpbWUgb2YgYW5pbWF0aW9uIG9mIGFkZGl0aW9uYWwgc3RlcHMgb2Ygc3BsaXR0aW5nIGFuZCBkcmFnZ2luZyBtb2JpbGUgcGhvbmVzXHJcbmxldCBkdXJhdGlvblRpbWVCRyA9IFtdOyAvL3RpbWUgb2YgYW5pbWF0aW9uIGZvciBiZ0NvbG9yIGNoYW5nZTtcclxuZm9yIChsZXQgaSA9IDA7IGkgPCBkdXJhdGlvblRpbWUubGVuZ3RoOyBpKyspIHtcclxuICBkdXJhdGlvblRpbWVCR1tpXSA9IGR1cmF0aW9uVGltZVtpXSArIGR1cmF0aW9uU2V0QWRkaXRpb25hbFtpXSoyO1xyXG59XHJcblxyXG5sZXQgZHVyYXRpb25aZXJvID0gWzAsIDAsIDBdO1xyXG5sZXQgcG93ID0gMjsgLy9wb3dlciBvZiB0aW1pbmcgZnVuY3Rpb25cclxubGV0IGdyYWREQkEgPSB7XHJcbiAgY29sb3I6IFtbMjMxLDc4LDQ0XSwgWzI1NCwxNTYsMTAwXV0sXHJcbn1cclxubGV0IGdyYWRNdXN0YW5nID0ge1xyXG4gIGNvbG9yOiBbWzg1LDc1LDE2MV0sIFsxMDUsMTk5LDIzN11dLFxyXG59XHJcbmxldCBncmFkID0ge307XHJcbmxldCBjb21wYXJlR3JhZCA9IHt9O1xyXG5sZXQgY3VycmVudEdyYWQgPSB7XHJcbiAgY29sb3I6IFtbXSxbXV0sXHJcbn07XHJcbmxldCBjdXJyZW50UHJvZ3Jlc3M7XHJcbmxldCBzbGlkZVBob25lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbC1zbGlkZScpOyAvL2FuaW1hdGVkIHBob25lcyBjb2x1bW5zXHJcbmxldCBpbml0VG9wID0gW107IC8vYXJyYXkgb2YgaW5pdGlhbCB0b3AgdmFsdWVzIG9mIGNvbHVtbnNcclxubGV0IGZpbmFsVG9wID0gW107IC8vYXJyYXkgb2YgZmluYWwgdG9wIHZhbHVlcyBvZiBjb2x1bW5zXHJcbmxldCBwaG9uZUhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCowLjY7XHJcbmxldCBjZWNpbEVsZW1zID0gW2RvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbExlZnRDZWNpbCcpLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb2xDZW50ZXJDZWNpbCcpLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb2xSaWdodENlY2lsJyldO1xyXG5sZXQgZGJhRWxlbXMgPSBbZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29sTGVmdERCQScpLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb2xDZW50ZXJEQkEnKSwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29sUmlnaHREQkEnKV07XHJcbmxldCBkaXN0YW5jZSA9IHdpbmRvdy5pbm5lckhlaWdodDsgLy9kaXN0YW5jZSBiZXR3ZWVuIHZpc2libGUgYW5kIGludmlzaWJsZSBtb2JpbGUgcGhvbmVzXHJcbmxldCBjdXJyZW50VG9wQ2VjaWwgPSBbXTtcclxubGV0IG5ld1RvcENlY2lsID0gW107XHJcbmxldCBjdXJyZW50VG9wREJBID0gW107XHJcbmxldCBuZXdUb3BEQkEgPSBbXTtcclxubGV0IGZpbmFsRGVzdGluYXRpb25Cb3R0b207XHJcbmxldCBmaW5hbERlc3RpbmF0aW9uVG9wO1xyXG5sZXQgc3RvcE1vdmUgPSBmYWxzZTtcclxuXHJcbi8vcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGZ1bmN0aW9uXHJcbmZ1bmN0aW9uIGFuaW1hdGUoe3RpbWluZywgZHJhdywgZHVyYXRpb259KSB7XHJcbiAgbGV0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uIGFuaW1hdGUodGltZSkge1xyXG4gICAgLy8gdGltZUZyYWN0aW9uINC40LfQvNC10L3Rj9C10YLRgdGPINC+0YIgMCDQtNC+IDFcclxuICAgIGxldCB0aW1lRnJhY3Rpb24gPSAodGltZSAtIHN0YXJ0KSAvIChkdXJhdGlvbik7XHJcbiAgICBpZiAodGltZUZyYWN0aW9uID4gMSkgdGltZUZyYWN0aW9uID0gMTtcclxuICAgIC8vINCy0YvRh9C40YHQu9C10L3QuNC1INGC0LXQutGD0YnQtdCz0L4g0YHQvtGB0YLQvtGP0L3QuNGPINCw0L3QuNC80LDRhtC40LhcclxuICAgIGxldCBwcm9ncmVzcyA9IHRpbWluZyh0aW1lRnJhY3Rpb24pO1xyXG4gICAgZHJhdyhwcm9ncmVzcyk7IC8vINC+0YLRgNC40YHQvtCy0LDRgtGMINC10ZFcclxuICAgIGlmICh0aW1lRnJhY3Rpb24gPCAxICYmICFzdG9wTW92ZSkge1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vYmcgYW5pbWF0aW9uXHJcbmZ1bmN0aW9uIGNoYW5nZShwYXJhbUdyYWQxLCBwYXJhbUdyYWQyLCBlbGVtZW50LCB0aW1lRHVyYXRpb25TZXQpIHtcclxuICBncmFkID0gey4uLnBhcmFtR3JhZDF9O1xyXG4gIGdyYWQuY29sb3IgPSBbLi4ucGFyYW1HcmFkMS5jb2xvcl07XHJcbiAgY29tcGFyZUdyYWQuY29sb3IgPSBbLi4ucGFyYW1HcmFkMi5jb2xvcl07XHJcbiAgY29tcGFyZUdyYWQgPSB7Li4ucGFyYW1HcmFkMn07XHJcblxyXG4gIGZvciAobGV0IGogPSAwOyBqIDwgZ3JhZC5jb2xvci5sZW5ndGg7IGorKykge1xyXG4gICAgZ3JhZC5jb2xvcltqXSA9IFsuLi5wYXJhbUdyYWQxLmNvbG9yW2pdXTtcclxuICAgIGNvbXBhcmVHcmFkLmNvbG9yW2pdID0gWy4uLnBhcmFtR3JhZDIuY29sb3Jbal1dO1xyXG4gIH1cclxuICBcclxuICBiZ0NvbG9yKGVsZW1lbnQsIHRpbWVEdXJhdGlvblNldCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJnQ29sb3IoZWxlbSwgc2V0RHVyYXRpb24pIHtcclxuICByZXR1cm4gYW5pbWF0ZSh7XHJcbiAgICBkdXJhdGlvbjogTWF0aC5tYXgoLi4uc2V0RHVyYXRpb24pLFxyXG4gICAgdGltaW5nOiBmdW5jdGlvbiAodGltZUZyYWN0aW9uKSB7XHJcbiAgICAgIHJldHVybiB0aW1lRnJhY3Rpb247XHJcbiAgICB9LFxyXG4gICAgZHJhdzogZnVuY3Rpb24ocHJvZ3Jlc3MpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKykge1xyXG4gICAgICAgICAgY3VycmVudEdyYWQuY29sb3JbaV1bal0gPSAoZ3JhZC5jb2xvcltpXVtqXSArIChjb21wYXJlR3JhZC5jb2xvcltpXVtqXS1ncmFkLmNvbG9yW2ldW2pdKSAqIHByb2dyZXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gKCdsaW5lYXItZ3JhZGllbnQoMTE3ZGVnLCByZ2IoJytjdXJyZW50R3JhZC5jb2xvclswXSsnKSwgcmdiKCcrY3VycmVudEdyYWQuY29sb3JbMV0rJykpJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGN1cnJlbnRQb3MoKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JvbGxFbGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKCh3aW5kb3cuc2Nyb2xsWSArIHdpbmRvdy5pbm5lckhlaWdodC8yKSA+PSBzY3JvbGxFbGVtc1tpXS5vZmZzZXRUb3AgJiYgKHdpbmRvdy5zY3JvbGxZICsgd2luZG93LmlubmVySGVpZ2h0LzIpIDwgc2Nyb2xsRWxlbXNbaV0ub2Zmc2V0VG9wICsgc2Nyb2xsRWxlbXNbaV0uY2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgIHJldHVybiBpO1xyXG4gICAgfSAgXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjdXJyZW50UG9zU3RyaWN0KCkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2Nyb2xsRWxlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmICgod2luZG93LnNjcm9sbFkpID49IHNjcm9sbEVsZW1zW2ldLm9mZnNldFRvcCAmJiAod2luZG93LnNjcm9sbFkpIDwgc2Nyb2xsRWxlbXNbaV0ub2Zmc2V0VG9wICsgc2Nyb2xsRWxlbXNbaV0uY2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgIHJldHVybiBpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGJhU2VjdGlvbigpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcm9sbEVsZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoc2Nyb2xsRWxlbXNbaV0uaWQgPT0gXCJkYmFmaXRuZXNzXCIpIHtcclxuICAgICAgcmV0dXJuIGk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtdXN0YW5nU2VjdGlvbigpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcm9sbEVsZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoc2Nyb2xsRWxlbXNbaV0uaWQgPT0gXCJtdXN0YW5nY2hhaW5cIikge1xyXG4gICAgICByZXR1cm4gaTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuLy9mb3IgcGhvbmVzIGFuaW1hdGlvblxyXG5mdW5jdGlvbiBtb2JpbGVNb3ZlKGR1cmF0aW9uU2V0KSB7IFxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzbGlkZVBob25lcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgYW5pbWF0ZSh7XHJcbiAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uU2V0W2luZGV4XSxcclxuICAgICAgICB0aW1pbmc6IGZ1bmN0aW9uICh0aW1lRnJhY3Rpb24pIHtcclxuICAgICAgICAgIHJldHVybiBNYXRoLnBvdyh0aW1lRnJhY3Rpb24sIHBvdyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkcmF3OiBmdW5jdGlvbihwcm9ncmVzcykge1xyXG4gICAgICAgICAgICBzbGlkZVBob25lc1tpbmRleF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoJysoKChwcm9ncmVzcyAqIGZpbmFsVG9wQXJyYXlbaW5kZXhdKSArICgoMS1wcm9ncmVzcykqc3RhcnRUb3BBcnJheVtpbmRleF0pKSkrJ3B4KSc7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm9ncmVzc1tpbmRleF0gPSAocHJvZ3Jlc3MgKiBmaW5hbFRvcEFycmF5W2luZGV4XSkgKyAoKDEtcHJvZ3Jlc3MpKnN0YXJ0VG9wQXJyYXlbaW5kZXhdKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgaWYgKHByb2dyZXNzID09IDEgJiYgaW5kZXggPT0gaW5kZXhPZlNsb3dlc3QpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc29sdmVkJylcclxuICAgICAgICAgICAgcmVzKCk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gdG9wTW92ZShkdXJhdGlvblNldCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzbGlkZVBob25lcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKCFuZXdUb3BDZWNpbFtpbmRleF0pIHtcclxuICAgICAgICBuZXdUb3BDZWNpbFtpbmRleF0gPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIGN1cnJlbnRUb3BDZWNpbFtpbmRleF0gPSBuZXdUb3BDZWNpbFtpbmRleF07XHJcbiAgICAgIGlmIChmaW5hbERlc3RpbmF0aW9uVG9wID09IGRpc3RhbmNlKigtMSkpIHtcclxuICAgICAgICBmaW5hbERlc3RpbmF0aW9uVG9wID0gZGlzdGFuY2UqKC0xKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZpbmFsRGVzdGluYXRpb25Ub3AgPSAwXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFuaW1hdGUoe1xyXG4gICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblNldFtpbmRleF0sXHJcbiAgICAgICAgdGltaW5nOiBmdW5jdGlvbiAodGltZUZyYWN0aW9uKSB7XHJcbiAgICAgICAgICByZXR1cm4gTWF0aC5wb3codGltZUZyYWN0aW9uLCBwb3cpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkcmF3OiBmdW5jdGlvbihwcm9ncmVzcykge1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjZWNpbEVsZW1zW2luZGV4XS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjZWNpbEVsZW1zW2luZGV4XVtpXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgnKygoMS1wcm9ncmVzcykqY3VycmVudFRvcENlY2lsW2luZGV4XSArIHByb2dyZXNzKihmaW5hbERlc3RpbmF0aW9uVG9wKSkrJ3B4KSc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBuZXdUb3BDZWNpbFtpbmRleF0gPSAoMS1wcm9ncmVzcykqY3VycmVudFRvcENlY2lsW2luZGV4XSArIHByb2dyZXNzKihmaW5hbERlc3RpbmF0aW9uVG9wKTtcclxuICAgIFxyXG4gICAgICAgICAgaWYgKHByb2dyZXNzID09IDEgJiYgaW5kZXggPT0gaW5kZXhPZlNsb3dlc3QpIHtcclxuICAgICAgICAgICAgcmVzKCk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gYm90dG9tTW92ZShkdXJhdGlvblNldCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzbGlkZVBob25lcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKCFuZXdUb3BEQkFbaW5kZXhdKSB7XHJcbiAgICAgICAgbmV3VG9wREJBW2luZGV4XSA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgY3VycmVudFRvcERCQVtpbmRleF0gPSBuZXdUb3BEQkFbaW5kZXhdO1xyXG4gICAgICBpZiAoZmluYWxEZXN0aW5hdGlvbkJvdHRvbSA9PSBkaXN0YW5jZSkge1xyXG4gICAgICAgIGZpbmFsRGVzdGluYXRpb25Cb3R0b20gPSBkaXN0YW5jZVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZpbmFsRGVzdGluYXRpb25Cb3R0b20gPSAwXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFuaW1hdGUoe1xyXG4gICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblNldFtpbmRleF0sXHJcbiAgICAgICAgdGltaW5nOiBmdW5jdGlvbiAodGltZUZyYWN0aW9uKSB7XHJcbiAgICAgICAgICByZXR1cm4gTWF0aC5wb3codGltZUZyYWN0aW9uLCBwb3cpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkcmF3OiBmdW5jdGlvbihwcm9ncmVzcykge1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYmFFbGVtc1tpbmRleF0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZGJhRWxlbXNbaW5kZXhdW2ldLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKCcrKCgxLXByb2dyZXNzKSpjdXJyZW50VG9wREJBW2luZGV4XSArIHByb2dyZXNzKihmaW5hbERlc3RpbmF0aW9uQm90dG9tKSkrJ3B4KSc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBuZXdUb3BEQkFbaW5kZXhdID0gKDEtcHJvZ3Jlc3MpKmN1cnJlbnRUb3BEQkFbaW5kZXhdICsgcHJvZ3Jlc3MqKGZpbmFsRGVzdGluYXRpb25Cb3R0b20pO1xyXG5cclxuICAgICAgICAgIGlmIChwcm9ncmVzcyA9PSAxICYmIGluZGV4ID09IGluZGV4T2ZTbG93ZXN0KSB7XHJcbiAgICAgICAgICAgIHJlcygpO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuLy9lbmRcclxuXHJcbi8vZXhlY3V0aW5nXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbigpe1xyXG4gIGxldCBzaGlmdFRvcCA9IFswLCB3aW5kb3cuaW5uZXJIZWlnaHQqMC4yMiwgd2luZG93LmlubmVySGVpZ2h0KjAuMDJdO1xyXG4gIGxldCBzaGlmdEJvdHRvbSA9IFt3aW5kb3cuaW5uZXJIZWlnaHQqMC40LCB3aW5kb3cuaW5uZXJIZWlnaHQqMC4yMiwgcGhvbmVIZWlnaHQqMl1cclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZVBob25lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgaW5pdFRvcFtpXSA9IHNsaWRlUGhvbmVzW2ldLm9mZnNldFRvcCArIHNoaWZ0VG9wW2ldO1xyXG4gIH1cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlUGhvbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBmaW5hbFRvcFtpXSA9IChpbml0VG9wW2ldICsgNS4zKnBob25lSGVpZ2h0IC0gc2hpZnRUb3BbaV0gLSBzaGlmdEJvdHRvbVtpXSk7XHJcbiAgfVxyXG5cclxuICBpZiAoY3VycmVudFBvcygpID4gZGJhU2VjdGlvbigpKSB7XHJcbiAgICBmaXJzdEVudGVyTXVzdGFuZyA9IGZhbHNlO1xyXG4gICAgZmlyc3RFbnRlckRCQSA9IHRydWU7XHJcbiAgICBuZXdUb3BEQkEgPSBbMCwgMCwgMF07XHJcbiAgICBmaW5hbERlc3RpbmF0aW9uQm90dG9tID0gZGlzdGFuY2U7XHJcbiAgICBuZXdUb3BDZWNpbCA9IFsoLTEpKmRpc3RhbmNlLCAoLTEpKmRpc3RhbmNlLCAoLTEpKmRpc3RhbmNlXTtcclxuICAgIGZpbmFsRGVzdGluYXRpb25Ub3AgPSAwO1xyXG4gICAgY3VycmVudFByb2dyZXNzID0gWy4uLmluaXRUb3BdO1xyXG4gICAgZmluYWxUb3BBcnJheSA9IFsuLi5maW5hbFRvcF07XHJcbiAgICBzdGFydFRvcEFycmF5ID0gWy4uLmN1cnJlbnRQcm9ncmVzc107XHJcbiAgICBcclxuICAgIChhc3luYyBmdW5jdGlvbigpIHtcclxuICAgICAgY2hhbmdlKGdyYWREQkEsIGdyYWRNdXN0YW5nLCBhcnRpY2xlLCBkdXJhdGlvblplcm8pO1xyXG4gICAgICBhd2FpdCB0b3BNb3ZlKGR1cmF0aW9uWmVybyk7XHJcbiAgICAgIGF3YWl0IG1vYmlsZU1vdmUoZHVyYXRpb25aZXJvKTtcclxuICAgICAgYXdhaXQgYm90dG9tTW92ZShkdXJhdGlvblplcm8pO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBcclxuICB9IGVsc2Uge1xyXG4gICAgZmlyc3RFbnRlckRCQSA9IGZhbHNlO1xyXG4gICAgZmlyc3RFbnRlck11c3RhbmcgPSB0cnVlO1xyXG4gICAgbmV3VG9wREJBID0gW2Rpc3RhbmNlLCBkaXN0YW5jZSwgZGlzdGFuY2VdO1xyXG4gICAgZmluYWxEZXN0aW5hdGlvbkJvdHRvbSA9IDA7XHJcbiAgICBuZXdUb3BDZWNpbCA9IFswLCAwLCAwXTtcclxuICAgIGZpbmFsRGVzdGluYXRpb25Ub3AgPSAoLTEpKmRpc3RhbmNlO1xyXG4gICAgY3VycmVudFByb2dyZXNzID0gWy4uLmZpbmFsVG9wXTtcclxuICAgIGZpbmFsVG9wQXJyYXkgPSBbLi4uaW5pdFRvcF07XHJcbiAgICBzdGFydFRvcEFycmF5ID0gWy4uLmN1cnJlbnRQcm9ncmVzc107XHJcblxyXG4gICAgKGFzeW5jIGZ1bmN0aW9uKCkge1xyXG4gICAgICBjaGFuZ2UoZ3JhZE11c3RhbmcsIGdyYWREQkEsIGFydGljbGUsIGR1cmF0aW9uWmVybyk7XHJcbiAgICAgIGF3YWl0IGJvdHRvbU1vdmUoZHVyYXRpb25aZXJvKTtcclxuICAgICAgYXdhaXQgbW9iaWxlTW92ZShkdXJhdGlvblplcm8pO1xyXG4gICAgICBhd2FpdCB0b3BNb3ZlKGR1cmF0aW9uWmVybyk7XHJcbiAgICB9KSgpO1xyXG4gIH1cclxuICBcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgaWYgKGN1cnJlbnRQb3MoKSA9PSBkYmFTZWN0aW9uKCkgJiYgZmlyc3RFbnRlckRCQSA9PSB0cnVlKSB7XHJcbiAgICAgIGxldCBwcm9taXNlREJBID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgICAgc3RvcE1vdmUgPSB0cnVlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgcmVzKCk7XHJcbiAgICAgICAgfSwgMClcclxuICAgICAgfSk7XHJcbiAgICAgIHByb21pc2VEQkEudGhlbigoKSA9PiB7XHJcbiAgICAgICAgc3RvcE1vdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZmluYWxEZXN0aW5hdGlvbkJvdHRvbSA9IDA7XHJcbiAgICAgICAgZmluYWxEZXN0aW5hdGlvblRvcCA9ICgtMSkqZGlzdGFuY2U7XHJcbiAgICAgICAgZmluYWxUb3BBcnJheSA9IFsuLi5pbml0VG9wXTtcclxuICAgICAgICBzdGFydFRvcEFycmF5ID0gWy4uLmN1cnJlbnRQcm9ncmVzc107XHJcblxyXG4gICAgICAgIChhc3luYyBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGNoYW5nZShjdXJyZW50R3JhZCwgZ3JhZERCQSwgYXJ0aWNsZSwgZHVyYXRpb25UaW1lQkcpO1xyXG4gICAgICAgICAgYXdhaXQgYm90dG9tTW92ZShkdXJhdGlvblNldEFkZGl0aW9uYWwpO1xyXG4gICAgICAgICAgYXdhaXQgbW9iaWxlTW92ZShkdXJhdGlvblRpbWUpO1xyXG4gICAgICAgICAgYXdhaXQgdG9wTW92ZShkdXJhdGlvblNldEFkZGl0aW9uYWwpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgZmlyc3RFbnRlckRCQSA9IGZhbHNlO1xyXG4gICAgICBmaXJzdEVudGVyTXVzdGFuZyA9IHRydWU7XHJcblxyXG4gICAgfSBlbHNlIGlmIChjdXJyZW50UG9zKCkgPT0gbXVzdGFuZ1NlY3Rpb24oKSAmJiBmaXJzdEVudGVyTXVzdGFuZyA9PSB0cnVlKSB7XHJcbiAgICAgIGxldCBwcm9taXNlTXVzdGFuZyA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xyXG4gICAgICAgIHN0b3BNb3ZlID0gdHJ1ZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHJlcygpO1xyXG4gICAgICAgIH0sIDApXHJcbiAgICAgIH0pO1xyXG4gICAgICBwcm9taXNlTXVzdGFuZy50aGVuKCgpID0+IHtcclxuICAgICAgICBzdG9wTW92ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBmaW5hbERlc3RpbmF0aW9uVG9wID0gMDtcclxuICAgICAgICBzdGFydFRvcEFycmF5ID0gWy4uLmN1cnJlbnRQcm9ncmVzc107XHJcbiAgICAgICAgZmluYWxUb3BBcnJheSA9IFsuLi5maW5hbFRvcF07XHJcbiAgICAgICAgZmluYWxEZXN0aW5hdGlvbkJvdHRvbSA9IGRpc3RhbmNlO1xyXG5cclxuICAgICAgICAoYXN5bmMgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBjaGFuZ2UoY3VycmVudEdyYWQsIGdyYWRNdXN0YW5nLCBhcnRpY2xlLCBkdXJhdGlvblRpbWVCRyk7XHJcbiAgICAgICAgICBhd2FpdCB0b3BNb3ZlKGR1cmF0aW9uU2V0QWRkaXRpb25hbCk7XHJcbiAgICAgICAgICBhd2FpdCBtb2JpbGVNb3ZlKGR1cmF0aW9uVGltZSk7XHJcbiAgICAgICAgICBhd2FpdCBib3R0b21Nb3ZlKGR1cmF0aW9uU2V0QWRkaXRpb25hbCk7XHJcbiAgICAgICAgfSkoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBmaXJzdEVudGVyTXVzdGFuZyA9IGZhbHNlO1xyXG4gICAgICBmaXJzdEVudGVyREJBID0gdHJ1ZTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbn0pOyJdLCJmaWxlIjoibWFpbi5qcyJ9
