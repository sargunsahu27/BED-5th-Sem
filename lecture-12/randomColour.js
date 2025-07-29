let box=document.querySelector("#box");
let btn=document.querySelector("#btn");
let stop=document.querySelector("#stop");
let id; // to store interval id
let colours = ["red", "green", "blue", "yellow", "pink", "purple", "orange", "cyan", "black","grey"];
function getRandomColour() {
    let randomIndex = Math.floor(Math.random() * colours.length);
    console.log(randomIndex);
    
    let randomColour = colours[randomIndex];
    console.log(randomColour);
    box.style.backgroundColor = randomColour;
}
btn.addEventListener("click", () => {
    id=setInterval(() => {
        getRandomColour();
    }, 500);
    //getRandomColour();

});
stop.addEventListener("click", () => {
    if(id){
        clearInterval(id);
    }
});


