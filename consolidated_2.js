//Java_Script Repo:
//###########################################################################################################---------TextScroll
const texte = document.querySelector("#texte");
const textContent = texte.innerText;
const scrollContainer = document.querySelector(".scroll-container");
texte.innerText = "";
window.addEventListener("scroll", (e) => {
  let scrollValue = Math.abs(scrollContainer.getBoundingClientRect().top);
  texte.innerText = textContent.slice(0, scrollValue / 50);
})
//###########################################################################################################---------Birds Random
 var bird = document.getElementById('birds');
//---------------------------------Random
//Taken from :https://stackoverflow.com/questions/2450954/
//		      how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,
      randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }

  return array;
}
//---------------------------------Bilder
for (let i = 0; i < 30; i++) {
  var dumi = document.createElement("div");
  dumi.classList.add('cuadrados');
  document.getElementById('check_list').appendChild(dumi);
}
var cuadrados = document.getElementsByClassName('cuadrados');
function mouseEnter(a, c) {
  a.style.backgroundColor = "black";
  bird.style.backgroundImage = url(img/pajaros_" + c + ".jpg)";
  bird.style.backgroundSize = "cover";
}
function mouseLeave(b, d) {
  if (d > 15) {
    b.style.backgroundColor = "rgba(" + 0 + "," + 0 + "," + 0 + "," + 0.2 + ")";
  }
  bird.style.backgroundImage = "";
}

var randomValue = Array(30).fill().map((element, index) => index)
console.log(randomValue);
randomValue = shuffle(randomValue);
console.log(randomValue);

for (let i = 0; i < cuadrados.length; i++) {
  cuadrados[i].addEventListener("mouseenter",
    function() {
      mouseEnter(cuadrados[i], randomValue[i]);
    }, false);

  cuadrados[i].addEventListener("mouseleave",
    function() {
      mouseLeave(cuadrados[i], randomValue[i]);
    }, false);
}

//###########################################################################################################---------P5 Chess
var allocate1 = window.document.getElementById('section_chess');
let checkerP5 = function(p5e) {
  var tileCountX = 50;
  var tileCountY = 20;
  var hueValues = [];
  var saturationValues = [];
  var brightnessValues = [];
  //----------------------------------------------Set Up for p5 Element
  p5e.setup = function() {
    //p5e.createCanvas(p5e.windowWidth, p5e.windowHeight); //Indirect Constructor of Element p5
    // allocate1.style.width = "600px"
    // console.log(allocate1.offsetWidth);
    // console.log(allocate1.style.width);
    bord = getComputedStyle(allocate1, null).getPropertyValue('border');
    bord = parseFloat(bord.substring(0, bord.search("px")));
    wiwi = getComputedStyle(allocate1, null).getPropertyValue('width');
    wiwi = parseFloat(wiwi.substring(0, wiwi.search("px")));
    heihei = getComputedStyle(allocate1, null).getPropertyValue('height');
    heihei = parseFloat(heihei.substring(0, heihei.search("px")));
    p5e.createCanvas(wiwi - bord, heihei - bord);
    p5e.colorMode(p5e.HSB, 360, 100, 100, 100); //Changes in p5 the interp. of color
    //HSB system 'hue, saturation, brightness'
    //arguments are max values for ranges
    p5e.noStroke();
    // init with random values
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = 0; //org. random(360) - 0 random values for colors
      saturationValues[i] = 0; //org. random(100) - 0
      brightnessValues[i] = p5e.random(100);
    }
  }
  //-------------------------------------------Draw for p5 Element
  p5e.draw = function() {
    // white back
    p5e.background(0, 0, 100);
    // limit mouse coordinates to canvas
    var mX = p5e.constrain(p5e.mouseX, 0, p5e.width);
    var mY = p5e.constrain(p5e.mouseY, 0, p5e.height); // tile counter
    var counter = 0;
    // map mouse to grid resolution
    var currentTileCountX = p5e.int(p5e.map(mX, 0, p5e.width, 1, tileCountX));
    var currentTileCountY = p5e.int(p5e.map(mY, 0, p5e.height, 1, tileCountY));
    var tileWidth = p5e.width / currentTileCountX;
    var tileHeight = p5e.height / currentTileCountY;
    for (var gridY = 0; gridY < tileCountY; gridY++) {
      for (var gridX = 0; gridX < tileCountX; gridX++) {
        var posX = tileWidth * gridX;
        var posY = tileHeight * gridY;
        var indec = counter % currentTileCountX;
        // get component color values
        p5e.fill(hueValues[indec], saturationValues[indec], brightnessValues[indec]);
        p5e.rect(posX, posY, tileWidth, tileHeight);
        counter++;
      } // End of for sweeping X
    } // End of for sweeping Y
    //-----------------------------------------Uncomment for alternating patterns
    // for (var i = 0; i < tileCountX; i++) {
    //   pause(500)
    //   brightnessValues[i] = p5e.random(100);
    // }
  } // End of Draw Function
};
new p5(checkerP5, allocate1);
//###########################################################################################################--------Video
 var oneTimeVideo = false;
 const videoIntro = document.querySelector('.video');
window.addEventListener("scroll", function() {
		let refHeight = window.innerHeight;
    let refWidth = window.innerWidth;
    var scroll = this.scrollY;
    
    //if(refWidth < 560){
    	//	refHeight = refHeight / 2;
    //}
    
    if (scroll > refHeight*1.9 && oneTimeVideo == false) {
         console.log(refHeight);
         //console.log(refWidth);
         videoIntro.play(); 
         oneTimeVideo = true;
    }
})
//############################Audio Transfer Complet

//############################Audio Hello
var oneTimeHello = false;
const bottonHello = document.getElementById('check_hello');
var elementHello = document.getElementById('audioHello')
window.addEventListener("scroll", function() {
    var scroll = this.scrollY;
    if (scroll > 100 && oneTimeHello == false) {
        elementHello.play();
        oneTimeHello = true;
        disableScroll();
    }
})
bottonHello.addEventListener('click', function() {
enableScroll();
elementHello.pause();
});
//############################Bottons popups
const botton = document.getElementById('check_inmortal');
const botton2 = document.getElementById('cancel_inmortal');
var keys = {37: 1, 38: 1, 39: 1, 40: 1};
function preventDefault(e) {
  e.preventDefault();
}
function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}
// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}
var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
botton.addEventListener('click', function() {
enableScroll();
});
botton2.addEventListener('click', function() {
disableScroll();
});
disableScroll();
