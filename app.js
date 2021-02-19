const click = {
    button: 0,
    window:0,
    maximize(){
        if($('.window').hasClass('maximized')){
            return;
        }
        
        if($('.window').hasClass('minimized')){
            $('.window').removeClass('minimized');
            $('.window').addClass('maximized');
            
        }

        else{
            $('.window').addClass('maximized');
            
        }
    },

    minimize(){
        if($('.window').hasClass('minimized')){
            return;
        }

        if($('.window').hasClass('maximized')){
            $('.window').removeClass('maximized');
            $('.window').addClass('minimized');
        }

        else{
            $('.window').addClass('minimized');
            
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
    $('#minimize').on('click', function(){
        click.minimize();
    })
    
    $('#maximize').on('click', function(){
        click.maximize();
    })
    
    $('#close').on('click', function(){
        if(click.window===0){
            $('.close-error-wrap').show();
        }
        else{
            $('.finish-error-wrap').show();
        }
    });
    
    $('#noBttn').on('click', function(){
        $('.close-error-wrap').hide();
        
    });

    $('#noBttn-finish').on('click', function(){
        $('.finish-error-wrap').hide();
        
    });
    
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
        $('.window').fadeOut(4000);
    });

}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
var chain = Promise.resolve();

function typeWriter (text, loc){
    
    let eachCaracter = text.split("");

    eachCaracter.forEach(caracter => {
        chain = chain.then(() => {
        
        $(`${loc}`).append(caracter);
        return wait(120);
        });
    });
}

function instantWriter (text, loc){
    $(`${loc}`).html(text);
}

function changeTextToLinks(n) {
    if(n===0){
        $('#cc3').html(`<a target="_blank" href="https://bit.ly/2QsKzC8">LinkedIn</a>`);
        $('#cc4').html(`<a target="_blank" href="https://github.com/jopms">GitHub</a>`);
    }
        else{$('#cc6').html(`<a target="_blank" href="https://jopms-notes-app.netlify.app/">note-app</a>`);
        $('#cc7').html(`<a target="_blank" href="https://jopms-weather-app.netlify.app/">weather-app</a>`);
        $('#cc8').html(`<a target="_blank" href="https://jopms-news-app.netlify.app/">news-app</a>`);}
}

function startsAnimation (){
    $('.center-window').on('click', () =>{
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
                    instantWriter (user.name, "#cc1");
                    instantWriter (user.avaiability, "#cc2");
                    instantWriter (user.linkedIn, "#cc3");
                    instantWriter (user.gitHub, "#cc4");
                    instantWriter (user.directory1, "#cc5");
                    changeTextToLinks(0);
                return wait(120);
                });
    
                setTimeout(() => {
                    typeWriter(user.projects,"#cc5");
                }, 1500);
                setTimeout(() => {
                    $("body").css("cursor", "progress");
                }, 4500);
                
    
                setTimeout(() => {
                    $("body").css("cursor", "default");
                    instantWriter (user.noteapp, "#cc6");
                    instantWriter (user.weather, "#cc7");
                    instantWriter (user.news, "#cc8");
                    instantWriter (user.directory1, "#cc9");
                    changeTextToLinks(1);
                }, 6000);
        }, 2300);
    } 
    });
}

    startsAnimation();
    userInteraction();





