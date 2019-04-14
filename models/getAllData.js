import moment from "moment";

import getDataFlickr from "../models/flickr";
import getDataInstagram from "../models/instagram";
import getDataPinterest from "../models/pinterest";
import getDataYoutube from "../models/youtube";

export default async function getAllData(keyword, platforms = [], host = "") {
  keyword = keyword === "" ? "polyu" : keyword;

  const [
    flickrData,
    instagramData,
    pinterestData,
    youtubeData
  ] = await Promise.all([
    platforms.length === 0 || platforms.indexOf("flickr") !== -1 ? getDataFlickr(keyword) : getEmptyData(),
    platforms.length === 0 || platforms.indexOf("instagram") !== -1 ? getDataInstagram(keyword) : getEmptyData(),
    platforms.length === 0 || platforms.indexOf("pinterest") !== -1 ? getDataPinterest(keyword, host) : getEmptyData(),
    platforms.length === 0 || platforms.indexOf("youtube") !== -1 ? getDataYoutube(keyword) : getEmptyData()
  ]);

  const data = { flickrData, instagramData, pinterestData, youtubeData };

  let result = [];

  //Group into single array
  for (let platform in data) {
    if (data.hasOwnProperty(platform)) {
      for (let i in data[platform]) {
        const element = data[platform][i];
        element.platform = platform;
        result.push(element);
      }
    }
  }

  //Format "datetime"
  result.map((element, i) => {
    //console.log(element.datetime, element.platform);
    
    //If no datetime provide, use current time
    element.datetime = typeof element.datetime === "undefined" || !element.datetime ? new Date() : element.datetime;

    //Handle UNIX timestamp
    if(Number.isNaN(element.datetime) === false && element.datetime <= 5000000000){
      element.datetime = moment.unix(element.datetime);
    }
    
    //Convert to string (YYYY-MM-DD HH:mm:ss)
    element.datetime = moment(element.datetime).format("YYYY-MM-DD HH:mm:ss");

    //console.log(element.datetime, element.platform);
  });


  //Sort by date DESC
  result.sort((a, b) => {
    if (a.datetime < b.datetime) {
      return 1;
    } else if (a.datetime > b.datetime) {
      return -1;
    } else {
      return 0;
    }
  });

  //console.log("------------------------ FINAL RESULT ------------------------");
  //console.log(result);
  //console.log("------------------------ FINAL RESULT ------------------------");

  return result;
}

async function getEmptyData(){
  await new Promise(resolve => setTimeout(resolve, 2500));

  return [];
}
