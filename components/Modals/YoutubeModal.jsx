import { PureComponent } from "react";
import { Modal, Container, Row, Col, Image } from "react-bootstrap";

export default class YoutubeModal extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { show, onHide, title, description, alt, videoId } = this.props;

    return (
      <div>
        <style jsx global>{`
          .YoutubeModal {
            max-width: 70vw;
            width: 70vw;
          }
          .YoutubeModal .img-center {
            display: block;
            margin-left: auto;
            margin-right: auto;
            max-width: 100%;
          }
        `}</style>

        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          dialogClassName="YoutubeModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {description ? <p>{description}</p> : null}
            <div style={{ textAlign: "center" }}>
              <iframe
                width="420"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameborder="0"
                alt={alt}
                title={alt}
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
