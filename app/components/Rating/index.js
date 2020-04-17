import React from "react";
//Lib
import "./style.scss";

export default class Rating extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showRatings = (star) => {
    var result = [];
    for (var i = 1; i <= star.toFixed(); i++) {
      result.push(<span key={i} className="icon-star-full"/>);
    }
    for (var j = 1; j <= (5 - star.toFixed()); j++) {
      result.push(<span key={i + j} className="icon-star-full custom"/>);
    }
    return result;
  };

  render() {
    const {
      value = 0
    } = this.props;

    return (
      <div className="rating-wrapper">
        <ul className="rating">
          <li>{this.showRatings(value)}</li>
        </ul>
      </div>
    );
  }
}
