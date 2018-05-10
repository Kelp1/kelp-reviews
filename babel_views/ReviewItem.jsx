'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _VotePanel = require('./VotePanel.jsx');

var _VotePanel2 = _interopRequireDefault(_VotePanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReviewItem = function ReviewItem(props) {
  return _react2.default.createElement(
    'li',
    { className: 'review-wrapper' },
    _react2.default.createElement(
      'div',
      { style: { 'verticalAlign': 'top', 'alignContent': 'center', display: 'inline-block', width: '25%', boxsizing: 'border-box' } },
      _react2.default.createElement(
        'div',
        { style: { 'verticalAlign': 'top', padding: '10px', display: 'inline-block', width: '10px', boxsizing: 'border-box' } },
        '\xA0'
      ),
      _react2.default.createElement(
        'div',
        { style: { 'verticalAlign': 'top', padding: '10px', display: 'inline-block', width: '70px', boxsizing: 'border-box' } },
        _react2.default.createElement('img', { src: props.review.user_id.picture, alt: props.review.user_id.name, width: '60', style: { 'borderRadius': '5px' } })
      ),
      _react2.default.createElement(
        'div',
        { className: 'media-story', style: { 'verticalAlign': 'top', padding: '8px', display: 'inline-block', boxsizing: 'border-box' } },
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              { herf: '#' },
              _react2.default.createElement(
                'b',
                null,
                props.review.user_id.name
              )
            )
          ),
          _react2.default.createElement(
            'li',
            { style: { 'fontSize': '12px' } },
            _react2.default.createElement(
              'span',
              { 'aria-hidden': 'true', style: { fill: '#f15c00', width: '18px', height: '18px' }, className: 'icon icon--18-friends icon--size-18' },
              _react2.default.createElement(
                'svg',
                { className: 'icon_svg' },
                _react2.default.createElement(
                  'svg',
                  { id: '18x18_friends', height: '100%', viewBox: '0 0 18 18', width: '100%' },
                  _react2.default.createElement(
                    'g',
                    null,
                    _react2.default.createElement('path', { d: 'M7.904 9.43l-2.098 4.697a.9.9 0 0 1-1.612 0L2.096 9.43a.902.902 0 0 1 .806-1.305h4.196c.67 0 1.105.705.806 1.305zM5 7.375a2 2 0 1 1 0-4 2 2 0 0 1 0 4z' }),
                    _react2.default.createElement('path', { d: 'M15.904 9.43l-2.098 4.697a.89.89 0 0 1-.806.498.89.89 0 0 1-.806-.498L10.096 9.43a.902.902 0 0 1 .806-1.305h4.195c.67 0 1.106.705.807 1.305zM13 7.375a2 2 0 1 1 0-4 2 2 0 0 1 0 4z', opacity: '.502' })
                  )
                )
              )
            ),
            _react2.default.createElement(
              'b',
              null,
              props.review.user_id.friends.length
            ),
            '\xA0friends'
          ),
          _react2.default.createElement(
            'li',
            { style: { 'fontSize': '12px' } },
            _react2.default.createElement(
              'span',
              { 'aria-hidden': 'true', style: { fill: '#f15c00', width: '18px', height: '18px' }, className: 'icon icon--18-review icon--size-18' },
              _react2.default.createElement(
                'svg',
                { className: 'icon_svg' },
                _react2.default.createElement(
                  'svg',
                  { id: '18x18_review', height: '100%', viewBox: '0 0 18 18', width: '100%' },
                  _react2.default.createElement('path', { d: 'M13 3H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1.505 9.643l-2.526-1.55L6.526 12.7 7 9.934 5 7.977l2.766-.404L8.97 4.7l1.264 2.873L13 7.977l-2 1.957.495 2.71z' })
                )
              )
            ),
            _react2.default.createElement(
              'b',
              null,
              props.review.user_id.review_count
            ),
            '\xA0reviews'
          )
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'review-content', style: { 'verticalAlign': 'bottom', display: 'inline-block', width: '75%', boxsizing: 'border-box' } },
      _react2.default.createElement('img', { src: props.review.stars, alt: '' }),
      ' \xA0 ',
      (0, _moment2.default)(props.review.date).format('M/D/YYYY'),
      _react2.default.createElement('br', null),
      _react2.default.createElement('br', null),
      props.review.text.map(function (paragraph, index) {
        return _react2.default.createElement(Paragraph, { paragraph: paragraph, key: index });
      }),
      _react2.default.createElement('br', null),
      _react2.default.createElement('br', null),
      _react2.default.createElement(_VotePanel2.default, { review: props.review })
    ),
    _react2.default.createElement('br', null),
    _react2.default.createElement('br', null)
  );
};

var Paragraph = function Paragraph(props) {
  return _react2.default.createElement(
    'p',
    null,
    props.paragraph
  );
};

exports.default = ReviewItem;