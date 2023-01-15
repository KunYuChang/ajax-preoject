function AjaxLib() {
	// ***** GET REQUEST *****
	this.get = (url, callback) => {
		fetch(url)
			.then((data) => data.json())
			.then((responseData) => {
				callback(responseData);
			})
			.catch((err) => console.log(err));
	};

	// ***** POST REQUEST *****
	this.post = (url, dog, callback) => {
		// set our headers
		let h = new Headers();
		h.append('Content-Type', 'application/json');

		// set up our request object
		let req = new Request(url, {
			method: 'POST',
			headers: h,
			body: JSON.stringify(dog),
		});

		// send our ajax request
		fetch(req)
			.then((data) => {
				return data.json();
			})
			.then((responseData) => {
				callback(responseData);
			})
			.catch((err) => console.log(err));
	};

	// ***** 更新請求(PUT REQUEST) *****
	this.put = (url, updateDog, callback) => {
		// set our headers
		let h = new Headers();
		h.append('Content-Type', 'application/json');

		// set up our request object
		let req = new Request(url, {
			method: 'PUT',
			headers: h,
			body: JSON.stringify(updateDog),
		});

		// send our ajax request
		fetch(req)
			.then((data) => {
				return data.json();
			})
			.then((responseData) => {
				callback(responseData);
			})
			.catch((err) => console.log(err));
	};

	// ***** 刪除請求(DELETE REQUEST) *****
	this.delete = (url, callback) => {
		let req = new Request(url, {
			method: 'DELETE',
		});
		fetch(url)
			.then((data) => data.json())
			.then((responseData) => {
				callback(responseData);
			})
			.catch((err) => console.log(err));
	};
}

export { AjaxLib };
