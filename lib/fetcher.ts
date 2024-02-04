// axios is a library that provides a function for making HTTP requests. We use it to fetch data from the server. 
import axios from "axios";

// This is the fetcher function. It takes a URL as an argument and returns the data that it fetched from the server. The URL specifies the route that we want to fetch the data from. 
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;