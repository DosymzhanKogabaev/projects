import axios from "axios"
export class TestService2 {
    async getProducts() {
        let res = await axios.get("http://91.147.91.163:8888/api/test/joinedData")
        return res.data.content.sort(function (a, b) {return a.id - b.id})
    }
    async getStatuses() {
        let res = await axios.get("http://91.147.91.163:8888/api/test/status")
        return res.data.content
    }
    async postProduct(name, email, age, statusId) {
        await axios.post(
            "http://91.147.91.163:8888/api/test/users2", 
            {
                "name": name,
                "email": email,
                "age": age,
                "fk": statusId
            }
        )
    }
    async deleteProduct(id) {
        await axios.delete(
            "http://91.147.91.163:8888/api/test/users2",
            {
                data: {"userID": id}
            }
        )
    }
    async putProduct(id, name, email, age, statusId) {
        await axios.put(
            "http://91.147.91.163:8888/api/test/users2",
            {
                "userID": id,
                "name": name,
                "email": email,
                "age": age,
                "fk": statusId
            }
        )
    }
}