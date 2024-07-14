import axios from "axios"
export class CategoriesService {
    async getCategories() {
        let res = await axios.get("http://192.168.0.117:8000/api/crud/categories", 
            {
                params: {language_id: 1}
            }
        )
        return res.data.content.db_rows
    }
    async postCategories(language_id, name, category_info, parent_id) {
        await axios.post("http://192.168.0.117:8000/api/categories", 
            {
                "language_id": language_id,
                "category_name": name,
                "category_info": category_info,
                "parent_id": parent_id
            }
        )
    }
    async getNewCategories() {
        let res = await axios.get("http://192.168.0.117:8000/api/crud/category-structure", 
            {
                params: {language_id: 1}
            }
        )
        return res.data.root
    }
    async getNewCategoriesNodes() {
        let res = await axios.get("http://192.168.0.117:8000/api/categories/structure", 
            {
                params: {language_id: 1}
            }
        )
        return res.data.content.db_rows
    }
    async putCategories(category_id, language_id, parent_id, category_info, category_name, categories_trans_id) {
        await axios.put(`http://192.168.0.117:8000/api/categories/${category_id}`, 
            {
                "language_id": language_id,
                "parent_id": parent_id,
                "category_info": category_info,
                "category_name": category_name,
                "category_trans_id": categories_trans_id
            }
        )
    }
}