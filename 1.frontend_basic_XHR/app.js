// importing modules
import { AjaxLib } from './api/ajax_lib.js';

// grab our page elements
let para = document.getElementsByTagName('p')[0];
let table = document.getElementById('tableResults');
let getButton = document.getElementById('get');
let postButton = document.getElementById('post');
let putButton = document.getElementById('put');
let deleteButton = document.getElementById('delete');

// define our base URL
const SERVER_URL = 'http://127.0.0.1:3500/api';

// ****** GET REQUEST ******
getButton.addEventListener('click', () => {
	fetchDogs();
	para.className = 'get';
	para.textContent = 'GET request was successful';
});

let fetchDogs = () => {
	let url = SERVER_URL + '/dogs';
	let xhr = new AjaxLib();
	xhr.get(url, (err, dogs) => {
		if (err) throw err;
		// we want to reutrn this data and show it on the webpage
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
	});
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
	let xhr = new AjaxLib();
	let url = SERVER_URL + '/dogs';
	xhr.post(url, dog, (responseData) => {
		fetchDogs();
		para.className = 'post';
		para.textContent = responseData.message;
	});
});

// ****** PUT REQUEST ******
putButton.addEventListener('click', () => {
	let id = 1;
	let dog = {
		id: id,
		name: 'Skinny',
		age: 2,
		gender: 'female',
		notes: 'she likes tto chase her tail',
	};

	let xhr = new AjaxLib();
	let url = SERVER_URL + '/dogs/' + id;
	xhr.put(url, dog, (responseData) => {
		fetchDogs();
		para.className = 'put';
		para.textContent = responseData.message;
	});
});

// ****** DELETE REQUEST ******
deleteButton.addEventListener('click', () => {
	let id = 1;

	let xhr = new AjaxLib();
	let url = SERVER_URL + '/dogs/' + id;
	xhr.delete(url, (responseData) => {
		fetchDogs();
		para.className = 'delete';
		para.textContent = responseData.message;
	});
});

