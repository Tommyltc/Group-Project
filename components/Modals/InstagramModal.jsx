import { PureComponent } from "react";
import { Modal, Container, Row, Col, Image } from "react-bootstrap";

export default class InstagramModal extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { show, onHide, title, description, alt, imgSrc } = this.props;

    return (
      <div>
        <style jsx global>{`
          .InstagramModal {
            max-width: 70vw;
            width: 70vw;
          }
          .InstagramModal .img-center {
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
          dialogClassName="InstagramModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {description ? <p>{description}</p> : null}
            <div>
              <Image src={imgSrc} alt={alt} title={alt} className="img-center" />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
