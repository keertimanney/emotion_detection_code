let https = require('https');
let fs = require('fs');
// let p5 = require('p5');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');
const superagent = require('superagent');

const { strict } = require('assert');
const { request } = require('http');

let r=10; //resolution of child components
let a=4*r; 
let b=4*r;
let c=r;
let d=r;

let last_updated_time = Date.now();

class StartingPoints {
    constructor() {
        this.points = [];
    }

    add_point(point) {
        this.points.push(point);
        return this;
    }

    add_points(points) {
        for (var i = 0; i < points.length; i++) {
            this.points.push(points[i]);
        }
        return this;
    }

    get_points(points) {
        return this.points;
    }
}

class StartingPoint {
    constructor(a, b, c, d, limit) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.colHist = [];
        this.intHist = [];
        this.colors = [];
        this.identifier = null;
        this.limit = limit;
    }

    fill(width, length) {
        let colors_vec = [];
        console.log("Whats the length and width", width, length);
        for (var i = 0; i < width; i+=1) {
            let sub_vec = [];
            for (var j = 0; j < length; j+=1) {
                sub_vec.push(new Color([0, 0, 0], 0));
            }
            colors_vec.push(sub_vec);
        }
        this.colors = colors_vec;
        return this;
    }

    get_colhist() {
        return this.colHist;
    }

    get_col_hist_size() {
        console.log("Wha is the colhist commmmmmmm", this.get_colhist(), this.colHist);
        return this.colHist.length;
    }

    set_identifier(identifer) {
        this.identifier = identifer;
        return this;
    }

    get_identifier(identifier) {
        return this.identifier;
    }

    push_color(color) {
        this.colHist.push(color);
        return this;
    }

    push_intensity(intensity) {
        this.intHist.push(intensity);
        return this;
    }
}

class Color {
    constructor(color, intensity) {
        this.color = color;
        this.intensity = intensity;
    }

    set_color(color) {
        this.color = color;
    }
}


let limit1 = Math.ceil(5);
let limit2 = Math.ceil(5);
let limit3 = Math.ceil(5);

let starting_point_1 = new StartingPoint(4*r, 4*r, r, r, limit1);
let starting_point_2 = new StartingPoint(12*r, 4*r, r, r, limit2);
let starting_point_3 = new StartingPoint(20*r, 4*r, r, r, limit3);

let starting_points = new StartingPoints().add_point(starting_point_1).add_point(starting_point_2).add_point(starting_point_3);
// let starting_points = new StartingPoints().add_point(starting_point_1);

function color_from_value(value) {
    let angry = value["angry"];
    let happy = value["happy"];
    let sad = value["sad"];
    let surprised = value["surprised"];
    let disgusted = value["disgusted"];
    let neutral = value["neutral"];
    let fearful = value["fearful"];
    if (angry > happy && angry > sad && angry > surprised && angry > disgusted && angry > fearful) {
        console.log("Im angry");
        return [255, 0 , 0];
    }
    if (happy > angry && happy > sad && happy > disgusted && happy > surprised && happy > fearful) {
        console.log("Im happy");
        return [255, 255, 0];
    }
    if (sad > happy && sad > angry && sad > disgusted && sad > surprised && sad > fearful) {
        console.log("Im sad");
        return [0, 0, 255];
    }
    if (disgusted > happy && disgusted > angry && disgusted > sad && disgusted > surprised && disgusted > fearful) {
        console.log("Im disgusted");
        return [0, 255, 0];
    }
    if (surprised > happy && surprised > angry && surprised > disgusted && surprised > sad && surprised > fearful) {
        console.log("Im surprised");
        return [255, 0, 255];
    }
    if (fearful > happy && fearful > angry && fearful > disgusted && fearful > surprised && fearful > sad) {
        console.log("Im fearful");
        return [175, 175, 175];
    }
    if (neutral!=0 && fearful ==0 && sad ==0 && angry == 0 && surprised == 0 && happy == 0 && disgusted == 0 ) {
        console.log("Im neutral");
        return [0, 255, 255];
    }
    console.log("125,0,0");

    return [125, 125, 0];
}

let total_x = 25;
let total_y = 10;
let updated = false;

let last_replaced = 0;

let height = 10;
let width = 25;


