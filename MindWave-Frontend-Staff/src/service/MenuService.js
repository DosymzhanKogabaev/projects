import axios from "axios"
export class MenuService {
    async getMenuItems() {
        let res = await axios.get("http://91.147.91.163:8888/api/crud/menu-items?language_id=1")
        return res.data.content.db_rows
    }
}