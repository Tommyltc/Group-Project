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
      keyword: "",
    };
  }

  async handleSearch(keyword, platforms = []) {
    window.history.pushState({}, "", "/" + keyword);

    this.setState({ loading: true });

    this.setState({
      data: await getAllData(keyword, platforms)
    });

    this.setState({ loading: false, keyword });
  }

  async handleSelectPlatform(platforms) {
    return await this.handleSearch(this.state.keyword, platforms);
  }

  render() {
    return (
      <div>
        <style jsx global>{`
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
            COMP 3121 Awesome social media search page
          </Navbar.Brand>
          <Searchbar handleSearch={this.handleSearch.bind(this)} default_keyword={this.props.default_keyword} loading={this.state.loading} />
        </Navbar>
        <PlatformSelector handleSelectPlatform={this.handleSelectPlatform.bind(this)} />
        </div>
        <Result data={this.state.data || this.props.data} />
        {this.state.loading ? (
          <div className="loading">
            <ReactLoading type="spin" color="#222" />
          </div>
        ) : null}
      </div>
    );
  }
}
