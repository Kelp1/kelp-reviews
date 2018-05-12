"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VoteButton = function VoteButton(props) {
  return _react2.default.createElement(
    "li",
    { className: "vote-item inline-block" },
    _react2.default.createElement(
      "span",
      { className: props.userVoted, onClick: function onClick() {
          props.click(props.reviewId, props.title);
        } },
      _react2.default.createElement(
        "span",
        { "aria-hidden": "true", className: "icon icon--18-useful-outline icon--size-18 icon--currentColor button-content u-space-r-half" },
        _react2.default.createElement("img", { src: props.imageUrl, width: "18", height: "18", alt: "button" })
      ),
      _react2.default.createElement(
        "span",
        { className: "vote-type" },
        props.title,
        " ",
        props.count
      )
    )
  );
};

exports.default = VoteButton;