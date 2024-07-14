import axios from "axios"
export class AuthService {
	async getUsers() {
		let res = await axios.get("http://192.168.0.117:8000/api/test/allUsers")
		return res.data.content.rows
	}
	async loginUser(email, password) {
		try {
			let res = await axios.post(
				"http://192.168.0.117:8000/api/users/login",
				{
					"email": email,
					"password": password
				}
			)
			return res
		}
		catch (e) {
			return e
		}
	}
	async registerUser(name, email, password) {
		try {
			let res = await axios.post(
				"http://192.168.0.117:8000/api/users/register",
				{
					"name": name,
					"email": email,
					"password": password
				}
			)
			return res
		}
		catch (e) {
			return e
		}
	}
	logoutUser() {
		localStorage.removeItem('token')
	}
}