'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCookie = require('react-cookie');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _VoteButton = require('./VoteButton.jsx');

var _VoteButton2 = _interopRequireDefault(_VoteButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VotePanel = function (_React$Component) {
  _inherits(VotePanel, _React$Component);

  function VotePanel(props) {
    _classCallCheck(this, VotePanel);

    var _this = _possibleConstructorReturn(this, (VotePanel.__proto__ || Object.getPrototypeOf(VotePanel)).call(this, props));

    _this.props = props;
    _this.increaseVote = _this.increaseVote.bind(_this);
    _this.didUserVoteFor = _this.didUserVoteFor.bind(_this);
    //this.uniqueUnion = this.uniqueUnion.bind(this);
    //this.generateUUID = this.generateUUID.bind(this);
    return _this;
  }

  _createClass(VotePanel, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var cookies = this.props.cookies;


      var uid = cookies.get('UserID');
      if (uid === undefined) {
        uid = this.generateUUID();
        cookies.set('UserID', uid, { path: '/' });
      }

      var votes = this.uniqueUnion(this.props.review.cool_votes, this.uniqueUnion(this.props.review.useful_votes, this.props.review.funny_votes)).length;

      var coolClassStr = 'ybtn ybtn--small';
      var coolImgStr = 'https://s3.amazonaws.com/hrsf93welpusers/cool.png';
      var usefulClassStr = 'ybtn ybtn--small';
      var usefulImgStr = 'https://s3.amazonaws.com/hrsf93welpusers/useful.png';
      var funnyClassStr = 'ybtn ybtn--small';
      var funnyImgStr = 'https://s3.amazonaws.com/hrsf93welpusers/funny.png';
      var userVotedCool = this.didUserVoteFor(this.props.review.cool_votes, uid);
      if (userVotedCool) {
        coolClassStr = 'ybtn ybtn--small voted';
        coolImgStr = 'https://s3.amazonaws.com/hrsf93welpusers/cool-white.png';
      }
      var userVotedFunny = this.didUserVoteFor(this.props.review.funny_votes, uid);
      if (userVotedFunny) {
        funnyClassStr = 'ybtn ybtn--small voted';
        funnyImgStr = 'https://s3.amazonaws.com/hrsf93welpusers/funny-white.png';
      }
      var userVotedUseful = this.didUserVoteFor(this.props.review.useful_votes, uid);
      if (userVotedUseful) {
        usefulClassStr = 'ybtn ybtn--small voted';
        usefulImgStr = 'https://s3.amazonaws.com/hrsf93welpusers/useful-white.png';
      }

      var voteString = this.generateVoteString(uid);

      this.state = {
        voteIntro: voteString,
        coolVote: userVotedCool,
        usefulVote: userVotedUseful,
        funnyVote: userVotedFunny,
        coolClass: coolClassStr,
        usefulClass: usefulClassStr,
        funnyClass: funnyClassStr,
        coolImg: coolImgStr,
        usefulImg: usefulImgStr,
        funnyImg: funnyImgStr,
        UserID: uid,
        coolCount: this.props.review.cool,
        usefulCount: this.props.review.useful,
        funnyCount: this.props.review.funny
      };
    }
  }, {
    key: 'generateVoteString',
    value: function generateVoteString(UserID) {
      var votes = this.uniqueUnion(this.props.review.cool_votes, this.uniqueUnion(this.props.review.useful_votes, this.props.review.funny_votes)).length;

      var userVotedCool = this.didUserVoteFor(this.props.review.cool_votes, UserID);
      var userVotedFunny = this.didUserVoteFor(this.props.review.funny_votes, UserID);
      var userVotedUseful = this.didUserVoteFor(this.props.review.useful_votes, UserID);

      var voteString = '';
      if (userVotedCool || userVotedFunny || userVotedUseful) {
        voteString = 'Thanks for your vote';
      } else if (votes === 0) {
        voteString = 'Was this review ...?';
      } else if (votes === 1) {
        voteString = 'A user voted for this review';
      } else {
        voteString = votes + ' voted for this review.';
      }
      return voteString;
    }
  }, {
    key: 'generateUUID',
    value: function generateUUID() {
      // Public Domain/MIT
      var d = new Date().getTime();
      if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
      }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
      });
    }
  }, {
    key: 'removeVote',
    value: function removeVote(votes) {
      if (votes === undefined) {
        votes = [];
      }
      for (var i = votes.length - 1; i >= 0; i -= 1) {
        if (votes[i] === this.state.UserID) {
          votes.splice(i, 1);
        }
      }
      return votes;
    }
  }, {
    key: 'addVote',
    value: function addVote(votes) {
      if (votes === undefined) {
        votes = [];
      }
      votes.push(this.state.UserID);
      return votes;
    }
  }, {
    key: 'increaseVote',
    value: function increaseVote(reviewId, whichButton) {
      var direction = '';
      if (whichButton === 'cool') {
        if (this.state.coolVote) {
          direction = 'down';
          var c = this.state.coolCount - 1;
          this.props.review.cool_votes = this.removeVote(this.props.review.cool_votes);
          var vs = this.generateVoteString(this.state.UserID);
          this.setState({ voteIntro: vs, coolVote: false, coolCount: c, coolClass: 'ybtn ybtn--small', coolImg: 'https://s3.amazonaws.com/hrsf93welpusers/cool.png' });
        } else {
          direction = 'up';
          var _c = this.state.coolCount + 1;
          this.props.review.cool_votes = this.addVote(this.props.review.cool_votes);
          var _vs = this.generateVoteString(this.state.UserID);
          this.setState({ voteIntro: _vs, coolVote: true, coolCount: _c, coolClass: 'ybtn ybtn--small voted', coolImg: 'https://s3.amazonaws.com/hrsf93welpusers/cool-white.png' });
        }
      } else if (whichButton === 'funny') {
        if (this.state.funnyVote) {
          direction = 'down';
          var _c2 = this.state.funnyCount - 1;
          this.props.review.funny_votes = this.removeVote(this.props.review.funny_votes);
          var _vs2 = this.generateVoteString(this.state.UserID);
          this.setState({ voteIntro: _vs2, funnyVote: false, funnyCount: _c2, funnyClass: 'ybtn ybtn--small', funnyImg: 'https://s3.amazonaws.com/hrsf93welpusers/funny.png' });
        } else {
          direction = 'up';
          var _c3 = this.state.funnyCount + 1;
          this.props.review.funny_votes = this.addVote(this.props.review.funny_votes);
          var _vs3 = this.generateVoteString(this.state.UserID);
          this.setState({ voteIntro: _vs3, funnyVote: true, funnyCount: _c3, funnyClass: 'ybtn ybtn--small voted', funnyImg: 'https://s3.amazonaws.com/hrsf93welpusers/funny-white.png' });
        }
      } else if (whichButton === 'useful') {
        if (this.state.usefulVote) {
          direction = 'down';
          var _c4 = this.state.usefulCount - 1;
          this.props.review.useful_votes = this.removeVote(this.props.review.useful_votes);
          var _vs4 = this.generateVoteString(this.state.UserID);
          this.setState({ voteIntro: _vs4, usefulVote: false, usefulCount: _c4, usefulClass: 'ybtn ybtn--small', usefulImg: 'https://s3.amazonaws.com/hrsf93welpusers/useful.png' });
        } else {
          direction = 'up';
          var _c5 = this.state.usefulCount + 1;
          this.props.review.useful_votes = this.addVote(this.props.review.useful_votes);
          var _vs5 = this.generateVoteString(this.state.UserID);
          this.setState({ voteIntro: _vs5, usefulVote: true, usefulCount: _c5, usefulClass: 'ybtn ybtn--small voted', usefulImg: 'https://s3.amazonaws.com/hrsf93welpusers/useful-white.png' });
        }
      }

      _jquery2.default.ajax({
        url: 'http://18.188.254.251:80/api/review/votes/' + reviewId + '/' + whichButton + '/' + direction + '/' + this.state.UserID,
        error: function error(err) {
          console.log(err);
        },
        success: function success(data) {
          console.log(data);
        },
        type: 'PUT'
      });
    }
  }, {
    key: 'uniqueUnion',
    value: function uniqueUnion(a, b) {
      if (a === undefined) {
        a = [];
      }
      if (b === undefined) {
        b = [];
      }
      var c = a.concat(b.filter(function (item) {
        return a.indexOf(item) < 0;
      }));
      return c;
    }
  }, {
    key: 'didUserVoteFor',
    value: function didUserVoteFor(voteCategory, UserID) {
      if (voteCategory === undefined) {
        return false;
      }
      var found = false;
      found = voteCategory.includes(UserID);
      return found;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'review-footer clearfix' },
        _react2.default.createElement(
          'div',
          { className: 'rateReview voting-feedback' },
          _react2.default.createElement(
            'p',
            { className: 'voting-intro voting prompt' },
            this.state.voteIntro
          ),
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(_VoteButton2.default, { click: this.increaseVote, reviewId: this.props.review.review_id, title: 'useful', imageUrl: this.state.usefulImg, count: this.state.usefulCount, userVoted: this.state.usefulClass }),
            '\xA0',
            _react2.default.createElement(_VoteButton2.default, { click: this.increaseVote, reviewId: this.props.review.review_id, title: 'funny', imageUrl: this.state.funnyImg, count: this.state.funnyCount, userVoted: this.state.funnyClass }),
            '\xA0',
            _react2.default.createElement(_VoteButton2.default, { click: this.increaseVote, reviewId: this.props.review.review_id, title: 'cool', imageUrl: this.state.coolImg, count: this.state.coolCount, userVoted: this.state.coolClass })
          )
        )
      );
    }
  }]);

  return VotePanel;
}(_react2.default.Component);

exports.default = (0, _reactCookie.withCookies)(VotePanel);