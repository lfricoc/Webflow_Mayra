//Java_Script Repo:


//###########################################################################################################--------check IA
// const bottonIA = document.getElementById('check_ia');
//
// function showIA() {
//   //var scroll = this.scrollY;
//   //window.scrollTo(0, sectionIA);
//   //document.getElementById('section_ia').style.display = "block";
//   const teilIa = document.getElementById('section_ia');
//   teilIa.style.display = "block";
//   teilIa.scrollIntoView({
//     behavior: "smooth"
//   });
// }
// bottonIA.addEventListener('click', function() {
//   showIA();
// });

//###########################################################################################################--------- Laberinto

allo = window.document.getElementById('mainRectangle');
//-----------------------------------------------------------Laberynth definition
const lab_def = [
  ["SE", "EW", "EW", "EW", "EW", "EW", "SEW", "EW", "EW", "SW", "E", "SEW", "EW", "SW", "SE", "W"],
  ["NS", "SE", "WS", "E", "EW", "WS", "NS", "S", "S", "NE", "EW", "WN", "S", "NS", "NE", "WS"],
  ["NSE", "NW", "NS", "SE", "WS", "NE", "NSW", "NSE", "WNE", "EW", "WS", "S", "NS", "NSE", "WE", "WN"],
  ["NE", "WE", "NWE", "WNS", "NE", "WS", "NE", "WN", "SE", "WS", "NS", "NSE", "NWE", "WNE", "WE", "WS"],
  ["E", "WES", "WE", "NWE", "W", "NS", "E", "WE", "WNS", "NE", "NW", "NS", "SE", "WE", "WS", "NS"],
  ["S", "NS", "SE", "WS", "S", "NS", "SE", "W", "NS", "E", "WE", "NW", "NS", "S", "NS", "NS"],
  ["NS", "NSE", "WN", "NE", "WNS", "NS", "NE", "WE", "NWE", "WE", "WE", "WE", "WN", "NS", "NS", "NS"],
  ["NS", "NE", "WE", "WE", "WNS", "NE", "WE", "WS", "S", "S", "S", "S", "SE", "WNS", "NS", "NS"],
  ["NS", "SE", "WE", "WE", "WN", "SE", "WE", "WN", "NS", "NSE", "WN", "NE", "WN", "NSE", "NW", "NS"],
  ["NS", "NS", "SE", "WE", "WE", "WNS", "SE", "WES", "WNS", "NS", "E", "WE", "WE", "WEN", "WS", "NS"],
  ["NE", "WN", "NS", "SE", "WS", "NS", "NS", "NS", "NS", "NS", "E", "WE", "WE", "WE", "NSW", "NS"],
  ["SE", "WE", "NW", "NS", "NS", "NSE", "NW", "NS", "NE", "NW", "SE", "WE", "WE", "WE", "WNS", "NS"],
  ["NS", "SE", "WS", "NS", "NS", "NSE", "W", "NE", "WE", "W", "NS", "E", "WE", "WS", "NS", "NS"],
  ["NS", "NS", "NS", "NS", "NS", "NE", "W", "SE", "WE", "WS", "NS", "E", "WES", "NWS", "NS", "NS"],
  ["NSE", "WNS", "NE", "WN", "NE", "WE", "WE", "NW", "S", "NE", "NWE", "W", "NS", "NS", "N", "NS"],
  ["N", "NE", "WE", "WE", "WE", "WE", "WE", "WE", "WEN", "WE", "WE", "WE", "NW", "NE", "WE", "NW"]
];
//-------------------------------------P5 function to construct Element
'use strict'; //strict mode : declare all variables
//const fs = require('fs');
let labP5 = function(p5l) {
  var solved; // when the maze is solved = true
  var gridX, gridY; // Coordinates en Grid calculated from Mouse
  var modules = []; // trayectory Images loaded
  var tileNumber = 16; //number of tiles
  var gd; //Canvas saved png.
  var doDrawGrid = true; //activate Grid
  //---------------------------------------------------------------------Parent Dimensions
  var bord = getComputedStyle(allo, null).getPropertyValue('border');
  bord = parseFloat(bord.substring(0, bord.search("px")));
  var wiwi = getComputedStyle(allo, null).getPropertyValue('width');
  wiwi = parseFloat(wiwi.substring(0, wiwi.search("px")));
  wiwi = wiwi - bord;
  var heihei = getComputedStyle(allo, null).getPropertyValue('height');
  heihei = parseFloat(heihei.substring(0, heihei.search("px")));
  heihei = heihei - bord;
  //--------------new paradigm
  var rel_x, rel_y; //From old access point to new position
  var access_x;
  var access_y;
  var coming_from; //Entry to mase coming from WEST
  var allowed; //Variable of allowed entrances in coordinate
  var shock, restart; // shocked ocurred, restart must
  var changed; //transicion from vertical to horizontal
  var direction; // either vertical or horizontal
  var partial_img; // store trayectory by images & coordinates
  var tileSize = p5l.round(wiwi / tileNumber); //number of pixels of tiles
  //------------------------------Load images
  p5l.preload = function() {
    for (var i = 0; i < 16; i++) {
      modules[i] = p5l.loadImage('../images/lab/' + p5l.nf(i, 2) + '.svg');
    }
  }
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //-----------------------------Initialitation of p5 Element (only one time)
  // it creates the cambas and puts the initial and final points in maze
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  p5l.setup = function() {
    solved = false;
    access_x = 0;
    access_y = 0;
    coming_from = "W";
    gd = p5l.createCanvas(wiwi, heihei); //Canvas in div - dimensions
    p5l.cursor(p5l.CROSS); //Makes the cursor a cross symbol
    p5l.rectMode(p5l.CENTER); //Changes the interpretation of arguments for rect - first 2: center coordinates => rect
    p5l.imageMode(p5l.CENTER); //Same as above but for images => image
    p5l.strokeWeight(0.15); //How thick are lines
    p5l.textSize(8); //set the size of fonts  => text
    p5l.textAlign(p5l.CENTER, p5l.CENTER); //horizontal and vertical alignement
    partial_img = [];
    //----------------------------------------------Entrance of Maze
    p5l.newModules(1, 1, 0);
    //----------------------------------------------Exit of Maze
    p5l.newModules(1, 15, 0);
  }
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //-----------------------------Interaction while Mouse_Pressed (everytime)
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  p5l.draw = function() {
    if (p5l.mouseIsPressed) {
      if (p5l.mouseButton == p5l.LEFT && !solved) p5l.setTile(); //Draws all the tiles in trayectory
      if (p5l.mouseButton == p5l.RIGHT) p5l.setup(); //Enable restart
    } else {
      //console.log("aja");
      shock = false;
      restart = false;
    }
  }
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //-----------------------------Where does the trayectory come from?
  //-----------------------------Modify previous tile and create new tile
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  p5l.coming = function(a, b) {
    rel_x = a - access_x; //Difference between old press and new press
    rel_y = b - access_y; //Difference between old press and new press
    allowed = lab_def[b - 1][a - 1]; //Retrieve allowed entries for tile
    //console.log(allowed);      //-----Verify if Maze is well defined
    //---------------------------------------------------------------------------Tree for North
    if (rel_x == 0 && rel_y == 1) {
      evaluate = true; // a change in trayectory has ocurred so shock condition must be evaluated
      if (direction = "horizontal") {
        changed = true; // a change in direction has ocurred
      } else {
        changed = false;
      }
      //-----------------------If direction changed, previous tile must change
      if (changed) {
        //-------------------------Coming from West
        if (coming_from == "W") {
          var newposX = tileSize * a - tileSize / 2;
          var newposY = tileSize * (b - 1) - tileSize / 2;
          partial_img[partial_img.length - 1] = [newposX, newposY, 6];
        }
        //-------------------------Coming from East
        else if (coming_from == "E") {
          var newposX = tileSize * a - tileSize / 2;
          var newposY = tileSize * (b - 1) - tileSize / 2;
          partial_img[partial_img.length - 1] = [newposX, newposY, 3];
        }
      }
      p5l.newModules(a, b, 10); // New tile creation in array and redrawing of trayectory
      direction = "vertical"; // New direction
      coming_from = "N"; // Coming from north
      //console.log(coming_from);
    }
    //---------------------------------------------------------------------------Tree for South
    else if (rel_x == 0 && rel_y == -1) {
      evaluate = true;
      if (direction = "horizontal") {
        changed = true;
      } else {
        changed = false;
      }
      if (changed) {
        if (coming_from == "W") {
          var newposX = tileSize * a - tileSize / 2;
          var newposY = tileSize * (b + 1) - tileSize / 2;
          partial_img[partial_img.length - 1] = [newposX, newposY, 12];
        } else if (coming_from == "E") {
          var newposX = tileSize * a - tileSize / 2;
          var newposY = tileSize * (b + 1) - tileSize / 2;
          partial_img[partial_img.length - 1] = [newposX, newposY, 9];
        }
      }
      p5l.newModules(a, b, 10)
      direction = "vertical";
      coming_from = "S";
      //console.log(coming_from);
    }
    //---------------------------------------------------------------------------Tree for West
    else if (rel_x == 1 && rel_y == 0) {
      evaluate = true;
      if (direction = "vertical") {
        changed = true;
      } else {
        changed = false;
      }
      if (changed) {
        if (coming_from == "N") {
          var newposX = tileSize * (a - 1) - tileSize / 2;
          var newposY = tileSize * b - tileSize / 2;
          partial_img[partial_img.length - 1] = [newposX, newposY, 9];
        } else if (coming_from == "S") {
          var newposX = tileSize * (a - 1) - tileSize / 2;
          var newposY = tileSize * b - tileSize / 2;
          partial_img[partial_img.length - 1] = [newposX, newposY, 3];
        }
      }
      p5l.newModules(a, b, 5)
      direction = "horizontal";
      coming_from = "W";
      //console.log(coming_from);
    }
    //---------------------------------------------------------------------------Tree for East
    else if (rel_x == -1 && rel_y == 0) {
      evaluate = true;
      if (direction = "vertical") {
        changed = true;
      } else {
        changed = false;
      }
      if (changed) {
        if (coming_from == "N") {
          var newposX = tileSize * (a + 1) - tileSize / 2;
          var newposY = tileSize * b - tileSize / 2;
          partial_img[partial_img.length - 1] = [newposX, newposY, 12];
        } else if (coming_from == "S") {
          var newposX = tileSize * (a + 1) - tileSize / 2;
          var newposY = tileSize * b - tileSize / 2;
          partial_img[partial_img.length - 1] = [newposX, newposY, 6];
        }
      }
      p5l.newModules(a, b, 5)
      direction = "horizontal";
      coming_from = "E";
      //console.log(coming_from);
    }
    //-------------------------------- NOT MOVING
    else if (rel_x == 0 && rel_y == 0) {
      //console.log("This is repetition");
      evaluate = false;
    }
    //-------------------------------- First Point
    else if (rel_x == 1 && rel_y == 1) {
      //console.log("This is first point");
      p5l.newModules(a, b, 1);
      evaluate = false;
    }
    //-------------------------------arbitrary start_point
    else {
      //console.log("Restart");
      restart = true;
      p5l.createCanvas(wiwi, heihei);
      setTimeout(() => {
        p5l.setup();
      }, 500);
    }
    re = allowed.search(coming_from);
    //--------------------------------------shock condition
    if (re == -1 && evaluate) {
      //console.log("shock");
      shock = true;
      p5l.createCanvas(wiwi, heihei);
      setTimeout(() => {
        p5l.setup();
      }, 500);
    }
    if (a == 1 && b == 15) {
      solved = true;
      // console.log("solved!!!!");
      how_well = partial_img.length;
      // console.log(how_well);

      if (how_well < 34) {
        window.document.getElementById('imp_sol').style.visibility = "visible";
        window.document.getElementById('betterWay2').style.visibility = "visible";
      } else if (how_well < 56 && how_well > 34) {
        window.document.getElementById('best_sol').style.visibility = "visible";
        window.document.getElementById('betterWay').style.visibility = "visible";
      } else if (how_well < 74 && how_well > 56) {
        window.document.getElementById('second_sol').style.visibility = "visible";
        window.document.getElementById('betterWay').style.visibility = "visible";
      } else {
        window.document.getElementById('worst_sol').style.visibility = "visible";
        window.document.getElementById('betterWay').style.visibility = "visible";
      }
    }
  }
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //-----------------------------Definition of Tile when Mouse Pressed
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  p5l.setTile = function() {
    // convert mouse position to grid coordinates
    gridX = p5l.floor(p5l.mouseX / tileSize) + 1;
    gridX = p5l.constrain(gridX, 1, tileNumber);
    gridY = p5l.floor(p5l.mouseY / tileSize) + 1;
    gridY = p5l.constrain(gridY, 1, tileNumber);
    p5l.coming(gridX, gridY);
    if (!restart || !shock) {
      access_x = gridX;
      access_y = gridY;
    }
  }
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //-----------------------------Where does the trayectory come from?
  //-----------------------------Modify previous tile and create new tile
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  p5l.drawGrid = function() {
    for (var gridX = 0; gridX < tileNumber + 2; gridX++) {
      for (var gridY = 0; gridY < tileNumber + 2; gridY++) {
        var posX = tileSize * gridX - tileSize / 2;
        var posY = tileSize * gridY - tileSize / 2;
        //p5l.fill(255);
        p5l.noFill();
        p5l.stroke(51);
        p5l.rect(posX, posY, tileSize, tileSize);
      }
    }
  }
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //-----------------------------Incorporate new tile and redraw trayectory
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  p5l.newModules = function(c, d, e) {
    var posX = tileSize * c - tileSize / 2;
    var posY = tileSize * d - tileSize / 2;
    partial_img.push([posX, posY, e]); // Incorporate new tile
    p5l.createCanvas(wiwi, heihei); // Restart canvas
    for (let i = 0; i < partial_img.length; i++) {
      p5l.image(modules[partial_img[i][2]], partial_img[i][0], partial_img[i][1], tileSize, tileSize);
    }
  }
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //-----------------------------KEY PRESS ACTIONS
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  p5l.keyPressed = function() {
    if (p5l.key == 's' || p5l.key == 'S') p5l.saveCanvas(gd, 'png');
    if (p5l.keyCode == p5l.DELETE || p5l.keyCode == p5l.BACKSPACE) {
      //       p5l.initTiles();
      p5l.setup(); //really restart
    }
    if (p5l.key == 'g' || p5l.key == 'G') {
      p5l.drawGrid();
    }
    if (p5l.key == 'd' || p5l.key == 'D') isDebugMode = !isDebugMode;
  }
}
new p5(labP5, allo);


