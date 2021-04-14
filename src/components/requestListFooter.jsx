import React from "react";

const Footer = (props) => {
  function defineText() {
    let text = "No requests ResidentSleeper";
    if (props.requests.length !== 0) {
      text = "--Some more requests--";
    }
    return text;
  }

  return (
    <React.Fragment>
      <div className="footer">{defineText()}</div>
    </React.Fragment>
  );
};

export default Footer;
