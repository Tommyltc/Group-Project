import { PureComponent } from "react";
import { Navbar } from "react-bootstrap";
import ReactLoading from "react-loading";

import getAllData from "../models/getAllData";

import Searchbar from "../components/Searchbar";
import PlatformSelector from "../components/PlatformSelector";
import Result from "../components/Result";

export default class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loading: false,
      keyword: this.props.default_keyword || "",
      selected_platform: ["instagram", "youtube", "flickr", "pinterest"]
    };
  }

  async handleSearch() {
    window.history.pushState({}, "", "/" + this.state.keyword);

    this.setState({ loading: true });

    this.setState({
      data: await getAllData(this.state.keyword, this.state.selected_platform)
    });

    this.setState({ loading: false, keyword: this.state.keyword });
  }

  handleInputText(keyword) {
    this.setState({ keyword });
  }

  handleCheckboxChange(platform, enable) {
    let selected_platform = this.state.selected_platform;

    if (enable && selected_platform.indexOf(platform) === -1) {
      selected_platform.push(platform);
    }

    if (!enable) {
      selected_platform.splice(selected_platform.indexOf(platform), 1);
    }

    this.setState({ selected_platform });
    this.handleSearch();
  }

  render() {
    return (
      <div>
        <style jsx global>{`
          .navbar-brand {
            white-space: normal;
            font-weight: bold;
          }
          .navbar-brand a {
            color: #FFF;
          }
          h1 {
            font-size: inherit;
            font-weight: inherit;
            line-height: inherit;
            margin: inherit;
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
          .loading {
            position: absolute;
            top: 50%;
            width: 100%;
            z-index: 9999;
          }
          .loading > div {
            margin: 0 auto;
          }
        `}</style>
        <div className="sticky-top">
          <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand className="mr-auto">
              <a href="/aboutus"><h1>COMP 3121 Awesome social media search page</h1></a>
            </Navbar.Brand>
            <Searchbar
              default_keyword={this.props.default_keyword}
              handleInputText={this.handleInputText.bind(this)}
              handleSearch={this.handleSearch.bind(this)}
              loading={this.state.loading}
            />
          </Navbar>
          <PlatformSelector
            selected_platform={this.state.selected_platform}
            handleCheckboxChange={this.handleCheckboxChange.bind(this)}
          />
        </div>
        <Result data={this.state.data || this.props.data} keyword={this.state.keyword} />
        {this.state.loading ? (
          <div className="loading">
            <ReactLoading type="spin" color="#222" />
          </div>
        ) : null}
      </div>
    );
  }
}
