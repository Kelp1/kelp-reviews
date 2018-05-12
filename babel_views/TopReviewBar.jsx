'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dropdown = require('./dropdown.jsx');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _SearchBar = require('./SearchBar.jsx');

var _SearchBar2 = _interopRequireDefault(_SearchBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TopReviewBar = function TopReviewBar(props) {
  return _react2.default.createElement(
    'div',
    { className: 'section-header section-header--no-spacing' },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h2',
        null,
        'Recommended Reviews for ',
        _react2.default.createElement(
          'b',
          null,
          props.name
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'feed_trust-banner' },
      _react2.default.createElement(
        'div',
        { className: 'arrange arrange--12 arrange--middle' },
        _react2.default.createElement(
          'div',
          { className: 'arrange_unit' },
          _react2.default.createElement(
            'span',
            { 'aria-hidden': 'true', style: { fill: 'red', width: 24, height: 24 }, className: 'icon icon--24-yelp icon--size-24' },
            _react2.default.createElement(
              'svg',
              { className: 'icon_svg' },
              _react2.default.createElement(
                'svg',
                { id: '24x24_yelp', height: '100%', viewBox: '0 0 24 24', width: '100%' },
                _react2.default.createElement('path', { d: 'M18.803 12.49l-4.162 1.194c-.8.23-1.45-.666-.98-1.357l2.42-3.59a.893.893 0 0 1 1.33-.172 7.66 7.66 0 0 1 1.97 2.71.894.894 0 0 1-.572 1.215zm-4.187 2.627l4.117 1.338a.893.893 0 0 1 .53 1.233 7.762 7.762 0 0 1-2.058 2.64.894.894 0 0 1-1.326-.216l-2.3-3.674c-.44-.706.24-1.578 1.03-1.32zm-3.996-3.64l-4.07-7.05a.893.893 0 0 1 .388-1.25A12.475 12.475 0 0 1 11.324 2c.518-.04.96.37.96.89v8.138c0 .913-1.208 1.236-1.664.446zm-.714 3.475L5.704 16a.894.894 0 0 1-1.103-.767 7.68 7.68 0 0 1 .358-3.33.892.892 0 0 1 1.237-.516l3.89 1.898c.75.365.635 1.466-.173 1.667zm.738 1.23c.557-.62 1.584-.205 1.555.627l-.158 4.322c-.02.54-.51.94-1.04.85A7.76 7.76 0 0 1 7.9 20.73a.893.893 0 0 1-.156-1.333l2.897-3.22z' })
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'arrange_unit arrange_unit--fill' },
          _react2.default.createElement(
            'span',
            { className: 'legal-copy' },
            _react2.default.createElement(
              'b',
              null,
              'Your trust is our top concern,'
            ),
            ' so businesses cant pay to alter or remove their reviews. ',
            _react2.default.createElement(
              'a',
              { href: 'https://www.yelp.com/advertiser_faq' },
              'Learn more.'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'arrange_unit' },
          _react2.default.createElement(
            'span',
            { className: 'dismiss-link u-text-mid js-dismiss-trust-banner', role: 'button', 'aria-label': 'Close' },
            '\xD7'
          )
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'feed_filters u-space-t1 u-space-b1' },
      _react2.default.createElement(
        'div',
        { className: 'section-header_block u-space-0' },
        _react2.default.createElement(
          'div',
          { className: 'arrange arrange--middle' },
          _react2.default.createElement(
            'div',
            { className: 'arrange_unit arrange_unit--fill feed_search' },
            _react2.default.createElement(_SearchBar2.default, { search: props.search })
          ),
          _react2.default.createElement(
            'div',
            { className: 'arrange_unit u-nowrap', style: { position: 'relative', display: 'block' } },
            _react2.default.createElement(_dropdown2.default, { label: 'Sort by: ', sort: props.sort, menuItems: ['Yelp Sort', 'Newest First', 'Oldest First', 'Highest Rated', 'Lowest Rated', 'Elites'] })
          ),
          _react2.default.createElement(
            'div',
            { className: 'arrange_unit u-nowrap' },
            _react2.default.createElement(_dropdown2.default, { label: 'Language: ', menuItems: ['English 12345'], sort: props.sort })
          )
        )
      )
    )
  );
};

exports.default = TopReviewBar;