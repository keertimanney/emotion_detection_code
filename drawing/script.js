// let p5 = require('p5');

let treeDensity = 60;   // can be range of 0–100

// variables for trees, ground, and burned spots
// (this isn't necessary, but makes our code below
// much more readable)
let ground =  0;
let tree =    1;
let burned = -1;

let groundColor;
let treeColor;
let burnedColor;

let happy_color;
let sad_color;

// let groundColor, treeColor, burnedColor;
let forest;
let happy_or_sad;

console.log("hello world");

console.log("What is forest", forest);

let emotions;

let total_counter = 120;
let total_count = 0;


function setup() {
  createCanvas(64, 64);
  noCursor();

  console.log("We are in setup");

  // our colors for different terrain
  groundColor = color(255, 255, 255);
  treeColor =   color(255, 255, 255);
  burnedColor = color(30, 20, 10);
  let another_color = color(54, 23, 5);

  let random_color = burnedColor + another_color;
  console.log(random_color);

  happy_color = color(0, 0, 255);
  sad_color = color(0, 255, 0);

  // create the forest as a 2D array
  // (one element for each pixel)
  forest = [];
  happy_or_sad = [];
  
  // initialize our terrain with randomly-placed trees
  for (let y=0; y<height; y++) {
    // console.log("what is forest", Object.keys(forest));
    forest.push([]);
    happy_or_sad.push([]);
    for (let x=0; x<width; x++) {
      if (random(100) < treeDensity) {
        forest[y].push(tree);
        happy_or_sad[y].push(-1);
        // forest[y][x] = tree;
      }
      else {
          forest[y].push(ground);
          happy_or_sad[y].push(-1);
        // forest[y][x] = ground;
      }
    }
  }
  
  // set fire to the center pixel
  // (could also be random, or multiple locations!)
  let x = int(width/2);
  let y = int(height/2);
  forest[y][x] = burned;
}


function draw() {
  
    // go through all the values in our forest...
    loadPixels();
    // Rendering at 60fps, so update color every 2 seconds to not overload the other server
    console.log("What is our total count here", total_count);
    if (total_count % 2 == 0) {
        total_count = total_count + 1;
        // console.log("what is total count", total_count);
        let url = 'http://localhost:3000/get_value';
        httpGet(url, "json", function(response) {
        //   console.log("Are we here");
        //   console.log(response);
        // when the HTTP request completes, populate the variable that holds the
        // earthquake data used in the visualization.
        emotions = response;
        console.log("What are the emotions", response);
        console.log(emotions.happy > emotions.angry);
        console.log(emotions.happy);
        console.log(emotions.angry);
        // loadPixels();
        let should_be_happy = (emotions.happy > emotions.angry) && (emotions.happy > 0.5);
        should_change = (emotions.happy > 0.5 || emotions.angry > 0.5);
        if (!should_change) {
            console.log("We are not changing");
            updatePixels();
        } else {
            console.log("We are changing");
            for (let y=0; y<height; y++) {
                for (let x=0; x<width; x++) {
                
                // update the burn
                burn(x, y);

                //   console.log(pixels[x][y]);
                
                // draw the forest
                let value = forest[y][x];
                if (value === ground) {
                    set(x, y, groundColor);
                }
                else if (value === tree) {
                    set(x, y, treeColor);
                }
                else if (value === burned) {
                    if (happy_or_sad[x][y] == 1) {
                        set(x, y, happy_color);
                    } else if (happy_or_sad[x][y] == 0) {
                        set(x, y, sad_color);
                    } else {
                        if (should_be_happy) {
                            happy_or_sad[x][y] = 1;
                            set(x, y, happy_color);
                        } else {
                            happy_or_sad[x][y] = 0;
                            set(x, y, sad_color);
                        }
                    }
                }
                }
            }
            updatePixels();    
        }
    });
  } else {
      total_count = total_count + 1;
      console.log("What is the total count here", total_count);
  }

//   console.log("What are the emotions right now", emotions);
}


// any key to reset the simulation
function keyPressed() {
  setup();
}


function burn(x, y) {
  
  // if already not burned yet, skip
  // (since it's not on fire!)
  if (forest[y][x] != burned) {
    return;
  }
  
  // otherwise, burn this pixel's neighbors...
  
  // neighbor to the left
  if (x-1 >= 0 && forest[y][x-1] === tree) {
    forest[y][x-1] = burned;
  }
  
  // right
  if (x+1 < width && forest[y][x+1] === tree) {
    forest[y][x+1] = burned;
  }
  
  // up
  if (y-1 >= 0 && forest[y-1][x] === tree) {
    forest[y-1][x] = burned;
  }
  
  // down
  if (y+1 < height && forest[y+1][x] === tree) {
    forest[y+1][x] = burned;
  }
}

