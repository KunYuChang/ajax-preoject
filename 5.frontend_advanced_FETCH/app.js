// importing modules
import {AjaxLib} from './api/ajax_lib.js';

// grab our page elements
let table = document.getElementById('tableResults');

// define our base URL
const SERVER_URL = 'http://127.0.0.1:3500/api';

// ****** GET REQUEST ******
window.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
})

let fetchDogs = () => {
    let url = SERVER_URL + '/dogs';
    let fetch = new AjaxLib();

    fetch.get(url, (dogs) => {
        let tableRows = '';
        for (const dog of dogs) {
            tableRows += `
						<tr>
							<td>${dog.id}</td>
							<td>${dog.name}</td>
							<td>${dog.age}</td>
							<td>${dog.gender}</td>
							<td>${dog.notes}</td>
							<td>
								<button class="delete">Delete Dog</button>
								<button class="update" onclick="document.getElementById('modalUpdate').style.display='block'">Update</button>
							</td>
						</tr>
					`;
        }
        table.innerHTML = tableRows;
    });
};

// ****** POST REQUEST ******
let addDogForm = document.getElementById('modal');
addDogForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let notes = document.getElementById('notes').value;
    let gender = document.getElementById('gender').value;

    let newDog = {
        name: name,
        age: age,
        gender: gender,
        notes: notes,
    };

    // send the new dog to our server and add it to our gogs array
    let fetch = new AjaxLib();
    let url = SERVER_URL + '/dogs';
    fetch.post(url, newDog, (responseData) => {
        fetchDogs();
        e.target.reset();
    });

    // target the modal and close it
    let addDogModal = document.getElementById('modal');
    addDogModal.style.display = 'none';
})

// // ****** PUT REQUEST ******

// ***** POPULATE OUR MODAL FORM
let tableWrapper = document.getElementById('tableResults');
tableWrapper.addEventListener('click', (e) => {
    let target = e.target;
    let id = target.parentElement.parentElement.firstElementChild.innerHTML;
    if (target.classList.contains('update')) {
        let fetch = new AjaxLib();
        fetch
            .get(SERVER_URL + '/dogs', (dogs) => {
                let selectedDog = dogs.find((dog) => {
                    return dog.id === id;
                })
                populateUpdateModal(selectedDog);
            })
    }
})

let populateUpdateModal = (relevantDog) => {
    document.getElementById('dogId').value = relevantDog.id;
    document.getElementById('nameUpdate').value = relevantDog.name;
    document.getElementById('ageUpdate').value = relevantDog.age;
    document.getElementById('notesUpdate').value = relevantDog.notes;
    document.getElementById('genderUpdate').value = relevantDog.gender;
}

// ***** SEND A PUT REQUEST TO UPDATE OUR DOG
let updateForm = document.getElementById('updateForm');
updateForm.addEventListener('submit', (e) => {

    e.preventDefault();

    let id = document.getElementById('dogId').value;
    let name = document.getElementById('nameUpdate').value;
    let age = document.getElementById('ageUpdate').value;
    let notes = document.getElementById('notesUpdate').value;
    let gender = document.getElementById('genderUpdate').value;

    let updatedDog = {name, age, notes, gender};

    let fetch = new AjaxLib();
    let url = SERVER_URL + '/dogs/' + id
    fetch
        .put(url, updatedDog, () => {
            fetchDogs();
            e.target.reset();
            let modalUpdate = document.getElementById('modalUpdate');
            modalUpdate.style.display = 'none';
        })
})

// ***** SEND A DELETE REQUEST TO DELETE OUR DOG
tableWrapper.addEventListener('click', (e) => {
    let target = e.target;
    if (target.classList.contains('delete')) {
        let id = target.parentElement.parentElement.firstElementChild.innerHTML;
        let fetch = new AjaxLib();
        let url = SERVER_URL + '/dogs/' + id;
        fetch.delete(url, () => {
            console.log('delete request was done');
            fetchDogs();
        })
    }
})


