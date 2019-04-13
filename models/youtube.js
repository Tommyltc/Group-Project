import randomInt from "../utils/randomInt";
import padLeft from "../utils/padLeft";
//import ytembed;

export default async function getData(keyword) {
  // const response = await axios.get('https://call-your-api-like-that/thank-you-very-much');
  await new Promise(resolve => setTimeout(resolve, 500)); //Just for demo, sleep(500)

  return [];

  const object = (obj) => {
    return {
      title: obj.title,//"Test Youtube title #" + randomInt(1, 9999),
      description:
        obj.description +
        keyword +
        "?",
      photo:
        obj.thumbnail.url,
      datetime: new Date(object.publishedAt).toString().split("GMT",1)
    };
  };

  // let array = [];

  // for (let i = 0; i < 10; i++) {
  //   array[i] = object();
  // }

  // return array;
  ytEmbed.init({'block':'ytThumbs','key':'AIzaSyCxmDDUh2hLC8i9DfpCcFK59wUG8Qub-34','q':''+keyword+'','type':'search','results':5,'meta':true,'player':'embed','layout':'full'});
  ytEmbed.jsonCallback = (json) => {
    let array = [];
    for (var i = 0; i < json.length; i++) {
      array[i] = object(json[i]);
    }
    return array;
  }
}
