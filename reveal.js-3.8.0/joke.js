var joke = document.getElementById('joke');
var counter = document.getElementById('counter');
var jokeBTN = document.getElementById('get-joke');
let clickCount = 6;

getjoke();

function getjoke(){
    if(clickCount<=5){
        counter.innerHTML = `<p style="font-size: 22px">Do not click ${clickCount} more times</p>`;
        if(clickCount <= 0){
            counter.innerHTML = `<p></p>`;
            joke.innerHTML = `<img src="./imgs/joke.gif"></img>`;
            jokeBTN.innerHTML = `<p style="font-size: 18px">Nothing interesting left here, you just saw a weird API handling flex stunt. Let's go back up again. PRO TIP: Swipe left to move right or just press right.</p>
            <p style="font-size: 14px">PS: Got angry? I tend to do so. I'm a debater afterall.</p>`;
        }
    }
    clickCount -= 1;
    fetch('https://official-joke-api.appspot.com/random_joke').then(
    function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
        }
        response.json().then(function(data) {
            if(clickCount>-1){
                joke.innerHTML = `<p>${data.setup}</p><p>${data.punchline}</p>`;
            }
            else{
                joke.innerHTML = `<img src="./imgs/joke.gif"></img>`;
            }
        });

        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}

document.getElementById('get-joke').addEventListener('click', getjoke);