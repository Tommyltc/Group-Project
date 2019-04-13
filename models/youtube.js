import axios from "axios";
export default async function getData(keyword) {
  const API_KEY = "AIzaSyCxmDDUh2hLC8i9DfpCcFK59wUG8Qub-34";
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
    const src = `https://www.youtube.com/embed/${
      video.id.videoId
    }?autoplay=0&modestbranding=1`;
    // console.log(src);
    const row = {
      src,
      title: video.snippet.title,
      description: video.snippet.description,
      datetime: video.snippet.publishedAt
    };
    results.push(row);
  });

  return results;
}
