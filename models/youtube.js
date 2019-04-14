import axios from "axios";
export default async function getData(keyword) {
  const API_KEY = "AIzaSyA8OmKcw2DMNkJicyCJ0vqvf90xgeH52zE";
  const ROOT_URL = "https://www.googleapis.com/youtube/v3/search";

  let params = {};
  params.key = API_KEY;
  params.part = "snippet";
  params.maxResults = 10;
  params.type = "video";

  let response;
  try{
    response = await axios.get(ROOT_URL, { params });
  }catch(e){
    console.log("Youtube API error!");
    console.log(e);
    return [];
  }

  const { items } = response.data;

  let results = [];
  items.map(video => {
    const src = `https://www.googleapis.com/youtube/v3/search?id=${
      video.id.videoId
    }&key=AIzaSyA8OmKcw2DMNkJicyCJ0vqvf90xgeH52zE&part=snippet`;
    // console.log(src);
    const row = {
      id:video.id.videoId,
      photo:video.snippet.thumbnails.high.url,
      title: video.snippet.title,
      description: video.snippet.description,
      datetime: video.snippet.publishedAt
    };
    console.log("youtube")
    console.log(video);
    results.push(row);
  });

  return results;
}
