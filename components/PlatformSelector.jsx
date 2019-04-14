import { PureComponent } from "react";
import { Form } from "react-bootstrap";

export default class PlatformSelector extends PureComponent {

  render() {
    const { selected_platform, handleCheckboxChange } = this.props;

    return (
      <div className="p-2 platformSelector">
        <style jsx global>{`
          .platformSelector {
            background-color: #FFFFBB;
            opacity: 0.9;
          }
          .bg-youtube {
            background-color: rgb(255, 0, 0) !important;
          }
          .bg-pinterest {
            background-color: rgb(189, 8, 28) !important;
          }
          label{
            font-weight: bold;
            cursor: pointer;
            font-size: 0.9rem;
            text-transform: capitalize;
          }
          @media (max-width: 399px) {
            label {
              font-size: 0.7rem;
              padding-top: 0.3rem;
            }
          }
          label[for="checkbox-instagram"]{
            color: #343a40;
          }
          label[for="checkbox-youtube"]{
            color: #FF0000;
          }
          label[for="checkbox-flickr"]{
            color: #17a2b8;
          }
          label[for="checkbox-pinterest"]{
            color: rgb(189, 8, 28);
          }
        `}</style>
        {["instagram", "youtube", "flickr", "pinterest"].map(platform => (
          <Form.Check
            custom
            inline
            label={platform}
            type="checkbox"
            id={`checkbox-${platform}`}
            key={platform}
            defaultChecked={selected_platform.indexOf(platform) !== -1}
            onChange={e => {
              handleCheckboxChange(platform, e.target.checked);
            }}
          />
        ))}
      </div>
    );
  }
}
