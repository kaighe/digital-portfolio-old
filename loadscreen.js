function createHTML(){
    html = `<link href="file:///C:/Users/kaial/OneDrive%20-%20Board%20of%20Education%20of%20SD%2039%20(Vancouver)/DigitalPortfolio-main/loadscreen.css" rel="stylesheet" type="text/css" />
    <div class="cover">
        <div class="center">
            <div class="loading loading1"></div>
            <div class="loading loading2"></div>
            <div class="loading loading3"></div>
        </div>
    </div>`
    return html
}

function fadeOut(){
    cover = document.getElementsByClassName("cover")[0]
    cover.classList.add("fade")
    setTimeout(() => {
        cover.remove()
    }, 1000);
    loading = Array.prototype.slice.call( document.getElementsByClassName("loading"))
    elements = document.body.getElementsByTagName("*");
    for(var i = 0; i < elements.length; i++){
        if(!loading.includes(elements[i])){
            elements[i].style.animationPlayState="running"
        }
    }
}


function loaded(){
    image_count += 1
    if(image_count >= images.length){
        setTimeout(() => {
            fadeOut()
        }, 1000);
    }
}

function loop(e){
    if(e.complete){
        loaded()
    }else{
        setTimeout(() => {
            loop(e)
        }, 1000);
    }
}

document.body.insertAdjacentHTML('afterbegin', createHTML());
images = Array.prototype.slice.call(document.getElementsByTagName("img"))
image_count = 0

window.onload = function(){
    loading = Array.prototype.slice.call( document.getElementsByClassName("loading"))
    elements = document.body.getElementsByTagName("*");
    for(var i = 0; i < elements.length; i++){
        if(!loading.includes(elements[i])){
            elements[i].style.animationPlayState="paused"
        }
    }
    for(var i = 0; i < images.length; i++){
        loop(images[i])
    };
    if(image_count >= images.length){
        setTimeout(() => {
            fadeOut()
        }, 1000);
    }
}