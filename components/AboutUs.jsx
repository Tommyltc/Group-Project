import { PureComponent } from "react";
import { Navbar } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

import getAllData from "../models/getAllData";

import Searchbar from "../components/Searchbar";
import PlatformSelector from "../components/PlatformSelector";
import Result from "../components/Result";

export default class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      keyword: ""
    };
  }

  async handleSearch() {
    window.location = "/" + this.state.keyword;
  }

  handleInputText(keyword) {
    this.setState({ keyword });
  }

  render() {
    const markdown = `## What is COMP 3121 Awesome social media search page?
    A social media mashup that uses content from Instagram, Youtube, Flickr, Pinterest to displayed in a single page.

    ## What is Social Media Mashup?
    A mashup is a web page or web application that uses content from more than one source to create a single new service displayed in a single graphical interface.

    ## What information I can find on this webpage?
    You can search anything what you want to see by using our keyword search function.
    Here is some example:
    1. [polyu](/polyu)
    2. [hongkong](/hongkong)
    3. [itdog](/itdog)
    4. [hkig](/hkig)

    Enjoy and have fun~`;

    return (
      <div>
        <style jsx global>{`
          .aboutus {
            padding: 15px;
          }
          .aboutus img {
            max-width: 100%;
          }
          .navbar-brand {
            white-space: normal;
            font-weight: bold;
          }
          .navbar-brand a {
            color: #fff;
          }
          @media (max-width: 739px) {
            .navbar {
              display: block;
            }
            .navbar-brand {
              margin-bottom: 0.4rem;
            }
          }
          @media (max-width: 484px) {
            .navbar-brand {
              font-size: 0.92rem;
            }
          }
        `}</style>
        <div className="sticky-top">
          <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand className="mr-auto">
              <a href="/"><h1>COMP 3121 Awesome social media search page</h1></a>
            </Navbar.Brand>
            <Searchbar
              handleInputText={this.handleInputText.bind(this)}
              handleSearch={this.handleSearch.bind(this)}
              loading={false}
            />
          </Navbar>
        </div>
        <div className="aboutus">
          <ReactMarkdown source={markdown.replace(/\n. |\r/g, "\n")} />
          <img
            src="/static/preview.png"
            alt="Preview of COMP 3121 Awesome social media search page"
            title="Preview of COMP 3121 Awesome social media search page"
          />
        </div>
      </div>
    );
  }
}
