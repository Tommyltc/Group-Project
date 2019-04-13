import { PureComponent } from "react";
import { Navbar } from "react-bootstrap";
import ReactLoading from "react-loading";

import getAllData from "../models/getAllData";

import Searchbar from "../components/Searchbar";
import Result from "../components/Result";

export default class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loading: false
    };
  }

  async handleSearch(keyword) {
    window.history.pushState({}, "", "/" + keyword);

    this.setState({ loading: true });

    this.setState({
      data: await getAllData(keyword)
    });

    this.setState({loading: false});
  }

  render() {
    return (
      <div>
        <style>{`
          .loading{
            position: absolute;
            top: 50%;
            width: 100%;
            z-index: 9999;
          }
          .loading > div{
            margin: 0 auto;
          }
        `}</style>
        <Navbar bg="dark" variant="dark" sticky="top">
          <Navbar.Brand className="mr-auto">
            COMP 3121 Awesome social media search page
          </Navbar.Brand>
          <Searchbar handleSearch={this.handleSearch.bind(this)} />
        </Navbar>
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
