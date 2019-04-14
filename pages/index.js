import React from "react";
import NextSeo from "next-seo";

import getAllData from "../models/getAllData";

import Head from "../components/Head";
import Main from "../components/Main";

const Page = props => {
  //SEO meta tags
  const title =
    (props.default_keyword ? props.default_keyword + " | " : "") +
    "COMP 3121 Awesome social media search page";
  const description = props.default_keyword
    ? "Find the content in single page about " +
      props.default_keyword +
      " on Instagram, Youtube, Flickr, Pinterest."
    : "A social media mashup that uses content from Instagram, Youtube, Flickr, Pinterest to displayed in a single page.";
  const url = props.full_url;
  let SEO = {
    title,
    description,
    canonical: url,
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title,
      description,
      site_name: "COMP 3121 Awesome social media search page",
      images: []
    }
  };

  //Loop social media data object for SEO meta tags
  let og_images = [];

  props.data.map((element, i) => {
    if (typeof element.platform === "undefined" || !element.platform) {
      return true;
    }
    switch (element.platform) {
      case "flickrData":
        og_images.push({
          url: element.oSrc,
          alt:
            element.title ||
            "Image" +
              (props.default_keyword ? " about " + props.default_keyword : "") +
              " on Flickr"
        });
        break;
      case "youtubeData":
        og_images.push({
          url: element.photo,
          alt:
            element.title ||
            "Video thumbnail" +
              (props.default_keyword ? " about " + props.default_keyword : "") +
              " on Youtube"
        });
        break;
      case "pinterestData":
        og_images.push({
          url: element.photo,
          alt:
            element.title ||
            "Image" +
              (props.default_keyword ? " about " + props.default_keyword : "") +
              " on Pinterest"
        });
        break;
      case "instagramData":
        og_images.push({
          url: element.src,
          alt:
            element.title ||
            "Image" +
              (props.default_keyword ? " about " + props.default_keyword : "") +
              " on Instagram"
        });
        break;
    }
  });
  SEO.openGraph.images = og_images;

  //Render page
  return (
    <div>
      <Head />
      <NextSeo config={SEO} />
      <Main data={props.data} default_keyword={props.default_keyword} />
    </div>
  );
};

Page.getInitialProps = async ({ req, query }) => {
  //console.log("------------------------ REQUEST ------------------------");
  //console.log("http://" + req.headers.host + req.url);
  //console.log(req);
  //console.log("------------------------ REQUEST ------------------------");

  const keyword = query.keyword || "";
  const host = "http://" + req.headers.host;
  return {
    full_url: host + req.url,
    data: await getAllData(keyword, [], host),
    default_keyword: keyword
  };
};

export default Page;
