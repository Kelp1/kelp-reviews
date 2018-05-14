'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactstrap = require('reactstrap');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _ReviewList = require('./ReviewList.jsx');

var _ReviewList2 = _interopRequireDefault(_ReviewList);

var _TopReviewBar = require('./TopReviewBar.jsx');

var _TopReviewBar2 = _interopRequireDefault(_TopReviewBar);

var _reactCookie = require('react-cookie');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var queryString = require('query-string');

var Reviews = function (_React$Component) {
  _inherits(Reviews, _React$Component);

  function Reviews(props) {
    _classCallCheck(this, Reviews);

    var _this = _possibleConstructorReturn(this, (Reviews.__proto__ || Object.getPrototypeOf(Reviews)).call(this, props));

    _this.props = props;
    _this.search = _this.search.bind(_this);
    _this.sort = _this.sort.bind(_this);
    _this.state = {
      reviews: [],
      restaurantId: 0,
      name: '',
      sort: 1,
      page: 0,
      keyword: ''
    };
    return _this;
  }

  _createClass(Reviews, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // If the querystring has no paramaters then check the props
      // This is done for testing purposes to interface with jest and snapshots. 
      var parsed = queryString.parse(location.search);
      if (Object.keys(parsed).length !== 0) {
        this.setState({
          restaurantId: parsed.id,
          page: parsed.page,
          sort: parsed.sort
        });
        this.retrieveReviews(parsed.id);
      } else {
        this.setState({
          restaurantId: this.props.restaurantId,
          page: this.props.page,
          sort: this.props.sort,
          reviews: JSON.parse(this.props.data)
        });
      }
    }
  }, {
    key: 'retrieveReviews',
    value: function retrieveReviews(id, sort, page) {
      var keyword = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

      var context = this;
      var parsed = queryString.parse(location.search);
      if (id === undefined) {
        id = this.state.restaurantId;
      }
      if (sort === undefined) {
        sort = this.state.sort;
      }
      if (page === undefined) {
        page = this.state.page;
      }
      var urlString = 'http://localhost:3000/api/review/' + id + '/' + sort + '/' + page;
      if (keyword !== '') {
        urlString += '\\' + keyword;
      }
      _jquery2.default.ajax({
        url: urlString,
        dataType: 'json',
        success: function success(data) {
          console.log('Form the data comes in -->', data);
          context.setState({
            reviews: data,
            name: data[0].business_id.name
          });
        },
        type: 'GET'
      });
    }
  }, {
    key: 'search',
    value: function search(keyword) {
      this.retrieveReviews(undefined, undefined, undefined, keyword);
    }
  }, {
    key: 'sort',
    value: function sort(option) {
      this.setState({
        sort: option
      });
      this.retrieveReviews(undefined, option, undefined);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactCookie.CookiesProvider,
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_TopReviewBar2.default, { name: this.state.name, search: this.search, sort: this.sort })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_ReviewList2.default, { reviews: this.state.reviews })
          )
        )
      );
    }
  }]);

  return Reviews;
}(_react2.default.Component);

// ReactDOM.render(<Reviews />, document.getElementById('Reviews'));

exports.default = Reviews;