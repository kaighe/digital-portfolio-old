var url = new URL(window.location.href);

projects = [
    {
        "title":"MinePath", 
        "description":"A modified minecraft client with pathfinding capabilities.", 
        "lang":"Java", 
        "img":"./images/MinePath.png", 
        "link":"./MinePath", 
        "score":4, 
        "date": Date.parse('Sept 1 2020 0:0:0')
    },
    {
        "title":"GPX to OBJ Converter", 
        "description":"A tool to help generate 3D object files from Google maps data.", 
        "lang":"Python", 
        "img":"./images/GPXtoOBJheight.png", 
        "link":"./GPXtoOBJ", 
        "score":2.5, 
        "date": Date.parse('Aug 19 2021 0:0:0')
    },
    {
        "title":"Here Come The Frogs", 
        "description":"My first experience with webdev. Just click frogs to make more.", 
        "lang":"Javascript, HTML", 
        "img":"./images/frogs.PNG", 
        "link":"./Frogs", 
        "score":3, 
        "date": Date.parse('Feb 1 2022 0:0:0')
    },
    {
        "title":"Mots Mechants", 
        "description":"A french language learning/fighting game using insults.", 
        "lang":"GML", 
        "img":"./images/MotsMechants.png", 
        "link":"./MotsMechants", 
        "score":5, 
        "date": Date.parse('June 20 2022 0:0:0')
    },
    {
        "title":"Digital Portfolio", 
        "description":"A website (this website) I created for university applications.", 
        "lang":"HTML, Javascript, CSS", 
        "img":"./images/Portfolio.png", 
        "link":"../", 
        "score":4.5, 
        "date": Date.parse('Nov 1 2022 0:0:0')
    },
    {
        "title":"Boogie", 
        "description":"A Discord bot that can play music into voice chat.", 
        "lang":"Javascript", 
        "img":"./images/boogie.jpg", 
        "link":"./Boogie", 
        "score":4.2, 
        "date": Date.parse('July 19 2020 0:0:0')
    },
    {
        "title":"Wave Function Collapse", 
        "description":"My own interpretation of the Wave Function Collapse program.", 
        "lang":"Python", 
        "img":"./images/wavefunction.png", 
        "link":"./WaveFunction", 
        "score":3, 
        "date": Date.parse('Dec 5 2022 0:0:0')
    },
    {
        "title":"SOT Fishing Tool", 
        "description":"A tool to make fishing easier in the game Sea of Thieves.", 
        "lang":"Python", 
        "img":"./images/fish.png", 
        "link":"https://github.com/KaiSomething/SOTFisher", 
        "score":4, 
        "date": Date.parse('Oct 15 2022 0:0:0')
    }
]

function orderByNewest(list){
    for(var i = 0; i <= list.length-1; i++){
        for(var j = 0; j < ( list.length - i -1); j++){
            if(list[j].date < list[j+1].date){
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
            if(list[j].date > list[j+1].date){
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
    html = `<a class="project-card fadein" href="`+ proj.link +`">
    <img class="project-card-image" src="`+ proj.img +`">
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