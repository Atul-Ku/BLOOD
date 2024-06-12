const changecolor=document.getElementsByClassName("mylink")

for (let i = 0; i < changecolor.length; i++) {
    changecolor[i].addEventListener("mouseover",function(){
        changecolor[i].style.backgroundColor = "yellow";
        changecolor[i].style.textDecoration="underline";
        changecolor[i].style.color="black";
    })
}

for (let i = 0; i < changecolor.length; i++) {
    changecolor[i].addEventListener("mouseout",function(){
        changecolor[i].style.backgroundColor = "rgb(255,255,255,0.017)";
        changecolor[i].style.textDecoration="none";
        changecolor[i].style.color="white";
    })
}