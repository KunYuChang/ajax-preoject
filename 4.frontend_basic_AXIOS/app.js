// grab our page elements
let para = document.getElementsByTagName('p')[0];
let table = document.getElementById('tableResults');
let getButton = document.getElementById('get');
let postButton = document.getElementById('post');
let putButton = document.getElementById('put');
let deleteButton = document.getElementById('delete');

// define our base URL
const SERVER_URL = 'http://127.0.0.1:3500/api';
const DOG_URL = SERVER_URL + '/dogs/';

// ****** GET REQUEST ******
getButton.addEventListener('click', () => {
	fetchDogs((err) => {
		if (err) {
			console.log('oops, your FetchDogs function did not work!');
		} else {
			para.className = 'get';
			para.textContent = 'GET request was successful';
		}
	});
});

let fetchDogs = (callback) => {
	axios
		.get(DOG_URL)
		.then((res) => {
			let dogs = res.data;
			let tableRows = '';
			for (const dog of dogs) {
				tableRows += `
						<tr>
							<td>${dog.id}</td>
							<td>${dog.name}</td>
							<td>${dog.age}</td>
							<td>${dog.gender}</td>
							<td>${dog.notes}</td>
						</tr>
					`;
			}
			table.innerHTML = tableRows;
			callback(null);
		})
		.catch((err) => callback(err));
};

// ****** POST REQUEST ******
postButton.addEventListener('click', () => {
	let dog = {
		name: 'Woofey',
		age: 4,
		gender: 'male',
		notes: 'scruff scruff',
	};

	// send the new dog to our server and add it to our gogs array
	axios
		.post(DOG_URL, dog)
		.then((res) => {
			let responseData = res.data;
			fetchDogs((err) => {
				if (!err) {
					para.className = 'post';
					para.textContent = responseData.message;
				} else {
					console.log(
						'There was an error with your POST request. Here is a copy of yout error object',
						err
					);
				}
			});
		})
		.catch((err) => console.log(err));
});

// ****** PUT REQUEST ******
putButton.addEventListener('click', () => {
	let id = 1;
	let updateDog = {
		id: id,
		name: 'Skinny',
		age: 2,
		gender: 'female',
		notes: 'she likes tto chase her tail',
	};

	axios
		.put(DOG_URL + id, updateDog)
		.then((res) => {
			let responseData = res.data;
			fetchDogs((err) => {
				if (!err) {
					para.className = 'put';
					para.textContent = responseData.message;
				} else {
					console.log(
						'There was an error with your PUT request. Here is a copy of yout error object',
						err
					);
				}
			});
		})
		.catch((err) => console.log(err));
});

// ****** DELETE REQUEST ******
deleteButton.addEventListener('click', () => {
	let id = 1;

	axios
		.delete(DOG_URL + id)
		.then((res) => {
			let responseData = res.data;
			fetchDogs((err) => {
				if (!err) {
					para.className = 'delete';
					para.textContent = responseData.message;
				} else {
					console.log(
						'There was an error with your DELETE request. Here is a copy of yout error object',
						err
					);
				}
			});
		})
		.catch((err) => console.log(err));
});
