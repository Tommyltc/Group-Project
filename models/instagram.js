import axios from "axios";

export default async function getData(keyword) {
  let querys = [];
  let element = [];

  // Override space input
  // keyword = keyword.replace(/[\^&\/\\#,+()$~%.'":*?<>{}\!\@\-\=\|\[\]\;]/g, "_");

  const url = `https://www.instagram.com/explore/tags/${keyword}/?__a=1`;

  let response;
  try{
    response = await axios.get(url, { querys });
  }catch(e){
    console.log("Instagram API error!");
    console.log(e.response.status, e.response.data);
    return [];
  }
  

  const data = response.data.graphql.hashtag.edge_hashtag_to_media;
  // console.log(data.edges);

  let result = [];

  data.edges.map(enode => {
    const item = enode["node"];

    let description = "";
    if (item["edge_media_to_caption"]["edges"].length > 0) {
      description = item["edge_media_to_caption"]["edges"][0]["node"]["text"];
    }

    const node = {
      title: null,
      description,
      id: item["id"],
      datetime: item["taken_at_timestamp"],
      src: item["thumbnail_src"],
    };
    result.push(node);
  });

  return result;
}
