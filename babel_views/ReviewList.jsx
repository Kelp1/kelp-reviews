'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReviewItem = require('./ReviewItem.jsx');

var _ReviewItem2 = _interopRequireDefault(_ReviewItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReviewList = function ReviewList(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'ul',
      null,
      props.reviews.map(function (review) {
        return _react2.default.createElement(_ReviewItem2.default, { review: review, key: review.review_id });
      })
    )
  );
};

exports.default = ReviewList;