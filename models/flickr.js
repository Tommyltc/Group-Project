import axios from "axios";

// APP config
const key = "d5bdef52f659cb9e8f4a43fe668b3765";
const secret = "f4247377f9653ed7";

// API setting
const url = "https://api.flickr.com/services/rest/";

export default async function getData(keyword) {
  // API paramters
  let params = {};
  params = {
    method: "flickr.photos.search", // https://www.flickr.com/services/api/flickr.photos.search.html
    api_key: key, // Your API application key
    // tags: keyword, // A comma-delimited list of tags. Photos with one or more of the tags listed will be returned.
    text: keyword, // A free text search. Photos who's title, description or tags contain the text will be returned.
    format: "json",
    nojsoncallback: 1,
    // per_page: 25, // chunk size to fetch
    sort: "relevance",
    safe_search: 1
  };

  let response;
  try {
    response = await axios.get(url, { params });
  } catch (e) {
    console.log("Flickr API error!");
    console.log(e);
    return [];
  }

  // handle success
  //console.log(response.data);

  const { data } = response;

  let result = [];

  data.photos.photo.map(async (gp, i) => {
    const farmId = gp.farm;
    const serverId = gp.server;
    const id = gp.id;
    const secret = gp.secret;

    const info = await getPhotoInfo(id);
    const oSecret = info.originalsecret;
    const oExt = info.originalformat;

    //console.log(gp);
    //console.log(info);

    //console.log(farmId + ", " + serverId + ", " + id + ", " + secret);

    //  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

    let src = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`;
    let oSrc = src;

    if (oSecret !== undefined && oExt !== undefined) {
      oSrc = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${oSecret}_o.${oExt}`;
    }

    result.push({
      _photo_id: id,
      src,
      title: info.title,
      description: info.description,
      datetime: info.datetime,
      oSrc,
      page_url:
        gp.owner && gp.id
          ? `https://www.flickr.com/photos/${gp.owner}/${gp.id}`
          : ""
    });
  });
  // console.log(result);
  return result;
}

const getPhotoInfo = async id => {
  let params = {};
  params = {
    method: "flickr.photos.getInfo", // https://www.flickr.com/services/api/flickr.photos.getInfo.html
    api_key: key, // Your API application key
    photo_id: id,
    format: "json",
    nojsoncallback: 1
  };

  const response = await axios.get(url, { params });

  const { photo } = response.data;
  // console.log(id);

  return {
    title: photo.title._content,
    description: photo.description._content,
    datetime: photo.dates.posted,
    originalsecret: photo.originalsecret,
    originalformat: photo.originalformat
  };
};
