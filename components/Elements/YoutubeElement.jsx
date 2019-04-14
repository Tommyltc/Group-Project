import { PureComponent, Fragment } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

import YoutubeModal from "../Modals/YoutubeModal";

export default class YoutubeElement extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { modalShow: false };
  }

  render() {
    const { id, title, description, photo, datetime } = this.props.data;
    const { keyword } = this.props;

    const link = "https://www.youtube.com/watch?v=" + id;
    const alt =
      title ||
      "Video thumbnail" + (keyword ? " about " + keyword : "") + " on Youtube";

    let modalClose = () => this.setState({ modalShow: false });

    return (
      <Fragment>
        <Card className="element youtube">
          <Card.Img
            variant="top"
            src={photo}
            onClick={() => this.setState({ modalShow: true })}
            style={{ cursor: "pointer" }}
            alt={alt}
            title={alt}
          />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>{description}</Card.Subtitle>
          </Card.Body>
          <Card.Footer
            className="small p-1 pl-3 bg-youtube text-white"
            title={moment(datetime).format("YYYY-MM-DD HH:mm")}
          >
            <a target="_blank" href={"https://www.youtube.com/watch?v=" + id}>
              <b>Youtube</b> on {moment(datetime).fromNow()}
            </a>
          </Card.Footer>
        </Card>

        <YoutubeModal
          show={this.state.modalShow}
          onHide={modalClose}
          title={alt}
          description={description}
          alt={alt}
          videoId={id}
        />
      </Fragment>
    );
  }
}
