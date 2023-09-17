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

var url = new URL(window.location.href);

var projects;

getJSON('./projects.json',  function(err, data) {
    projects = data;
});

function orderByNewest(list){
    for(var i = 0; i <= list.length-1; i++){
        for(var j = 0; j < ( list.length - i -1); j++){
            if(new Date(list[j].date) < new Date(list[j+1].date)){
                var temp = list[j]
                list[j] = list[j + 1]
                list[j+1] = temp
            }
        }
    }
}

function orderByOldest(list){
    for(var i = 0; i <= list.length-1; i++){
        for(var j = 0; j < ( list.length - i -1); j++){
            if(new Date(list[j].date) > new Date(list[j+1].date)){
                var temp = list[j]
                list[j] = list[j + 1]
                list[j+1] = temp
            }
        }
    }
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

function createHTML(proj){
    html = `<a class="project-card fadein" href=".`+ proj.link +`">
    <img class="project-card-image" src=".`+ proj.img +`">
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
</a>`
    return html
}

function load(filt){
    project_cards = document.getElementsByClassName("project-showcase")[0].children
    for(var i = project_cards.length-1; i > -1; i--){
        project_cards[i].classList.remove("fadein")
        project_cards[i].classList.add("fadeout")
    }
    setTimeout(() => {
        for(var i = project_cards.length-1; i > -1; i--){
            project_cards[i].remove()
        }

        if(filt == "coolness"){
            orderByCool(projects)
        }else if(filt == "newest"){
            orderByNewest(projects)
        }else if(filt == "oldest"){
            orderByOldest(projects)
        }
    
        showcase = document.getElementsByClassName("project-showcase")[0]
    
        for(var i = 0; i < projects.length; i++){
            showcase.insertAdjacentHTML('beforeend', createHTML(projects[i]));
        }
    }, 500);
}

load(url.searchParams.get('filter'))
filter.value = url.searchParams.get('filter')

filter.addEventListener("change", function(e){
    //url.searchParams.set('filter', e.target.value);
    //window.location.href = url.href

    load(e.target.value)
});