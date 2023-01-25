let r=30; //resolution of child components
let a=4*r; 
let b=4*r;
let c=r;
let d=r;

let last_updated_time = Date.now();

class StartingPoint {
    constructor(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.colHist = [];
        this.intHist = [];
        this.colors = [];
        this.identifier = null;
    }

    fill(width, length) {
        let colors_vec = [];
        for (var i = 0; i < width; i+=r) {
            let sub_vec = [];
            for (var j = 0; j < length; j+=r) {
                sub_vec.push(new Color([0, 0, 0], 0));
            }
            colors_vec.push(sub_vec);
        }
        this.colors = colors_vec;
        return this;
    }

    set_identifier(identifer) {
        this.identifier = identifer;
        return this;
    }

    get_identifier(identifier) {
        return this.identifier;
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

let starting_point_1 = new StartingPoint(4*r, 4*r, r, r);
let starting_point_2 = new StartingPoint(12*r, 4*r, r, r);
let starting_point_3 = new StartingPoint(20*r, 4*r, r, r);

function color_from_value(value) {
    let angry = value["angry"];
    let happy = value["happy"];
    let sad = value["sad"];
    let surprised = value["surprised"];
    if (angry > happy && angry > sad) {
        return [255, 0, 0];
    }
    if (happy > angry && happy > sad) {
        return [0, 255, 0];
    }
    if (sad > happy && sad > angry) {
        return [0, 0, 255];
    }
    return [125, 0, 0];
}

let total_x = 100;
let total_y = 50;
let updated = false;

function setup() {
    createCanvas(total_x*r, total_y*r);
}

function draw() {
    frameRate(5)
    background(0);
    current_time = Date.now();
  
    let int = random(1);
    let index= parseInt(Math.ceil(random() * 3));
    let rd = [255,0,0]; let gr=[0,255,0]; let bl=[0,0,255];
    let inp = [rd,gr,bl];
    var col= random(inp);

    let int2 = random(1);
    var col2 = random(inp);

    let int3 = random(1);
    var col3 = random(inp);

    let limit1 = ceil(18*int);
    let limit2 = ceil(25*int2);
    let limit3 = ceil(15*int3);

   if (current_time - last_updated_time > 2000.0) {
        // Replace this with you IP address
        let url = 'https://192.168.1.205:4000/get_all_emotions';
        httpGet(url, 'json', false, function(response) {
            console.log(response);
            col = col;
            col2 = col2;
            col3 = col3;
            for (const [key, value] of Object.entries(response)) {
                if (starting_point_1.get_identifier() === null || starting_point_1.get_identifier() === undefined || starting_point_1.get_identifier() === key) {
                    starting_point_1 = starting_point_1.set_identifier(key);
                    col_val = color_from_value(value);
                    col[0] = col_val[0];
                    col[1] = col_val[1];
                    col[2] = col_val[2];
                    console.log("Whats the color", col);
                    continue;
                }
                if (starting_point_2.get_identifier() === null || starting_point_2.get_identifier() === undefined || starting_point_2.get_identifier() === key) {
                    starting_point_2 = starting_point_2.set_identifier(key);
                    col_val = color_from_value(value);
                    console.log("Whats the color2", col2);
                    col2[0] = col_val[0];
                    col2[1] = col_val[1];
                    col2[2] = col_val[2];
                    continue;
                }
                if (starting_point_3.get_identifier() === null || starting_point_3.get_identifier() === undefined || starting_point_3.get_identifier() === key) {
                    starting_point_3 = starting_point_3.set_identifier(key);
                    col_val = color_from_value(value);
                    console.log("Whats the color3", col3);
                    col3[0] = col_val[0];
                    col3[1] = col_val[1];
                    col3[2] = col_val[2];
                    continue;
                }
            }

            console.log("Final colors here", col, col2, col3);
        });
        console.log("What are tehe colors now", col, col2, col3);
        starting_point_1 = starting_point_1.fill(width, height);
        starting_point_2 = starting_point_2.fill(width, height);
        starting_point_3 = starting_point_3.fill(width, height);
        starting_point_1 = iterate(starting_point_1, col, 1, limit1);
        starting_point_2 = iterate(starting_point_2, col2, 1, limit2);
        starting_point_3 = iterate(starting_point_3, col3, 1, limit3);
        last_updated_time = current_time;
        console.log("We are in this branch", starting_point_1.get_identifier(), starting_point_2.get_identifier(), starting_point_3.get_identifier(), col, col2, col3);
        updated = true;
        console.log("colors", starting_point_1.colors[0][0]);
   } else {
       if (updated) {
            starting_point_1 = iterate(starting_point_1, col, 1, -1);
            starting_point_2 = iterate(starting_point_2, col2, 1, -1);
            starting_point_3 = iterate(starting_point_3, col3, 1, -1);
            console.log(starting_point_1.colors[0][0].color);
       }
   }

    // starting_point_1 = iterate(starting_point_1, col, 1, limit1);
    // starting_point_2 = iterate(starting_point_2, col2, 1, limit2);
    // starting_point_3 = iterate(starting_point_3, col3, 1, limit3);

    for (var i = 0; i < starting_point_1.colors.length; i+= 1) {
        for (var j = 0; j < starting_point_1.colors[i].length; j += 1) {
            let color_red = (starting_point_1.colors[i][j].color[0]+ starting_point_2.colors[i][j].color[0] +starting_point_3.colors[i][j].color[0]);
            let color_blue = (starting_point_1.colors[i][j].color[1]+ starting_point_2.colors[i][j].color[1] +starting_point_3.colors[i][j].color[1]);
            let color_green = (starting_point_1.colors[i][j].color[2]+ starting_point_2.colors[i][j].color[2]+ starting_point_3.colors[i][j].color[2]);
            fill([color_red, color_blue, color_green]);
            //rect(i * r, j * r, r, r);
          //background(0);
          circle(i * r+r/2, j * r+r/2, r-2);
        }
    }
    for (var x = 0; x < width; x += r) {
		for (var y = 0; y < height; y += r) {
			stroke(0);
			strokeWeight(0);
			line(x, 0, x, height);
			line(0, y, width, y);
		}
    
	}
}

function iterate(starting_point_1, col, int, limit) {
    if (limit == -1) {
        return starting_point_1;
    }
    starting_point_1.colHist.push(col);
    starting_point_1.intHist.push(int);
  
    // let l=colHist.length;
    let l = starting_point_1.colHist.length;
    print (l);

    let rectx = starting_point_1.a;
    let recty = starting_point_1.b;

    let do_we_stop = false;

    if (l > limit) {
        do_we_stop = true;
        starting_point_1.colHist.shift();
        starting_point_1.intHist.shift();
        l = starting_point_1.colHist.length;
    }

    let n = 0;

    for (i=0; i<l; i++) {
        fill(starting_point_1.colHist[0+i]);
        let intensity = starting_point_1.intHist[i] * ((i + 1) / l);
        let s = i;
        let movementx = starting_point_1.c - 2 * s * r;
        let movementy = starting_point_1.d - 2 * s * r;
        let color = starting_point_1.colHist[0+i];
        let new_color = [color[0] * intensity, color[1] * intensity, color[2] * intensity];

        // rect(starting_point_1.a + s*r, starting_point_1.b+ s*r, movementx, movementy);
        console.log("Whats the point x and point y", starting_point_1.a + s * r, starting_point_1.b + s * r);
        starting_point_1 = fill_colors(starting_point_1, starting_point_1.a + s * r, starting_point_1.b + s * r, movementx, movementy, new_color, rectx, recty);

        let posx = starting_point_1.a + s*r-ceil(random(1*r))*(r - n);
        let posy = starting_point_1.b + s*r-ceil(random(1*r))*(r - n);
        console.log("Whats the point x and point y", posx, posy);
        // rect(posx, posy, movementx, movementy);
        starting_point_1 = fill_colors(starting_point_1, posx, posy, movementx, movementy, new_color, rectx, recty);

        posx = starting_point_1.a + s*r+ceil(random(1*r))*(r - n);
        posy = starting_point_1.b + s*r-ceil(random(1*r))*(r - n);
        console.log("Whats the point x and point y", posx, posy);
        // rect(posx, posy, movementx, movementy);
        starting_point_1 = fill_colors(starting_point_1, posx, posy, movementx, movementy, new_color, rectx, recty);

        posx = starting_point_1.a + s*r-ceil(random(1*r))*(r - n);
        posy = starting_point_1.b + s*r-ceil(random(1*r))*(r - n);
        console.log("Whats the point x and point y", posx, posy);
        // rect(posx, posy, movementx, movementy);
        starting_point_1 = fill_colors(starting_point_1, posx, posy, movementx, movementy, new_color, rectx, recty);

        posx = starting_point_1.a + s*r-ceil(random(1*r))*(r - n);
        posy = starting_point_1.b + s*r+ceil(random(1*r))*(r - n);
        console.log("Whats the point x and point y", posx, posy);
        // rect(posx, posy, movementx, movementy);
        starting_point_1 = fill_colors(starting_point_1, posx, posy, movementx, movementy, new_color, rectx, recty);
    }
    for (var x = 0; x < width; x += r) {
        for (var y = 0; y < height; y += r) {

        }
    }

    if (!do_we_stop) {
        starting_point_1.a= starting_point_1.a-r; 
        starting_point_1.b= starting_point_1.b-r;
        starting_point_1.c = starting_point_1.c + 2*r;
        starting_point_1.d = starting_point_1.d + 2*r;
    }
    return starting_point_1;
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
                starting_point.colors[i][j].color = color;
                // console.log(i, j, color);
                total_infected += 1;
            }
        }
    }
    // console.log("total infected", total_infected);
    return starting_point;
}