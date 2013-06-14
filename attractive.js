var startLorenz = function(ctx, w, h, rho, sigma, beta) {
    document.getElementById('rho').innerHTML = rho.toFixed(4);
    document.getElementById('sigma').innerHTML = sigma.toFixed(4);
    document.getElementById('beta').innerHTML = beta.toFixed(4);

    var short_max = w < h ? w : h;
    var i = 0;
    var x = 1, y = 4, z = 4;
    var dx = 0, dy = 0, dz = 0;
    var dt = 0.008;
    var v;

    while (i < 5000) {
        ctx.strokeStyle = hsv2rgb(3 * z + 90, 1, 1);
        ctx.beginPath();
        ctx.moveTo(translate(x, w, short_max), translate(y, h, short_max));

        i++;

        dx = sigma * (y - x);
        dy = x * (rho - z) - y;
        dz = x * y - beta * z;

        x += dt * dx;
        y += dt * dy;
        z += dt * dz;

        ctx.lineTo(translate(x, w, short_max), translate(y, h, short_max));
        ctx.stroke();
    }
}

var hsv2rgb = function(h, s, v) {
    var c = v * s;
    var h_ = h / 60;
    var x = c * (1 - Math.abs(h_ % 2 - 1));
    var r, g, b;

    if (0 <= h_ && h_ < 1) {
        r = c;
        g = x;
        b = 0;
    } else if (1 <= h_ && h_ < 2) {
        r = x;
        g = c;
        b = 0;
    } else if (2 <= h_ && h_ < 3) {
        r = 0;
        g = c;
        b = x;
    } else if (3 <= h_ && h_ < 4) {
        r = 0;
        g = x;
        b = c;
    } else if (4 <= h_ && h_ < 5) {
        r = x;
        g = 0;
        b = c;
    } else if (5 <= h_ && h_ < 6) {
        r = c;
        g = 0;
        b = x;
    }

    var m = v - c;
    r = Math.floor(255 * (r + m));
    g = Math.floor(255 * (g + m));
    b = Math.floor(255 * (b + m));
    return "rgb(" + r + "," + g + "," + b + ")";
}

var translate = function(val, max, short_max) {
    return max / 2 + val * (short_max / 50);
}

// thanks, paulirish.com!
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var t = 0;
var paused = false;
var draw = function() {
    if (!paused) requestAnimFrame(draw);

    /* this goes from 0 to 1 to 0 linearly. */
    var m = 1 - Math.abs((t++) % 1000 - 500) / 500;

    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ctx = document.getElementById('canvas').getContext('2d');
    startLorenz(ctx, canvas.width, canvas.height, 50 * m, 10, 8/3);
}

window.onkeyup = function(ev) {
    if (ev.keyCode == 32) {
        paused = !paused;
        if (!paused) draw();
    }
}

window.onload = draw;
window.onresize = draw;
