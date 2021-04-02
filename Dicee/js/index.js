var randomNumber1 = Math.floor(Math.random() * 6) + 1;
document.querySelectorAll('img')[0].src = "images/dice"+randomNumber1+".png";

var randomNumber2 = Math.floor(Math.random() * 6) + 1;
document.querySelectorAll('img')[1].src = "images/dice"+randomNumber2+".png";

if (randomNumber1 > randomNumber2){
  document.getElementById('h1').innerHTML = "🥳Player 1 Won🎊";
}
else if (randomNumber2 > randomNumber1){
  document.getElementById('h1').innerHTML = "🥳Player 2 Won🎊";
}
else {
  document.getElementById('h1').innerHTML = "🥴DRAW🥴";
}