import axios from "axios";
import { resMovieDb } from "../constant/type/type";

export const getMovieList = async (uri: string): Promise<resMovieDb> => {
  const { data } = await axios.get<resMovieDb>(uri);

  return data;
};
