function AjaxLib() {
	// set up our AJAX object / engine
	this.xhr = new XMLHttpRequest();

	// ***** GET REQUEST *****
	this.get = (url, callback) => {
		// configure our AJAX request
		this.xhr.open('GET', url, false);

		// define our AJAX callback
		this.xhr.onload = () => {
			if (this.xhr.status === 200) {
				let data = this.xhr.response;
				let dogs = JSON.parse(data);
				callback(null, dogs);
			} else {
				callback('Error as occured with a GET request');
			}
		};
		this.xhr.send();
	};

	// ***** POST REQUEST *****
	this.post = (url, dog, callback) => {
		this.xhr.open('POST', url);
		this.xhr.setRequestHeader('Content-Type', 'application/json');
		this.xhr.onload = () => {
			if (this.xhr.status === 200) {
				let data = this.xhr.response;
				let postRequestData = JSON.parse(data);
				callback(postRequestData);
			} else {
				throw 'The status was not 200. Bad.';
			}
		};
		this.xhr.onerror = (err) => {
			alert('An error occurred with status:' + err.currentTarget.status);
		};

		// lets send raw JSON data to the server
		this.xhr.send(JSON.stringify(dog));
	};

    // ***** 更新請求(PUT REQUEST) *****
	this.put = (url, updatedDog, callback) => {
		this.xhr.open('PUT', url);
		this.xhr.setRequestHeader('Content-Type', 'application/json');
		this.xhr.onload = () => {
			if (this.xhr.status === 200) {
				let data = this.xhr.response;
				let putRequestData = JSON.parse(data);
				callback(putRequestData);
			} else {
				throw 'The status was not 200. Bad.';
			}
		};
		this.xhr.onerror = (err) => {
			alert('An error occurred with status:' + err.currentTarget.status);
		};

		// lets send raw JSON data to the server
		this.xhr.send(JSON.stringify(updatedDog));
	};

    // ***** 刪除請求(DELETE REQUEST) *****
	this.delete = (url, callback) => {
		this.xhr.open('DELETE', url);
		this.xhr.onload = () => {
			if (this.xhr.status === 200) {
				let data = this.xhr.response;
				let deleteRequestData = JSON.parse(data);
				callback(deleteRequestData);
			} else {
				throw 'The status was not 200. Bad.';
			}
		};
		this.xhr.onerror = (err) => {
			alert('An error occurred with status:' + err.currentTarget.status);
		};

		// lets send raw JSON data to the server
		this.xhr.send();
	};
}

export { AjaxLib };
