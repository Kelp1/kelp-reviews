'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropDown = function (_React$Component) {
  _inherits(DropDown, _React$Component);

  function DropDown(props) {
    _classCallCheck(this, DropDown);

    var _this = _possibleConstructorReturn(this, (DropDown.__proto__ || Object.getPrototypeOf(DropDown)).call(this, props));

    _this.sortBy = _this.sortBy.bind(_this);
    _this.state = {
      selectedItem: 0,
      isVisible: 'dropdown_menu js-dropdown-menu'
    };
    return _this;
  }

  _createClass(DropDown, [{
    key: 'toggleVisible',
    value: function toggleVisible(selected) {
      if (this.state.isVisible === 'dropdown_menu js-dropdown-menu') {
        this.setState({ isVisible: 'dropdown_menu js-dropdown-menu is-visible', selectedItem: selected });
      } else {
        this.setState({ isVisible: 'dropdown_menu js-dropdown-menu', selectedItem: selected });
      }
    }
  }, {
    key: 'sortBy',
    value: function sortBy(itemIndex) {
      this.props.sort(itemIndex);
    }
  }, {
    key: 'render',
    value: function render(props) {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'feed_sort js-review-feed-sort' },
        _react2.default.createElement(
          'div',
          { className: 'dropdown js-dropdown dropdown--tab dropdown--hover dropdown--restricted is-active', 'data-component-bound': 'true' },
          _react2.default.createElement(
            'div',
            { className: 'dropdown_toggle js-dropdown-toggle is-active', 'aria-haspopup': 'true', role: 'button', tabIndex: '-1' },
            _react2.default.createElement(
              'span',
              { className: 'dropdown_toggle-action', 'data-dropdown-prefix': 'Sort by', onClick: function onClick() {
                  _this2.toggleVisible(_this2.state.selectedItem);
                } },
              _react2.default.createElement(
                'span',
                { className: 'dropdown_prefix' },
                this.props.label
              ),
              _react2.default.createElement(
                'span',
                { className: 'dropdown_toggle-text js-dropdown-toggle-text' },
                this.props.menuItems[this.state.selectedItem]
              ),
              _react2.default.createElement(
                'span',
                { 'aria-hidden': 'true', style: { width: 14, height: 14 }, className: 'icon icon--14-triangle-down icon--size-14 icon--currentColor u-triangle-direction-down dropdown_arrow' },
                _react2.default.createElement(
                  'svg',
                  { className: 'icon_svg' },
                  _react2.default.createElement(
                    'svg',
                    { id: '14x14_triangle_down', height: '100%', viewBox: '0 0 14 14', width: '100%' },
                    _react2.default.createElement('path', { d: 'M7 9L3.5 5h7L7 9z' })
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'dropdown_menu-container' },
              _react2.default.createElement(
                'div',
                { className: this.state.isVisible, style: { position: 'absolute' } },
                _react2.default.createElement(
                  'div',
                  { className: 'dropdown_menu-inner' },
                  _react2.default.createElement(
                    'ul',
                    { className: 'dropdown_menu-group', role: 'menu', 'aria-hidden': 'false' },
                    this.props.menuItems.map(function (item, index) {
                      return _react2.default.createElement(DropDownItem, { item: item, key: index, itemIndex: index, context: _this2, itemSelected: index === _this2.state.selectedItem ? 'tab-link js-dropdown-link tab-link--dropdown js-tab-link--dropdown is-selected' : 'tab-link js-dropdown-link tab-link--dropdown js-tab-link--dropdown' });
                    })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return DropDown;
}(_react2.default.Component);

var DropDownItem = function DropDownItem(props) {
  return _react2.default.createElement(
    'li',
    { className: 'dropdown_item, menuItem', role: 'presentation' },
    _react2.default.createElement(
      'a',
      { className: props.itemSelected, onClick: function onClick() {
          props.context.toggleVisible(props.itemIndex);props.context.sortBy(props.itemIndex);
        }, 'data-review-feed-label': props.item, 'data-sort': 'relevance' },
      _react2.default.createElement(
        'span',
        { className: 'tab-link_label menuItem', title: '{props.item}' },
        props.item
      )
    )
  );
};

exports.default = DropDown;