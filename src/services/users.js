import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getOne = async id => {
	const config = {
		headers: { Authorization: token },
	}
	const request = axios.get(`${ baseUrl }/${id}`, config)
	return request.then(response => response.data)
}

export default { getOne, setToken }
