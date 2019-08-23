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
            jokeBTN.innerHTML = `<p></p>`;
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
            joke.innerHTML =`Fetch Error, check your Internet Connection`;
        });
}

document.getElementById('get-joke').addEventListener('click', getjoke);
