var option=6;
var lives=3;
var lifeDisplay=document.querySelector("#lives span");
var gamemode='hard';                                            //keeps track of current gamemode
var boxes=document.querySelectorAll(".box");
var colorDisplay=document.querySelector("#colorDisplay");
var reset=document.querySelector("#reset");
var easy=document.querySelector("#easy");
var hard=document.querySelector("#hard");
var colors=colorGenerator(option);
var pickedColor=colorPicker();
colorDisplay.innerHTML=pickedColor;
lifeDisplay.innerHTML=lives;
hard.classList.add("selectedOption");                           //hard selected by default

//if easy if clicked

easy.addEventListener("click",function(){
    if(gamemode!='easy'){
        option=3;
        lives=2;            
        lifeDisplay.innerHTML=lives;                                   //set no of boxes =3
        this.classList.add("selectedOption");                   //change css of button
        hard.classList.remove("selectedOption");                
        colors=colorGenerator(option);                          //generate 3 new colors now 
        pickedColor=colorPicker();                              //pick one out of them
        colorDisplay.innerHTML=pickedColor;
        for(var i=0 ;i<boxes.length; i++){                      //repaint the boxes 
            if(colors[i]){
                boxes[i].style.backgroundColor=colors[i];
            }
            else boxes[i].style.backgroundColor="#232323";
        }
        gamemode='easy';
    }
});

hard.addEventListener("click",function(){
    if(gamemode!='hard'){
        option=6;
        lives=3;
        lifeDisplay.innerHTML=lives;
        this.classList.add("selectedOption");                   //same as for easy option
        easy.classList.remove("selectedOption");
        colors=colorGenerator(option);      
        pickedColor=colorPicker();
        colorDisplay.innerHTML=pickedColor;
        for(var i=0 ;i<boxes.length; i++){
            if(colors[i]){
                boxes[i].style.backgroundColor=colors[i];
            }
            else boxes[i].style.backgroundColor="#232323";
        }
        gamemode='hard';
    }
});

for(var i=0 ;i<boxes.length; i++){
    if(colors[i]){
        boxes[i].style.backgroundColor=colors[i];
    }
    else boxes[i].style.backgroundColor="#232323";
    boxes[i].addEventListener("click",function(){
            if(this.style.backgroundColor===pickedColor){
                colorChange();
                document.querySelector("h1").style.backgroundColor=pickedColor;
                document.getElementById("message").textContent="Correct!";
                reset.innerHTML="Play Again?";
            }
            else{
                this.style.backgroundColor="#232323";
                document.getElementById("message").textContent="Try Again!";
                lives--;
                lifeDisplay.innerHTML=lives;
                if(lifeDisplay.innerHTML==0){
                    alert("GAME OVER :-( press OK to restart the game");
                    reset.click();
                }
            }
    });
}

function colorChange(){
    for(var i=0 ;i<colors.length; i++){
        boxes[i].style.backgroundColor=pickedColor;
    }
}
function colorPicker(){                                     //picks one color out of the arr of generated colors
    var picked=Math.floor(Math.random()*option);
    return colors[picked];
}
function colorGenerator(num){                               //generates an array with given number of colors
    var arr=[];
    for(var i=0; i<num; i++){
        var r=Math.floor(Math.random()*256);
        var g=Math.floor(Math.random()*256);
        var b=Math.floor(Math.random()*256);
        arr.push("rgb("+r+", "+g+", "+b+")");
    }
    return arr;
}


/*functioning of reset button*/


reset.addEventListener("click",function(){
    colors=colorGenerator(option);
    if(gamemode=='easy'){
        lives=2;
        lifeDisplay.innerHTML=lives;
    }
    else lives=3;
    lifeDisplay.innerHTML=lives;
    pickedColor=colorPicker();
    colorDisplay.innerHTML=pickedColor;
    for(var i=0 ;i<boxes.length; i++){
        if(colors[i]){
            boxes[i].style.backgroundColor=colors[i];
        }
        else boxes[i].style.backgroundColor="#232323";
    }
    document.getElementById("message").textContent="";
    reset.textContent="NEW COLORS?";
    document.querySelector("h1").style.backgroundColor="steelblue";
});

/*setting transition for all*/

for(var i=0; i<boxes.length; i++){
    boxes[i].style.transition="all 0.5s";
}
document.querySelector("h1").style.transition="all 0.5s";
