"use strict";

// let galaxy = document.querySelector(".knightBoard");
function possibleKnightCoordinates(x=1, y=1) {
  // Array to store the coordinates for the available coordinates/moves
  let anotherplace = [];
  // Created an array of objects to store all the moves a knight can make
  // Creating new possible coordinates 
  let myCoordinates = [
    { x: x + 1, y: y + 2 }, 
    { x: x + 2, y: y + 1 },
    { x: x + 2, y: y - 1 },
    { x: x + 1, y: y - 2 }, 
    { x: x - 1, y: y - 2 },
    { x: x - 2, y: y - 1 },
    { x: x - 2, y: y + 1 },
    { x: x - 1, y: y + 2 },
  ];
// Pushing the info calculated into another array ie anotherplace
  for (let i = 0; i < myCoordinates.length; i++) {
    anotherplace.push([myCoordinates[i].x, myCoordinates[i].y]);
  }
  // returning the new coordinates to whatever calls it
  return anotherplace;
};

// Validation
function cordinateExists(arr, a, b) {
  if (a > 8 || a < 0 || b > 8 || b < 0) {
    return false;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === a && arr[i][1] === b) {
      return true;
    }
  }
  return false;
}
// Removal of existing Child nodes
// Renders Chess board
function func(x, y) {
  // console.log(x, y);
  let root = document.getElementById("root");
  removeAllChildNodes(root);
  root.appendChild(chessBoard(x, y));
}
// For loop to remove any existing child in the parent node
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}


//create a single div
function cell(c, x, y, p = false, validco) {
  // <div class = "damn parentCont" ></div>
  let div = document.createElement("div"); //created a new HTML element and attach it to the DOM tree
  div.classList.add("damn", "parentCont"); //adding one or more classes to the CSS element
  div.style.backgroundColor = c;
  
  if (p) {
    // <i class = "fa-solid fa-chess-knight" alt = "the img"></i>
    // <div>
    //   <img></img>
    // </div>
    let img = document.createElement("i");
    img.classList.add("fa-solid", "fa-chess-knight"); //adding one or more classes to the CSS element
    img.style.color = "orange";
    img.style.height = "100%";
    img.setAttribute("alt", "the img"); //sets the value of an attribute on the specified element
    div.appendChild(img); //insert a new node or an existing node as the last child of a particular parent node
    return div;
  }
  
  if (cordinateExists(validco, x, y)) {
    // <div onclick = "`func(${x},${y})`">
    //   <img></img>
    // </div>
    let img = document.createElement("img"); //created a new HTML element and attach it to the DOM tree
    img.src =
      "https://toppng.com/uploads/preview/knight-svg-horse-silhouette-knight-chess-piece-11562865342op3u0nr8tc.png";
    img.style.height = "100%";
    img.setAttribute("alt", "the img"); //sets the value of an attribute on the specified element
    div.appendChild(img); //insert a new node or an existing node as the last child of a particular parent node
    div.setAttribute("onclick", `func(${x},${y})`); //sets the value of an attribute on the specified element
    return div;
  }
  return div;
}



function chessBoard(x, y) {
  let parentCont = document.createElement("div");
  parentCont.classList.add("parentCont");    
  parentCont.style.textAlign = "center";
  let cont = document.createElement("div");
  let k = 1;
  var validCo = possibleKnightCoordinates(x, y);
  for (var i = 1; i < 9; i++) {
    let row = document.createElement("div");
    let col = document.createElement("div");
    col.classList.add("cont");
    for (var j = 1; j < 9; j++) {
      let c = "white";
      // if even number return k
      if (k % 2 === 0) c = "black";
      if (x === i && y === j) {
        //cell(c, x, y, p = false, validco)
        // p = true/ false 
        col.appendChild(cell(c, i, j, true, validCo));
      } else {
        col.appendChild(cell(c, i, j, false, validCo));
      }
      k++;
      row.appendChild(col);
    }
    k++;
    cont.appendChild(row);
  }
  parentCont.appendChild(cont);
  return parentCont;
}

document.getElementById("root").appendChild(chessBoard(1, 1));