function draw() {
    current_time = Date.now();
  
    let int = Math.random(1);
    let index= parseInt(Math.ceil(Math.random() * 3));
    let rd = [255,0,0]; let gr=[0,255,0]; let bl=[0,0,255];
    let inp = [rd,gr,bl];
    var col= Math.random(inp);

    let int2 = Math.random(1);
    var col2 = Math.random(inp);

    let int3 = Math.random(1);
    var col3 = Math.random(inp);

   if (current_time - last_updated_time > 2000.0) {
        // Replace this with you IP address
            response = emotion_per_identifer;
            // console.log(response);
            console.log("Whats the width and the lenght", width, height);
            col = col;
            col2 = col2;
            col3 = col3;
            let new_points = [];
            let current_points = starting_points.points;
            for (var i = 0; i < current_points.length; i++) {
                let new_point = current_points[i].fill(width, height);
                console.log("What are the new point sizes", new_point.colors.length, new_point.colors[0].length);
                new_points.push(current_points[i].fill(width, height));
            }
            starting_points_new = new StartingPoints().add_points(new_points);
            for (const [key, value] of Object.entries(response)) {
                console.log("What are the key and value", key, value);
                let points = starting_points.get_points();
                let new_points = [];
                let entered = false;
                for (var i = 0; i < points.length; i++) {
                    let point = points[i];
                    if (point.get_identifier() === null || point.get_identifier() === undefined || point.get_identifier() === key) {
                        if (!entered) {
                            point = iterate(point.set_identifier(key).push_color(color_from_value(value)).push_intensity(1));
                            entered = true;
                        }
                    }
                    new_points.push(point);
                }

                if (!entered) {
                    new_points = [];
                    let newer_points = [];
                    for (var i = 0; i < points.length; i++) {
                        if (i == last_replaced) {
                            point = iterate(new_points[i].set_identifier(key).push_color(color_from_value(value)).push_intensity(1));
                            newer_points.push(point);
                        } else {
                            newer_points.push(new_points[i]);
                        }
                    }
                    entered = true;
                    last_replaced = last_replaced + 1;
                    new_points = newer_points;
                }
                // console.log("What are the new points when getting from emotions", new_points);
                starting_points = new StartingPoints().add_points(new_points);
            }
    
            last_updated_time = current_time;
            updated = true;    
   } else {
       if (updated) {
           let new_points = [];
           let current_points = starting_points.points;
           for (var i = 0; i < current_points.length; i++) {
               new_points.push(current_points[i]);
           }
           starting_points = new StartingPoints().add_points(new_points);
       }
   }

   if (updated) {
       let x_partition = starting_points.points[0].colors.length;
       let y_partition = starting_points.points[0].colors[0].length;
       console.log("Whsat the x an dys sizae", x_partition, y_partition);
        for (var i = 0; i < x_partition; i+= 1) {
            for (var j = 0; j < y_partition; j += 1) {
                let color_red = 0;
                let color_blue = 0;
                let color_green = 0;
                for (var k = 0; k < starting_points.points.length; k++) {
                    color_red = color_red + starting_points.points[k].colors[i][j].color[0];
                    color_blue = color_blue + starting_points.points[k].colors[i][j].color[1];
                    color_green = color_green + starting_points.points[k].colors[i][j].color[2];
                }
                // fill([color_red, color_blue, color_green]);
                // circle(i * r + r/2, j * r + r/2, r - 2);
            }
        }
    }
}

function iterate(starting_point) {
  
    let l = starting_point.colHist.length;

    let rectx = starting_point.a;
    let recty = starting_point.b;

    let do_we_stop = false;

    if (l > starting_point.limit) {
        do_we_stop = true;
        starting_point.colHist.shift();
        starting_point.intHist.shift();
        l = starting_point_1.colHist.length;
    }

    let n = 0;

    for (i=0; i<l; i++) {
        console.log("What is the color we are getting", starting_point.colHist[i]);
        // fill(starting_point.colHist[0+i]);
        let intensity = starting_point.intHist[i] * ((i + 1) / l);
        let s = i;
        let movementx = starting_point.c - 2 * s * r;
        let movementy = starting_point.d - 2 * s * r;
        let color = starting_point.colHist[0+i];
        let new_color = [color[0] * intensity, color[1] * intensity, color[2] * intensity];

        // rect(starting_point.a + s*r, starting_point.b+ s*r, movementx, movementy);
        starting_point = fill_colors(starting_point, starting_point.a + s * r, starting_point.b + s * r, movementx, movementy, new_color, rectx, recty);

        // let posx = starting_point.a + s*r-Math.ceil(Math.random(1*r))*(r - n);
        // let posy = starting_point.b + s*r-Math.ceil(Math.random(1*r))*(r - n);
        // // rect(posx, posy, movementx, movementy);
        // starting_point = fill_colors(starting_point, posx, posy, movementx, movementy, new_color, rectx, recty);

        // posx = starting_point.a + s*r+Math.ceil(Math.random(1*r))*(r - n);
        // posy = starting_point.b + s*r-Math.ceil(Math.random(1*r))*(r - n);
        // // rect(posx, posy, movementx, movementy);
        // starting_point = fill_colors(starting_point, posx, posy, movementx, movementy, new_color, rectx, recty);

        // posx = starting_point.a + s*r-Math.ceil(Math.random(1*r))*(r - n);
        // posy = starting_point.b + s*r-Math.ceil(Math.random(1*r))*(r - n);
        // // rect(posx, posy, movementx, movementy);
        // starting_point = fill_colors(starting_point, posx, posy, movementx, movementy, new_color, rectx, recty);

        // posx = starting_point.a + s*r-Math.ceil(Math.random(1*r))*(r - n);
        // posy = starting_point.b + s*r+Math.ceil(Math.random(1*r))*(r - n);
        // // rect(posx, posy, movementx, movementy);
        // starting_point = fill_colors(starting_point, posx, posy, movementx, movementy, new_color, rectx, recty);
    }

    if (!do_we_stop) {
        starting_point.a= starting_point.a-r; 
        starting_point.b= starting_point.b-r;
        starting_point.c = starting_point.c + 2*r;
        starting_point.d = starting_point.d + 2*r;
    }
    return starting_point;
}

