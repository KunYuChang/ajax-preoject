// ****** TEXT DATA ******
let textButton = document.getElementById('text');
textButton.addEventListener('click', () => {
	// prepare the request
	let url = './data/data.txt';
	axios.get(url).then((res) => {
		if (res.status !== 200) {
			console.log('oops');
			return;
		}
		let text = res.data;
		showTextData(text);
	});

	// lets define a display text function
	let showTextData = (text) => {
		let messageTemplate = `<p>${text}</p>`;
		document.getElementById('textCard').innerHTML = messageTemplate;
	};
});

// ****** JSON DATA ******

let JSONButton = document.getElementById('json');
JSONButton.addEventListener('click', () => {
	let url = './data/data.json';
	// prepare the request
	axios.get(url).then((res) => {
		if (res.status !== 200) {
			console.log('oops');
			return;
		}
		let JSdata = res.data;
		showJSONData(JSdata);
	});

	// display JSON data
	let showJSONData = (dataObject) => {
		let messageTemplate = `<p>${dataObject.book} ${dataObject.verse}</p>`;
		document.getElementById('JSONCard').innerHTML = messageTemplate;
	};
});

// ****** API DATA ******

let APIButton = document.getElementById('api');
APIButton.addEventListener('click', () => {
	// create AJAX object
	let url = 'https://bible-api.com/Proverbs+22:1';
	axios.get(url).then((res) => {
		if (res.status !== 200) {
			console.log('oops');
			return;
		}
		let JSdata = res.data;
		showAPIData(JSdata);
	});

	// display API data
	let showAPIData = (dataObject) => {
		let messageTemplate = `<p>${dataObject.reference} ${dataObject.verses[0].text}</p>`;
		document.getElementById('APICard').innerHTML = messageTemplate;
	};
});
