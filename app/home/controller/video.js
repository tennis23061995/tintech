'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * index action
   * @return {Promise} []
   */
  _class.prototype.indexAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var keyword, categoryid, category, lstparentmenu, navList, i, submenu, submenusid, j;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 搜索功能
              keyword = this.get('keyword');
              categoryid = this.get('category');
              _context.next = 4;
              return this.model("home").findOne("item", { id: categoryid });

            case 4:
              category = _context.sent;
              _context.next = 7;
              return this.model("home").findAll('item', { parentid: ['IN', [0]] });

            case 7:
              lstparentmenu = _context.sent;
              navList = { menu: [] };
              i = 0;

            case 10:
              if (!(i < lstparentmenu.length)) {
                _context.next = 20;
                break;
              }

              _context.next = 13;
              return this.model("home").findAll('item', { parentid: ['IN', [parseInt(lstparentmenu[i].id)]] });

            case 13:
              submenu = _context.sent;
              submenusid = [];

              for (j = 0; j < submenu.length; j++) {
                submenusid.push(submenu[j].id);
              }
              navList.menu.push({ parentmenu: JSON.parse((0, _stringify2.default)(lstparentmenu[i])), submenus: JSON.parse((0, _stringify2.default)(submenu)), submenusid: submenusid });

            case 17:
              i++;
              _context.next = 10;
              break;

            case 20:
              this.assign("navList", navList);
              this.assign("title", "全站搜索");
              this.assign("keyword", keyword);
              this.assign("category", category);
              return _context.abrupt('return', this.displayView("video_index"));

            case 25:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function indexAction() {
      return _ref.apply(this, arguments);
    }

    return indexAction;
  }();

  _class.prototype.getdatavideoAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var keyword, category, pagenumber, pagesize, map, categories, ids, ca, i, itemList;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.post('keyword');

            case 2:
              keyword = _context2.sent;
              _context2.next = 5;
              return this.post('category');

            case 5:
              _context2.t0 = _context2.sent;

              if (_context2.t0) {
                _context2.next = 8;
                break;
              }

              _context2.t0 = 0;

            case 8:
              category = _context2.t0;
              _context2.next = 11;
              return this.post("page");

            case 11:
              _context2.t1 = _context2.sent;

              if (_context2.t1) {
                _context2.next = 14;
                break;
              }

              _context2.t1 = 1;

            case 14:
              pagenumber = _context2.t1;
              pagesize = this.post("pagesize") || 10;

              console.log(category);
              map = { title: ["like", "%" + keyword + "%"], ispublished: 1 };

              if (!(category != 0)) {
                _context2.next = 24;
                break;
              }

              _context2.next = 21;
              return this.model("home").findAll("item", { parentid: category });

            case 21:
              categories = _context2.sent;

              console.log(categories.length);
              if (categories.length == 0) map = { title: ["like", "%" + keyword + "%"], ispublished: 1, item: category };else {
                ids = [category];
                ca = JSON.parse((0, _stringify2.default)(categories));

                console.log(JSON.parse((0, _stringify2.default)(categories)));
                for (i = 0; i < ca.length; i++) {
                  ids.push(ca[i].id);
                }
                map = { title: ["like", "%" + keyword + "%"], ispublished: 1, item: ['IN', ids] };
              }

            case 24:
              _context2.next = 26;
              return this.model("home").getPageVideoSelect(map, pagenumber, pagesize);

            case 26:
              itemList = _context2.sent;

              if (!(itemList.length > 0)) {
                _context2.next = 31;
                break;
              }

              return _context2.abrupt('return', this.success({ total: itemList.length, content: JSON.parse((0, _stringify2.default)(itemList)) }));

            case 31:
              return _context2.abrupt('return', this.success({ total: 0, content: {} }));

            case 32:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getdatavideoAction() {
      return _ref2.apply(this, arguments);
    }

    return getdatavideoAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=video.js.map