//###########################################################################################################--------- Forders

var conter = 0;
var scl = 2.5;
var advance = [10, 25, 70, 100];
var c = 0;
var dumi;
var img_recuerdos = document.getElementById("general_cover")
var grosor = 3 * scl;
var ancho = 90 * scl;
let recuerdos = function(p) {
  var random_color = 100;
  var random_gris = 100;
  var bord = getComputedStyle(img_recuerdos, null).getPropertyValue('border');
  bord = parseFloat(bord.substring(0, bord.search("px")));
  var wiwi = getComputedStyle(img_recuerdos, null).getPropertyValue('width');
  wiwi = parseFloat(wiwi.substring(0, wiwi.search("px")));
  heihei = getComputedStyle(img_recuerdos, null).getPropertyValue('height');
  var heihei = parseFloat(heihei.substring(0, heihei.search("px")));

  p.setup = function() {
    p.createCanvas(wiwi - bord, heihei - bord);
    // p.background(0);
    p.colorMode(p.HSB, 360, 100, 100, 100);
  }
  p.draw = function() {
    let a = p.random(-(wiwi - bord), (wiwi - bord));
    let b = p.random(-(heihei - bord), (heihei - bord));

    p.rect(a, b, ancho, 130 * scl);
    p.noStroke();
    p.fill(c, 93, random_color, 100);
    if (random_color > 30) {
      random_color = random_color - 0.25;
    }
    p.rect(a + grosor, b + grosor, (ancho - (2 * grosor)), 100 * scl);
    p.noStroke();
    p.fill(c, 0, random_gris, 100);
    if (random_gris > 60) {
      random_gris = random_gris - 0.25;
    }

  };
}
// new p5(recuerdos, img_recuerdos);
//---------------------------------------Code for folders:
function instance_folder(a, u) {
  // console.log("Hello!")
  a.style.display = "none";
  c = u;
  dumi = document.createElement("div");
  document.getElementById('general_cover').appendChild(dumi);
  document.getElementById('general_cover').style.zIndex = 100;
  new p5(recuerdos, dumi);
  setTimeout(() => {
    // console.log("World!");
    document.getElementById('general_cover').style.zIndex = 0
    dumi.remove();
    /*
    advance = advance+0.25;
    advance_px = advance*document.body.scrollHeight;
    window.scrollTo(0,advance_px);
    */
    var con = "-" + advance[conter] + "vh";
    // console.log(con);
    document.getElementById('id_alter').style.bottom = "-" + advance[conter] + "vh";
    document.getElementById('id_image_alter').style.bottom = advance[conter] + "vh";
    conter = conter + 1;
    if (conter == 4) {
      conter = 0;
      setTimeout(() => {
        document.getElementById('popup_gedaechtnis').style.display = "block";
      }, 1000);
    }
    //document.getElementById('general_cover').style.top = advance_px + "px";
  }, 5000);
}
var carpetas = document.getElementsByClassName('carpeta');
var arr_color = [360, 210, 120, 80];
for (let i = 0; i < carpetas.length; i++) {
  // console.log(arr_color[i]);
  carpetas[i].addEventListener(
    "mouseenter",
    function() {
      instance_folder(carpetas[i], arr_color[i]);
    }, false
  );
}

