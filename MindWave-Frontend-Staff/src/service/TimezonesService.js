import axios from "axios"
export class TimezonesService {
    async getTimezones() {
        let res = await axios.get("http://91.147.91.163:8888/api/crud/timezones")
        return res.data.content.db_rows.sort(function (a, b) {return a.utc_id - b.utc_id})
    }
    async deleteTimezone(utc_id) {
        await axios.delete(
            `http://91.147.91.163:8888/api/crud/timezones/${utc_id}`
        )
    }
    async putTimezone(utc_id, utc_offset, description) {
        await axios.put(`http://91.147.91.163:8888/api/crud/timezones/${utc_id}`,
        {
            "new_utc_offset": utc_offset,
            "new_description": description
        })
    }
    async postTimezone(utc_offset, description) {
        await axios.post("http://91.147.91.163:8888/api/crud/timezones",
        {
            "utc_offset": utc_offset,
            "description": description
        })
    }
}