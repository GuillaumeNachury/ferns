/**
*  @__Guillaume (Guillaume Nachury)
*  Very simple Barnsley fern generator
* https://fr.wikipedia.org/wiki/Foug%C3%A8re_de_Barnsley
*/
var cvs, ctx;
var _w= window.innerWidth, _h=window.innerHeight;
var ptr = 0, DEFINITION=500;

function generate(def){
    cvs = document.createElement('canvas');
    cvs.width = _w;
    cvs.height= _h;
    ctx = cvs.getContext('2d');
    ctx.fillStyle = randomizeColor();
    ctx.translate(_w>>1,_h);
    document.getElementById('playground').appendChild(cvs);

    generator().next();
}
function randomizeColor(){
    return "hsl("+Math.floor((Math.random()*10)+90)+", "+Math.floor((Math.random()*20)+50)+"%, "+Math.floor((Math.random()*50)+20)+"%)";
}

function map(x, iMin, iMax, oMin, oMax){
    return (x-iMin)*(oMax-oMin)/(iMax-iMin)+oMin;
}

function *generator(x=0,y=0){ 
    if(ptr++>DEFINITION) return;
    for(var i=0; i<100;i++){
        ctx.beginPath();
        ctx.arc(map(x, -2.1820, 2.6558, -(_w/2), _w/2), map(y,0,9.9983, 0,-_h), 1, 0, Math.PI * 2, true);
        ctx.fill();
        rng = Math.random();
        if(rng < .01) {
            x= 0;
            y= .16*y;
        }
        else if(rng < .86) {
            x= 0.85*x + 0.04*y;
            y= -0.04*x + 0.85*y + 1.6;
        }
        else if(rng < .93) {
            x= 0.2*x - 0.26*y;
            y= -0.23*x + 0.22*y + 1.6;
        }
        else{
            x= -0.15*x + 0.28*y;
            y= 0.26*x + 0.24*y + .44;
        }
    }
    ctx.fillStyle = randomizeColor();
    yield * generator(x, y);
}