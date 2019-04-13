import axios from "axios";

export default async function getData(keyword) {
  let querys = [];
  let element = [];

  // Override space input
  // keyword = keyword.replace(/[\^&\/\\#,+()$~%.'":*?<>{}\!\@\-\=\|\[\]\;]/g, "_");

  const url = `https://www.instagram.com/explore/tags/${keyword}/?__a=1`;

  const response = await axios.get(url, { querys });

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
      datetime: unixTime(item["taken_at_timestamp"]),
      src: item["thumbnail_src"],
    };
    result.push(node);
  });

  return result;
}

function unixTime(unixtime) {
  var u = new Date(unixtime * 1000);

  return (
    u.getUTCFullYear() +
    "-" +
    ("0" + u.getUTCMonth()).slice(-2) +
    "-" +
    ("0" + u.getUTCDate()).slice(-2) +
    " " +
    ("0" + u.getUTCHours()).slice(-2) +
    ":" +
    ("0" + u.getUTCMinutes()).slice(-2) +
    ":" +
    ("0" + u.getUTCSeconds()).slice(-2) +
    "." +
    (u.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5)
  );
}
