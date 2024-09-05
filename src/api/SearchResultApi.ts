import axios from "../constants/Axios";
import { SearchResultGuest, SearchResultUser } from "../models/SearchResult";

const getSearchResult = async (
  sequence: string,
  userId?: number
): Promise<SearchResultUser | SearchResultGuest> => {
  if (userId) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const response = await axios.post(
      `/user/${userId}/search-for-cre`,
      {
        sequence: sequence,
      },
      { headers: headers }
    );
    console.log("data", response.data);
    return response.data;
  } else {
    const response = await axios.post("/guest/search-for-cre", {
      sequence: sequence,
    });
    return response.data;
  }
};

export default getSearchResult;
