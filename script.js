letters = document.getElementsByClassName("rainbow-letter")

const birthday = Date.parse('May 1 2005 4:35:45');

letter_timeouts = []

for(var i = 0; i < letters.length; i++){
  letter_timeouts.push(0)
  letters[i].onmouseover = function(e){
    e.target.className = "rainbow-letter-big"
    e.target.style.color = "rgb(" + Math.floor(Math.random()*255) +","+ Math.floor(Math.random()*255) +","+ Math.floor(Math.random()*255) + ")"
    for(var i = 0; i < letters.length; i++){
      if(e.target == letters[i]){
        letter_timeouts[i] == 100
      }
    }
    setTimeout(function(){
      //e.target.className = "rainbow-letter"
      //e.target.style.color = "var(--color4)"
    }, 500);
  }
}

window.requestAnimationFrame(tick)

function tick(t){
  for(var i = 0; i < letters.length; i++){
    if(letter_timeouts[i] == 0){
      letters[i].className = "rainbow-letter"
      letters[i].style.color = "var(--color4)"
    }else{
      letter_timeouts[i] -= 1;
    }
  }

  age = Date.now()-birthday;
  years = Math.floor(age/31536000000)
  months = Math.floor((age/31536000000 - years)*12)
  days = Math.floor(((age/31536000000 - years)*12 - months)*30)
  hours = Math.floor((((age/31536000000 - years)*12 - months)*30 - days)*24)
  minutes = Math.floor(((((age/31536000000 - years)*12 - months)*30 - days)*24 - hours)*60)
  seconds = Math.floor((((((age/31536000000 - years)*12 - months)*30 - days)*24 - hours)*60 - minutes)*60)

  document.getElementsByClassName("age-years")[0].textContent = years + " years"
  document.getElementsByClassName("age-months")[0].textContent = months + " months"
  document.getElementsByClassName("age-days")[0].textContent = days + " days"
  document.getElementsByClassName("age-hours")[0].textContent = hours + " hours"
  document.getElementsByClassName("age-minutes")[0].textContent = minutes + " minutes"
  document.getElementsByClassName("age-seconds")[0].textContent = seconds + " seconds"

  window.requestAnimationFrame(tick)
}

var carousel_update_timeout = setTimeout(carousel_update, 5000);

function loop_value(a, b){
  a = a%b
  if(a < 0){
    a = b+a
  }
  return a
}

function carousel_right(){
  items = document.getElementsByClassName("carousel-item")
  for(var i = 0; i < items.length; i++){
    if(items[i].classList.contains("carousel-item-current")){
      items[loop_value(i-1, items.length)].className = "carousel-item-out carousel-item"
      items[loop_value(i, items.length)].className = "carousel-item-prev carousel-item"
      items[loop_value(i+1, items.length)].className = "carousel-item-current carousel-item"
      items[loop_value(i+2, items.length)].className = "carousel-item-next carousel-item"
      break
    }
  }
}

function carousel_left(){
  items = document.getElementsByClassName("carousel-item")
  for(var i = 0; i < items.length; i++){
    if(items[i].classList.contains("carousel-item-current")){
      items[loop_value(i+1, items.length)].className = "carousel-item-out carousel-item"
      items[loop_value(i, items.length)].className = "carousel-item-next carousel-item"
      items[loop_value(i-1, items.length)].className = "carousel-item-current carousel-item"
      items[loop_value(i-2, items.length)].className = "carousel-item-prev carousel-item"
      break
    }
  }
}

function carousel_update(){
  carousel_right()

  carousel_update_timeout = setTimeout(carousel_update, 5000);
}