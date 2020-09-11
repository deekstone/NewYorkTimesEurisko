import Axios from 'axios';
import { GLOBAL_VAR } from '../../GLOBAL_VAR';

export const getNews = (page_number) =>
	new Promise(
		(resolve, reject) => {
			Axios.get(
				GLOBAL_VAR.API_URL + `articlesearch.json?api-key=${GLOBAL_VAR.API_KEY}&sort=newest&page=${page_number}`
			).then((res) => {
				resolve(res.data.response.docs);
			});
		},
		(error) => reject(error)
	).catch((error) => reject(error));
