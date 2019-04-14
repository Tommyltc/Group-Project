import { PureComponent, Fragment } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

import FlickrModal from "./FlickrModal";

export default class FlickrElement extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { modalShow: false };
  }

  render() {
    const { title, description, src, datetime, oSrc } = this.props.data;

    let modalClose = () => this.setState({ modalShow: false });

    return (
      <Fragment>
        <Card className="element flickr">
          <Card.Img
            variant="top"
            src={src}
            onClick={() => this.setState({ modalShow: true })}
          />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>{description}</Card.Subtitle>
          </Card.Body>
          <Card.Footer
            className="small p-1 pl-3 bg-info text-white"
            title={moment(datetime).format("YYYY-MM-DD HH:mm")}
          >
            <b>Flickr</b> on {moment(datetime).fromNow()}
          </Card.Footer>
        </Card>

        <FlickrModal
          show={this.state.modalShow}
          onHide={modalClose}
          imgSrc={oSrc}
        />
      </Fragment>
    );
  }
}
