const apiUrl = 'http://localhost:3000/api'
const apiVersion = 1

const query = (url, options) => {
	return fetch(`${apiUrl}/v${apiVersion}${url}`, options)
		.then(res => res.json())
}

const get = (url) => {
	return query(url, {
		method: 'get'
	})
}

const post = url => {
	return query(url, {
		method: 'post'
	})
}

export {
	get,
	post,
}
