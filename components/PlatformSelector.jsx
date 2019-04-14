import { PureComponent } from "react";
import { Form } from "react-bootstrap";

export default class PlatformSelector extends PureComponent {

  render() {
    const { selected_platform, handleCheckboxChange } = this.props;

    return (
      <div className="p-2 subheader">
        <style jsx global>{`
          .subheader {
            display: flex;
            background-color: #FFFFBB;
            opacity: 0.9;
          }
          .platformSelector{
            display: inline-block;
          }
          .hotKeyword{
            display: inline-block;
            font-size: 0.9rem
          }
          @media (max-width: 770px) {
            .subheader {
              display: block;
            }
            .platformSelector {
              display: block;
            }
            .hotKeyword {
              display: block;
              margin-top: 0.2rem;
            }
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
        <div className="platformSelector mr-auto">
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
        <div className="hotKeyword">
          <b>Most people searching:</b>{` `}
          <a href="/polyu">polyu</a>
          {` | `}
          <a href="/hongkong">hongkong</a>
          {` | `}
          <a href="/itdog">itdog</a>
          {` | `}
          <a href="/hkig">hkig</a>
        </div>
      </div>
    );
  }
}
