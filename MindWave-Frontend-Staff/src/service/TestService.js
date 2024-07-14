import axios from "axios"
export class TestService {
	async getProducts() {
		// let res = await axios.get("http://91.147.91.163:8888/api/test/allUsers")



		// let res = await axios.get("http://91.147.91.163:8888/api/crud/menu-items?language_id=1")
		let res = await axios.get("http://91.147.91.163:8888/api/crud/categories?language_id=1")
		// let res = await axios.get("http://91.147.91.163:8888/api/crud/menu-groups")




		// return res.data.content.rows
		return res.data.content.db_rows
	}
	async postProduct(name, email, age) {
		await axios.post(
			"http://91.147.91.163:8888/api/test/testTable",
			{
				"name": name,
				"email": email,
				"age": age
			}
		)
	}
	async deleteProduct(id) {
		await axios.delete(
			"http://91.147.91.163:8888/api/test/testTable",
			{
				data: { "userID": id }
			}
		)
	}
	async putProduct(id, name, email, age) {
		await axios.put(
			"http://91.147.91.163:8888/api/test/testTable",
			{
				"userID": id,
				"name": name,
				"email": email,
				"age": age
			}
		)
	}
}