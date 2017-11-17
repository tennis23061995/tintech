'use strict';

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require("./base.js");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = {
  mydb: "item",
  title: "Danh sách danh mục",
  edit: "Cập nhật danh mục",
  add: "Thêm danh mục",
  action: "item"
};

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
      var parentid, parentmenu, info, mydata;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              parentid = this.get('id') || 0;
              _context.next = 3;
              return this.model('admin').findOne('item', { id: parentid });

            case 3:
              parentmenu = _context.sent;
              info = {
                where: { parentid: parentid },
                db: init.mydb,
                page: this.get("page") || 1,
                pagesize: this.get("pagesize") || 10
              };
              //console.log(parentid);

              _context.next = 7;
              return this.model('util').getIndex(info);

            case 7:
              mydata = _context.sent;

              this.assign("itemList", mydata.itemList);
              this.assign("parentmenu", parentmenu);
              this.assign('pageData', mydata.pageData);
              this.assign("title", init.title);
              this.assign("action", init.action);
              return _context.abrupt("return", this.display());

            case 14:
            case "end":
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

  _class.prototype.itemAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var info, parentid, mydata;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              info = {
                db: init.mydb,
                edit: init.edit,
                add: init.add,
                id: this.get('id')
              };
              _context2.next = 3;
              return this.get('pid');

            case 3:
              parentid = _context2.sent;
              _context2.next = 6;
              return this.model('util').getItem(info);

            case 6:
              mydata = _context2.sent;

              this.assign("parentid", parentid);
              this.assign("title", mydata.title);
              this.assign('item', mydata.item);
              this.assign("action", init.action);
              return _context2.abrupt("return", this.display());

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function itemAction() {
      return _ref2.apply(this, arguments);
    }

    return itemAction;
  }();

  //编辑或者新增接口


  _class.prototype.saveAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var info, menu, items, i, item, videos, topics, mydata;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              info = {
                db: init.mydb,
                data: this.post(),
                id: this.post('id')
              };

              info.data.lastmodified = think.datetime(new Date());

              if (!(!think.isEmpty(info.id) || info.id != 0)) {
                _context3.next = 46;
                break;
              }

              _context3.next = 5;
              return this.model("admin").findOne("item", { id: info.id });

            case 5:
              menu = _context3.sent;

              if (!(menu.itemname != info.data.itemname)) {
                _context3.next = 46;
                break;
              }

              _context3.next = 9;
              return this.model("admin").findAll("article", { item: info.id });

            case 9:
              items = _context3.sent;
              i = 0;

            case 11:
              if (!(i < items.length)) {
                _context3.next = 20;
                break;
              }

              item = items[i];

              item.itemurlrewrite = info.data.urlrewrite;
              item.itemname = info.data.itemname;
              _context3.next = 17;
              return this.model("admin").updateRecord("article", {}, item);

            case 17:
              i++;
              _context3.next = 11;
              break;

            case 20:
              _context3.next = 22;
              return this.model("admin").findAll("video", { item: info.id });

            case 22:
              videos = _context3.sent;
              i = 0;

            case 24:
              if (!(i < videos.length)) {
                _context3.next = 33;
                break;
              }

              item = videos[i];

              item.itemurlrewrite = info.data.urlrewrite;
              item.itemname = info.data.itemname;
              _context3.next = 30;
              return this.model("admin").updateRecord("video", {}, item);

            case 30:
              i++;
              _context3.next = 24;
              break;

            case 33:
              _context3.next = 35;
              return this.model("admin").findAll("topic", { item: info.id });

            case 35:
              topics = _context3.sent;
              i = 0;

            case 37:
              if (!(i < topics.length)) {
                _context3.next = 46;
                break;
              }

              item = topics[i];

              item.itemurlrewrite = info.data.urlrewrite;
              item.itemname = info.data.itemname;
              _context3.next = 43;
              return this.model("admin").updateRecord("topic", {}, item);

            case 43:
              i++;
              _context3.next = 37;
              break;

            case 46:
              think.cache('menuList', null);
              _context3.next = 49;
              return this.model('util').doSave(info);

            case 49:
              mydata = _context3.sent;

              if (!(mydata.status === 1)) {
                _context3.next = 52;
                break;
              }

              return _context3.abrupt("return", this.success({ parentid: info.data.parentid }));

            case 52:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function saveAction() {
      return _ref3.apply(this, arguments);
    }

    return saveAction;
  }();

  //删除或批量删除接口


  _class.prototype.delsomeAction = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var info, where, rs;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              info = {
                db: init.mydb,
                arr: this.post('delarr[]')
              };
              where = { id: ["IN", info.arr] };

              think.cache('menuList', null);
              _context4.next = 5;
              return this.model("admin").deleteRecord(info.db, where);

            case 5:
              rs = _context4.sent;

              if (!rs) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", this.success());

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function delsomeAction() {
      return _ref4.apply(this, arguments);
    }

    return delsomeAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=item.js.map