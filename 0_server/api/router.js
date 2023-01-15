const express = require('express');
const router = express.Router();

// 這個小專案不會配置資料庫，使用陣列資料代替。
let dogs = [
	{
		id: '1',
		name: 'Skinny',
		age: 1,
		gender: 'Female',
		notes: 'broken front leg',
	},
	{
		id: '2',
		name: 'Charm',
		age: 2,
		gender: 'Female',
		notes: 'great dog, friendly with others',
	},
];

// create our ID function
let createID = () => {
	return Date.now() + Math.random().toFixed(0);
};

// **** GET DOGS ****
router.get('/dogs', (req, res) => {
	console.log(`GET request received at ${new Date().toLocaleDateString()}`);
	res.json(dogs);
});

// **** POST DOGS ****
router.post('/dogs', (req, res) => {
	let newDog = {
		id: createID(),
		name: req.body.name,
		age: req.body.age,
		gender: req.body.gender,
		notes: req.body.notes,
	};

	// add this new dog to our array of dogs
	dogs.push(newDog);
	console.log(`POST request received at ${new Date().toLocaleDateString()}`);
	res.json({ message: `POST request was successful`, newDogAdded: newDog });
});

// **** PUT DOGS ****
router.put('/dogs/:id', (req, res) => {
	let dogId = req.params.id;

	let updateDog = {
		id: dogId,
		name: req.body.name,
		age: req.body.age,
		gender: req.body.gender,
		notes: req.body.notes,
	};

	// first step - to find our existing dog in the dogs array
	let existingDog = dogs.find((dog) => {
		return dog.id === dogId;
	});

	// second step - replace the existingDog with the updateDog
	dogs.splice(dogs.indexOf(existingDog), 1, updateDog);

	// confirmation
	console.log(`PUT request received at ${new Date().toLocaleTimeString()}`);
	res.json({ message: 'PUT request was successful' });
});

// **** DELETE DOGS ****
router.delete('/dogs/:id', (req, res) => {
	let dogId = req.params.id;
	dogs = dogs.filter((dog) => {
		return dog.id !== dogId;
	});

	// confirmation
	console.log(
		`DELETE request received at ${new Date().toLocaleTimeString()}`
	);
	res.json({ message: 'DEL request was successful' });
});

module.exports = router;
