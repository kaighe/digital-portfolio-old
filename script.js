var getJSON = function(url, callback) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';

  xhr.onload = function() {

      var status = xhr.status;

      if (status == 200) {
          callback(null, xhr.response);
      } else {
          callback(status);
      }
  };

  xhr.send();
};

var projects;
getJSON('./projects/projects.json',  function(err, data) {
  projects = data;
  load()
});

function createHTML(proj, index){
  html = `<li class="carousel-item-`+index+` carousel-item">
    <a class="project-card fadein" href="./projects/`+ proj.link +`">
    <img class="project-card-image" src="./projects/`+ proj.img +`">
    <div class="project-card-description">
        `+ proj.description +`
    </div>
    <div class="project-card-info">
        <span class="project-card-title">`+ proj.title +`</span>
        <span style="color: #FFD700;">` + Array(Math.floor(proj.score)+1).join("★") + `</span><!--
        --><span style="">` + Array(5-Math.floor(proj.score)+1).join("☆") + `</span>
        <br>
        <span class="project-card-language">`+ proj.lang +`</span>
        <span class="project-card-language" style="color:grey;">`+ new Date(proj.date).toLocaleDateString() +`</span>
    </div>
  </a>
</li>`
  return html
}

function orderByCool(list){
  for(var i = 0; i <= list.length-1; i++){
      for(var j = 0; j < ( list.length - i -1); j++){
          if(list[j].score < list[j+1].score){
              var temp = list[j]
              list[j] = list[j + 1]
              list[j+1] = temp
          }
      }
  }
}

function load(){
  orderByCool(projects)
  projects = projects.slice(0, 4)

  showcase = document.getElementsByClassName("project-carousel")[0]

  for(var i = 0; i < projects.length; i++){
    if(i == 0){
      index = "prev"
    }else if(i == 1){
      index = "current"
    }else if(i == 0){
      index = "next"
    }else{
      index = "out"
    }
    showcase.insertAdjacentHTML('beforeend', createHTML(projects[i], index));
  }

}

letters = document.getElementsByClassName("rainbow-letter")

const birthday = Date.parse('May 1 2005 4:35:45');

const letter_timeouts = []

for(var i = 0; i < letters.length; i++){
  letter_timeouts.push(0)
  letters[i].onmouseover = function(e){
    for(var i = 0; i < letters.length; i++){
      if(e.target == letters[i]){
        letter_timeouts[i] = 100
      }
    }
    e.target.className = "rainbow-letter rainbow-letter-big"
    e.target.style.color = "rgb(" + Math.floor(Math.random()*255) +","+ Math.floor(Math.random()*255) +","+ Math.floor(Math.random()*255) + ")"
  }
}


window.requestAnimationFrame(tick)

function tick(t){
  for(var i = 0; i < letter_timeouts.length; i++){
    if(letter_timeouts[i] == 0){
      letters[i].className = "rainbow-letter"
      letters[i].style.color = "var(--color4)"
    }else{
      letter_timeouts[i] -= 1;
    }
  }
  //console.log(letter_timeouts)

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