const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
var chain = Promise.resolve();

const click = {
    button: 0,
    window:0,
    maximize(){
        if($('.console').hasClass('maximized')){
            return;
        }
        
        if($('.console').hasClass('minimized')){
            $('.console').removeClass('minimized');
            $('.console').addClass('maximized');
        }

        else{
            $('.console').addClass('maximized');   
        }
    },

    minimize(){
        if($('.console').hasClass('minimized')){
            return;
        }

        if($('.console').hasClass('maximized')){
            $('.console').removeClass('maximized');
            $('.console').addClass('minimized');
        }

        else{
            $('.console').addClass('minimized');
        }
    }
};

const user ={
    name: "Name: Joao Santos",
    linkedIn: "LinkedIn",
    gitHub: "GitHub",
    avaiability: "Availability : Available",
    directory1: "C:\\Users\\Joao> ",
    projects: 'dir /b "documents\\projects"',
    noteapp: 'note-app',
    weather: 'weather-app',
    news: 'news-app'
}


function userInteraction (){
    //console Minimize (adds class minimize)
    $('#minimize').on('click', function(){
        click.minimize();
    })
    
    //console Maximize (adds class maximize)
    $('#maximize').on('click', function(){
        click.maximize();
    })
    
    //console shows a impossible close console if user didnt see animation. Otherwise lets him close the console
    $('#close').on('click', function(){
        if(click.window===0){
            $('.close-error-wrap').show(); //Doesn't let user close console
        }
        else{
            $('.finish-error-wrap').show(); 
        }
    });
    
    //When Clicking the "No" button 
    $('#noBttn').on('click', function(){
        $('.close-error-wrap').hide();
    });

    $('#noBttn-finish').on('click', function(){
        $('.finish-error-wrap').hide();
        
    });
    
    //When clicking the "Yes" button
    $('#yesBttn').on('click', function(){
        document.getElementById('close-sound').currentTime = 0; 
        document.getElementById('close-sound').play();
        click.button ++;
        if(click.button === 1)$('#yesBttn').html('->');
        if(click.button === 5)$('#noBttn').html('CLICK ME');
        
    });

    $('#yesBttn-finish').on('click', function(){
        $('.finish-error-wrap').hide();
        document.getElementById('shutdown').play();
        $('.console').fadeOut(4000);
    });
}

//Writes a word (text) in a certian location (loc) with a 120ms delay of each character
function typeWriter (text, loc){
    
    let eachCaracter = text.split("");

    eachCaracter.forEach(caracter => {
        chain = chain.then(() => {
        
        $(`${loc}`).append(caracter);
        return wait(120);
        });
    });
}

//Writes a word (text) instantly in a certain location (loc) 
function instantWriter (text, loc){
    $(`${loc}`).html(text);
}

//Changes the text in CMD to 'a' links after the animation has finished
function changeTextToLinks(n) {
    if(n===0){
        $('#line3').html(`<a class ="link" target="_blank" href="https://bit.ly/2QsKzC8">LinkedIn</a>`);
        $('#line4').html(`<a class ="link" target="_blank" href="https://github.com/jopms">GitHub</a>`);
    }
        else{$('#line6').html(`<a class ="link" target="_blank" href="https://jopms-notes-app.netlify.app/">note-app</a>`);
        $('#line7').html(`<a class ="link" target="_blank" href="https://jopms-weather-app.netlify.app/">weather-app</a>`);
        $('#line8').html(`<a class ="link" target="_blank" href="https://jopms-news-app.netlify.app/">news-app</a>`);}
}

//Starts the animation whenever the user clicks the console
function startsAnimation (){
    $('.center-console').on('click', () =>{
        click.window ++;
        if(click.window>1) return;
        else{
        $('#cmd').prop("contenteditable",false);
        setTimeout(() => {
            typeWriter("whoami","#cmd");
        }, 500);
    
        setTimeout(() => {
            $("body").css("cursor", "progress");
        }, 1500);
    
        setTimeout(() => {
            $("body").css("cursor", "default");
                chain = chain.then(() => {
                    instantWriter (user.name, "#line1");
                    instantWriter (user.avaiability, "#line2");
                    instantWriter (user.linkedIn, "#line3");
                    instantWriter (user.gitHub, "#line4");
                    instantWriter (user.directory1, "#line5");
                    changeTextToLinks(0);
                return wait(120);
                });

                setTimeout(() => {
                    typeWriter(user.projects,"#line5");
                }, 1500);
                setTimeout(() => {
                    $("body").css("cursor", "progress");
                }, 4500);
                
    
                setTimeout(() => {
                    $("body").css("cursor", "default");
                    instantWriter (user.noteapp, "#line6");
                    instantWriter (user.weather, "#line7");
                    instantWriter (user.news, "#line8");
                    instantWriter (user.directory1, "#line9");
                    changeTextToLinks(1);
                }, 6000);
        }, 2300);
    } 
    });
}


startsAnimation();
userInteraction();





