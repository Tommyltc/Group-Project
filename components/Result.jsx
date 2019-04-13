import { PureComponent } from "react";

import Masonry from "react-masonry-component";
import moment from "moment";

import FlickrElement from "../components/Elements/FlickrElement";
import InstagramElement from "../components/Elements/InstagramElement";
import PinterestElement from "../components/Elements/PinterestElement";
import YoutubeElement from "../components/Elements/YoutubeElement";

export default class Result extends PureComponent {
  reformArray(data) {
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

    return result;
  }

  render() {
    let { data } = this.props;

    data = this.reformArray(data);

    return (
      <Masonry className="mt-1">
        {data.map((element, i) => {
          let element_dom;
          switch (element.platform) {
            case "flickrData":
              element_dom = <FlickrElement data={element} key={i} />;
              break;
            case "instagramData":
              element_dom = <InstagramElement data={element} key={i} />;
              break;
            case "pinterestData":
              element_dom = <PinterestElement data={element} key={i} />;
              break;
            case "youtubeData":
              element_dom = <YoutubeElement data={element} key={i} />;
              break;
          }
          return (
            <div className="m-2" key={i}>
              {element_dom}
            </div>
          );
        })}
      </Masonry>
    );
  }
}
