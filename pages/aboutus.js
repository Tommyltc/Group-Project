import React from "react";
import NextSeo from "next-seo";

import Head from "../components/Head";
import AboutUs from "../components/AboutUs";

const Page = props => {
  //SEO meta tags
  const title = "About us | COMP 3121 Awesome social media search page";
  const description = "A social media mashup that uses content from Instagram, Youtube, Flickr, Pinterest to displayed in a single page.";
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

  //Render page
  return (
    <div>
      <Head />
      <NextSeo config={SEO} />
      <AboutUs />
    </div>
  );
};

Page.getInitialProps = async ({ req, query }) => {
  //const host = "http://" + req.headers.host;
  const host = "http://" + "comp3121.opp.com.hk";
  return {
    full_url: host + req.url
  };
};

export default Page;
