import Axios from "axios";
import { FETCH_NEWS, LOAD_MORE_NEWS } from "./Types";

// export const getNews = (page_number, concat) => (dispatch) => {
// 	Axios.get(
// 		`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=OAD0Qz0csaoDZLpw5ZR74TCeSjynnabJ&sort=newest&page=${page_number}`
// 	).then((res) => {
// 		dispatch({
// 			type: FETCH_NEWS,
// 			data: concat ? this.state.data.concat(res.data.response.docs) : res.data.response.docs
// 		});
// 	});
// };

export const getNews = () => {
  return {
    type: LOAD_MORE_NEWS,
    data: [],
  };
};

export const loadMoreNews = () => ({
  type: LOAD_MORE_NEWS,
  data: [],
});
