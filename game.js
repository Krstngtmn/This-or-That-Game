// Selectors

const nameInputContainer = document.querySelector('.your-name');
const startBtn = document.querySelector('.button');
const inputBox = document.querySelector('#username');
const photoOne = document.querySelector('.player1 .photo img');
const photoTwo = document.querySelector('.player2 .photo img');

const URL = `https://api.unsplash.com/photos/random?orientation=portrait&count=10&client_id=Jz_sxrnyjigFt20WIhhLqDP3sKfLRJGlMrubpJfbZ4M`;
const picArray = [];

//Calling the API

fetch(URL)
	.then(function(response) {
		if (response.ok) {
			return response.json();
		}
		return Promise.reject('something went wrong');
	})
	.then(function(data) {
		for (let i = 0; i < data.length; i++) {
			picArray.push(data[i].urls.small);
		}
	})
	.catch(function(err) {
		console.log('Error:' + err);
	});

//Loading photos and making the sections appear/disappear

function loadPictures() {
	if (inputBox.value.length > 0) {
		const playerName = inputBox.value;
		console.log(playerName);
		inputBox.value = '';

		photoOne.src = picArray[0]; //initial photo load, first and last of the array
		photoTwo.src = picArray[picArray.length - 1];

		nameInputContainer.classList.add('hidden'); //when submit button is hit, input box disappears
		photoOne.parentNode.classList.add('visible'); // 2 photo boxes appear right after
		photoTwo.parentNode.classList.add('visible');

		picArray.shift(); // after first 2 photos are loaded from the array (first and last) the function removes them
		picArray.pop();
	}
}

// Eventlistener
startBtn.addEventListener('click', loadPictures);

//Picking one photo over the other

function changePicture(event) {  //when either container is clicked the picarray.shift() will remove it from the beginning of the array and move on to the next photo.
	if (picArray.length > 0) {
		event.target.src = picArray[0]; //event.target.src allows to not worry about which photo will be clicked, it will be targeted by the event.
		picArray.shift();
	} else { // creating situation when array has ended
		if (event.target.classList.contains('clickable')) {	//I added class to img element so I can target it
			const parent = event.target.parentNode; // targeting the 'photo' divs that have img elements in them
			const winnerText = document.createElement('h3'); // I want to display Winner text in the empty container
			winnerText.innerHTML = 'Winner!';

			event.target.remove(); //removes clicked photo after array is empty
			parent.appendChild(winnerText); //replaces it with the h3

			photoOne.classList.remove('clickable'); //removes clickable classes from img elements so they cant be clicked after winner is announced
			photoTwo.classList.remove('clickable');
		}
	}
}

photoOne.addEventListener('click', changePicture);
photoTwo.addEventListener('click', changePicture);