var checkRec = document.getElementById('check_recuerdos');
var cancelRec = document.getElementById('cancel_recuerdos');
var popupRecuerdos = document.getElementById('popup_gedaechtnis')


checkRec.addEventListener(
  "click",
  function() {
    let icono = document.getElementsByClassName("carpeta");
    popupRecuerdos.style.display = "none";
    for (let i = 0; i < icono.length; i++) {
      icono[i].style.display = "block";
    }
  }, false
);

cancelRec.addEventListener(
  "click",
  function() {
    popupRecuerdos.style.display = "none";
  }, false
);


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
  bird.style.backgroundImage = "url('images/img/pajaros_" + c + ".jpg')";
  // bird.style.backgroundImage = "url(img/pajaros_ " + c + ".jpg)";
  bird.style.backgroundSize = "cover";
}

function mouseLeave(b, d) {
  if (d > 15) {
    b.style.backgroundColor = "rgba(" + 0 + "," + 0 + "," + 0 + "," + 0.1 + ")";
  }
  bird.style.backgroundImage = "";
}

var randomValue = Array(30).fill().map((element, index) => index)
// console.log(randomValue);
randomValue = shuffle(randomValue);
// console.log(randomValue);

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
// var oneTimeVideo = false;
// const videoIntro = document.querySelector('.video');
// window.addEventListener("scroll", function() {
//   let refHeight = window.innerHeight;
//   let refWidth = window.innerWidth;
//   var scroll = this.scrollY;
//
//   //if(refWidth < 560){
//   //	refHeight = refHeight / 2;
//   //}
//
//   if (scroll > refHeight * 1.9 && oneTimeVideo == false) {
//     // console.log(refHeight);
//     //console.log(refWidth);
//     videoIntro.play();
//     oneTimeVideo = true;
//   }
// })


//############################Audio Hello
// var oneTimeHello = false;
// const bottonHello = document.getElementById('check_hello');
// var elementHello = document.getElementById('audioHello')
//
// window.addEventListener("scroll", function() {
//   var scroll = this.scrollY;
//   if (scroll > 100 && oneTimeHello == false) {
//     elementHello.play();
//     oneTimeHello = true;
//     disableScroll();
//   }
// })
// bottonHello.addEventListener('click', function() {
//   enableScroll();
//   elementHello.pause();
// });
//############################Bottons popups
const botton = document.getElementById('check_inmortal');
const botton2 = document.getElementById('cancel_inmortal');
var keys = {
  37: 1,
  38: 1,
  39: 1,
  40: 1
};

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
    get: function() {
      supportsPassive = true;
    }
  }));
} catch (e) {}
var wheelOpt = supportsPassive ? {
  passive: false
} : false;
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