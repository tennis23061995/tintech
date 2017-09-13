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
      var lstparentmenu, navList, i, submenu, submenusid, j;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.model("topic").findAll('item', { parentid: ['IN', [0]] });

            case 2:
              lstparentmenu = _context.sent;
              navList = { menu: [] };
              i = 0;

            case 5:
              if (!(i < lstparentmenu.length)) {
                _context.next = 15;
                break;
              }

              _context.next = 8;
              return this.model("topic").findAll('item', { parentid: ['IN', [parseInt(lstparentmenu[i].id)]] });

            case 8:
              submenu = _context.sent;
              submenusid = [];

              for (j = 0; j < submenu.length; j++) {
                submenusid.push(submenu[j].id);
              }
              navList.menu.push({ parentmenu: JSON.parse((0, _stringify2.default)(lstparentmenu[i])), submenus: JSON.parse((0, _stringify2.default)(submenu)), submenusid: submenusid });

            case 12:
              i++;
              _context.next = 5;
              break;

            case 15:
              //let navList = await this.model("home").findAll('item',{parentid:['IN', [0]]});
              this.assign("navList", navList);
              return _context.abrupt('return', this.displayView("index_index"));

            case 17:
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

  _class.prototype.categoryAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var itemurl, itemid, itemurlrewrite, category, ids, categories, i, map, pagenumber, pagesize, itemList, result, Page, page, pageData;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              itemurl = this.get("url");

              console.log(itemurl);
              itemid = itemurl.split('-')[itemurl.split('-').length - 1];
              itemurlrewrite = itemurl.replace("-" + itemid, "");
              _context2.next = 6;
              return this.model("topic").findOne("item", { id: itemid, urlrewrite: itemurlrewrite });

            case 6:
              category = _context2.sent;
              ids = [category.id];
              _context2.next = 10;
              return this.model("topic").findAll("item", { parentid: itemid });

            case 10:
              categories = _context2.sent;

              for (i = 0; i < categories.length; i++) {
                ids.push(categories[i].id);
              }

              if (think.isEmpty(category)) {
                _context2.next = 33;
                break;
              }

              this.assign("title", "Danh sách chủ đề");
              map = { item: ids, show: 1 };
              //  let topicList=await this.model('topic').getTopicListJoinRecord(map);

              pagenumber = this.get("page") || 1;
              pagesize = this.get("pagesize") || 20;
              //分页

              _context2.next = 19;
              return this.model("topic").getPageSelect(map, pagenumber, pagesize);

            case 19:
              itemList = _context2.sent;
              _context2.next = 22;
              return this.model("topic").getPageCountSelect(map, pagenumber, pagesize);

            case 22:
              result = _context2.sent;
              Page = think.adapter("template", "page");
              page = new Page(this.http);
              pageData = page.pagination(result);


              this.assign("itemList", itemList);
              this.assign('pageData', pageData);
              this.assign('category', category);
              this.assign('menu', "chu-de/" + category.urlrewrite + '-' + category.id);
              return _context2.abrupt('return', this.displayView("category_index"));

            case 33:
              return _context2.abrupt('return', this.displayView("../common/error_404"));

            case 34:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function categoryAction() {
      return _ref2.apply(this, arguments);
    }

    return categoryAction;
  }();

  _class.prototype.getuserAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var name, user;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.post("name");

            case 2:
              name = _context3.sent;

              console.log(name);
              _context3.next = 6;
              return this.model('topic').findAll('user', { name: name });

            case 6:
              user = _context3.sent;

              if (think.isEmpty(user)) {
                _context3.next = 11;
                break;
              }

              return _context3.abrupt('return', this.success(JSON.parse((0, _stringify2.default)(user))));

            case 11:
              return _context3.abrupt('return', this.success());

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getuserAction() {
      return _ref3.apply(this, arguments);
    }

    return getuserAction;
  }();

  _class.prototype.itemAction = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var itemurl, topicurl, itemid, itemurlrewrite, tid, urlrewrite, topic_item, topicInfo, uinfo, islogin, loginuserinfo, collectList, replyList, viewcount, acc;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.get("itemurl");

            case 2:
              itemurl = _context4.sent;
              _context4.next = 5;
              return this.get("topicurl");

            case 5:
              topicurl = _context4.sent;

              console.log(itemurl);
              console.log(topicurl);
              itemid = itemurl.split('-')[itemurl.split('-').length - 1];
              itemurlrewrite = itemurl.replace("-" + itemid, "");
              tid = topicurl.split('-')[topicurl.split('-').length - 1];
              urlrewrite = topicurl.replace("-" + tid, "");
              _context4.next = 14;
              return this.model('topic').findOne('item', { urlrewrite: itemurlrewrite, id: itemid });

            case 14:
              topic_item = _context4.sent;

              if (think.isEmpty(topic_item)) {
                _context4.next = 55;
                break;
              }

              _context4.next = 18;
              return this.model("topic").findOne("topic", { urlrewrite: urlrewrite, id: tid });

            case 18:
              topicInfo = _context4.sent;

              if (think.isEmpty(topicInfo)) {
                _context4.next = 52;
                break;
              }

              _context4.next = 22;
              return this.session('uInfo');

            case 22:
              uinfo = _context4.sent;
              islogin = !think.isEmpty(uinfo) ? 1 : 0;

              this.assign("islogin", islogin);

              if (think.isEmpty(uinfo)) {
                _context4.next = 36;
                break;
              }

              _context4.next = 28;
              return this.model('topic').findAll('user', { name: uinfo.name });

            case 28:
              loginuserinfo = _context4.sent;

              this.assign("loginuserinfo", loginuserinfo[0]);
              //获取收藏信息
              _context4.next = 32;
              return this.model('topic').findAll('user_collect', { aid: tid, type: 'topic', author: uinfo.name, iscollect: 1 });

            case 32:
              collectList = _context4.sent;

              if (collectList.length > 0) {
                this.assign("cid", collectList[0].id);
                this.assign("iscollect", 1);
              } else {
                this.assign("cid", "");
                this.assign("iscollect", 0);
              }
              _context4.next = 37;
              break;

            case 36:
              this.assign("loginuserinfo", {});

            case 37:
              _context4.next = 39;
              return this.model("topic").getReplyListInfo({ tid: tid });

            case 39:
              replyList = _context4.sent;

              this.assign("replyList", replyList);
              _context4.next = 43;
              return this.model("topic").where({ id: tid }).increment('view', 1);

            case 43:
              viewcount = _context4.sent;
              acc = this.model('topic').findOne('user', { name: topicInfo.author });

              console.log(acc);
              if (!think.isEmpty(acc)) {
                this.assign('acc', acc);
              }
              this.assign('topicInfo', topicInfo);
              this.assign("replycount", topicInfo.replycount);
              return _context4.abrupt('return', this.displayView("index_item"));

            case 52:
              return _context4.abrupt('return', this.displayView("../common/error_404"));

            case 53:
              _context4.next = 56;
              break;

            case 55:
              return _context4.abrupt('return', this.displayView("../common/error_404"));

            case 56:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function itemAction() {
      return _ref4.apply(this, arguments);
    }

    return itemAction;
  }();

  _class.prototype.editAction = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var tid, replyInfo, topicInfo;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.get("tid");

            case 2:
              tid = _context5.sent;
              _context5.next = 5;
              return this.model("topic").findOne("topic_comment", { id: tid });

            case 5:
              replyInfo = _context5.sent;
              _context5.next = 8;
              return this.model("topic").findOne("topic", { id: replyInfo.tid });

            case 8:
              topicInfo = _context5.sent;

              this.assign("title", "回复编辑");
              this.assign("replyInfo", replyInfo);
              this.assign("topicInfo", topicInfo);
              return _context5.abrupt('return', this.displayView("index_edit"));

            case 13:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function editAction() {
      return _ref5.apply(this, arguments);
    }

    return editAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=index.js.map