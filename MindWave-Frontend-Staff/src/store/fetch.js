import axios from "axios";
import { defineStore } from "pinia";



export const useFetchStore = defineStore('fetch', () => {

	function getDataApi(apiPath) {
		axios.get(`/api/crud${apiPath}`)
	}


	async function postDataApi(data, apiQuery, apiParams) {
		await axios.post(`/api/dev/dummyOwl`, {
			database: {
				api_query: apiQuery,
				api_query_values: {
					...data
				},
				api_query_params: apiParams
			}
		})

		// 192.168.0.116:8000
	}

	async function putDataApi(data, apiQuery, apiParams, id) {
		await axios.put(`/api/dev/dummyOwl/${id}`, {
			database: {
				api_query: apiQuery,
				api_query_values: {
					...data
				},
				api_query_params: apiParams
			}
		})
	}

	async function deleteDataApi(id, idName, apiQuery) {
		await axios.delete(`/api/dev/dummyOwl/${id}`, {
			database: {
				api_query: apiQuery,
				api_query_values: {
					idName: id
				},
			}
		})
	}

	return {
		getDataApi,
		postDataApi,
		putDataApi,
		deleteDataApi
	}
})