function fill_colors(starting_point, x, y, movementx, movementy, color, rectx, recty) {
    // console.log("What iteration is this", starting_point.colors.length, x, y, movementx, movementy);
    var total_infected = 0;
    for (var i = 0; i < starting_point.colors.length; i += 1) {
        for (var j = 0; j < starting_point.colors[i].length; j += 1) {
            let positionx = i * r;
            let positiony = j * r;
            // eucledian distance from centre
            let distance_from_centre = Math.abs(i - rectx) + Math.abs(j - recty);
            // factor of intendsity
            let intensity = (total_x + total_y - distance_from_centre) / (total_x + total_y);
            if (positionx >= x && positiony >= y && positionx <= (x + movementx) && positiony <= (y + movementy)) {
                // starting_point.colors[i][j].color = [parseInt(color[0] * intensity), parseInt(color[1] * intensity), parseInt(color[2] * intensity)];
                starting_point.colors[i][j].color[0] = color[0];
                starting_point.colors[i][j].color[1] = color[1];
                starting_point.colors[i][j].color[2] = color[2];
                // console.log(i, j, color);
                total_infected += 1;
            }
        }
    }
    return starting_point;
}

var app = express();

app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let emotions = {};

app.use(express.static(__dirname));

https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'testing'
}, app)
.listen(4000);
 

app.get("/r", (req, res) => {
    console.log(res);
    console.log(req);
    // res.send(emotions);
    res.send("Hello world");
});

app.get("/get_value", (req, res) => {
    console.log(res);
    console.log(req);
    res.send(emotions);
});


var emotion_per_identifer = {};

app.get('/receive', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get("/get_all_emotions", (req, res) => {
    // console.log("We are sending all the emotions", {"testing": "123"});
    // let response = {'testing': '123'};
    res.send(emotion_per_identifer);
})

app.get('/get_all_emotions_shape', (req, res) => {
    // console.log("Whats the response", res);
    let x_partition = starting_points.points[0].colors.length;
    let y_partition = starting_points.points[0].colors[0].length;
    console.log("what are the x and y sizes", x_partition, y_partition);
    let final_colors = [];
    for (var i = 0; i < x_partition; i++) {
        let empty_arr = [];
        for (var j = 0; j < y_partition; j++) {
            empty_arr.push([]);
        }
        final_colors.push(empty_arr);
    }
     for (var i = 0; i < x_partition; i+= 1) {
         for (var j = 0; j < y_partition; j += 1) {
             let color_red = 0;
             let color_blue = 0;
             let color_green = 0;
             for (var k = 0; k < starting_points.points.length; k++) {
                 color_red = color_red + starting_points.points[k].colors[i][j].color[0];
                 color_blue = color_blue + starting_points.points[k].colors[i][j].color[1];
                 color_green = color_green + starting_points.points[k].colors[i][j].color[2];
             }
            //  fill([color_red, color_blue, color_green]);
            final_colors[i][j] = [color_red, color_blue, color_green];
         }
     }
    //  console.log("What are the fianl colors", final_colors);
     let final_value = {"value": final_colors};
     res.send(final_value);
})

app.post('/send_value_v2', (req, res) => {
    console.log(req.body);
    const message = req.body;
    let identifier = message["identifier"];

    let angry = parseFloat(message["angry"]);
    let sad = parseFloat(message["sad"]);
    let surprised = parseFloat(message["surprised"]);
    let happy = parseFloat(message["happy"]);
    let disgusted = parseFloat(message["disgusted"]);
    let fearful = parseFloat(message["fearful"]);
    let neutral = parseFloat(message["neutral"]);

    // Add the emotion to the emotion identifier map
    emotion_per_identifer[identifier] = {
        "angry": angry,
        "sad": sad,
        "surprised": surprised,
        "happy": happy,
        "neutral": neutral,
        "fearful": fearful,
        "disgusted": disgusted,
        "time": Date.now(),
    };
    console.log("We are over here");
    draw();
    console.log(starting_points);
    return res.send("We are done");
});