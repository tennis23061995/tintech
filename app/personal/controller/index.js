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
      var uinfo, uname, isself, isselftag, islogin, topicList, replyList, topiccomment, i, topic, top, acc, replyListArticle, articlecomment, article, art, collectList, collectListArticle, userinfo;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.assign("title", "Trang cá nhân");
              _context.next = 3;
              return this.session('uInfo');

            case 3:
              uinfo = _context.sent;
              _context.next = 6;
              return this.get('uname');

            case 6:
              uname = _context.sent;
              isself = void 0, isselftag = void 0;

              if (think.isEmpty(uname)) {
                _context.next = 78;
                break;
              }

              // 是否登陆
              islogin = !think.isEmpty(uinfo) ? 1 : 0;
              // if(!think.isEmpty(uinfo)){

              //是否本人
              // if(!think.isEmpty(uinfo)){
              //   //登陆
              //   if(uinfo.name===uname){
              //     isselftag="Chủ đề";
              //     isself=1;
              //   }else{
              //     isselftag="Ta的";
              //     isself=0;
              //   }
              // }else {
              //   // 未登录
              //   isselftag="Ta的";
              //   isself=0;
              // }

              this.assign("islogin", islogin);
              // this.assign("isself",isself);
              // this.assign("isselftag",isselftag);

              //我的话题
              _context.next = 13;
              return this.model('personal').getMytopic({ author: uname });

            case 13:
              topicList = _context.sent;

              this.assign("topicList", topicList);

              //我的回复
              _context.next = 17;
              return this.model('personal').findAll('topic_comment', { author: uname });

            case 17:
              replyList = _context.sent;
              topiccomment = { topiccomment: [] };
              i = 0;

            case 20:
              if (!(i < replyList.length)) {
                _context.next = 35;
                break;
              }

              topic = {};

              topic.comment = replyList[i].comment;
              _context.next = 25;
              return this.model('personal').findOne("topic", { id: replyList[i].tid });

            case 25:
              top = _context.sent;
              _context.next = 28;
              return this.model('personal').findOne("user", { name: replyList[i].author });

            case 28:
              acc = _context.sent;

              if (!think.isEmpty(top)) {
                topic.topic = JSON.parse((0, _stringify2.default)(top));
              }
              if (!think.isEmpty(acc)) {
                topic.acc = JSON.parse((0, _stringify2.default)(acc));
              }
              topiccomment.topiccomment.push(topic);

            case 32:
              i++;
              _context.next = 20;
              break;

            case 35:
              console.log(topiccomment);
              this.assign("replyList", topiccomment);

              _context.next = 39;
              return this.model('personal').findAll('article_comment', { author: uname });

            case 39:
              replyListArticle = _context.sent;
              articlecomment = { articlecomment: [] };
              i = 0;

            case 42:
              if (!(i < replyListArticle.length)) {
                _context.next = 57;
                break;
              }

              article = {};

              article.comment = replyListArticle[i].comment;
              _context.next = 47;
              return this.model('personal').findOne("article", { id: replyListArticle[i].tid });

            case 47:
              art = _context.sent;
              _context.next = 50;
              return this.model('personal').findOne("user", { name: replyListArticle[i].author });

            case 50:
              acc = _context.sent;

              if (!think.isEmpty(art)) {
                article.article = JSON.parse((0, _stringify2.default)(art));
              }
              if (!think.isEmpty(acc)) {
                article.acc = JSON.parse((0, _stringify2.default)(acc));
              }
              articlecomment.articlecomment.push(article);

            case 54:
              i++;
              _context.next = 42;
              break;

            case 57:
              console.log(replyListArticle);
              this.assign("replyListArticle", articlecomment);
              //我的收藏
              _context.next = 61;
              return this.model('personal').getMycollect({ author: uname, type: "topic" });

            case 61:
              collectList = _context.sent;

              this.assign("collectList", collectList);
              _context.next = 65;
              return this.model('personal').getMycollect({ author: uname, type: "article" });

            case 65:
              collectListArticle = _context.sent;

              this.assign("collectListArticle", collectListArticle);

              _context.next = 69;
              return this.model('personal').findAll('user', { name: uname });

            case 69:
              userinfo = _context.sent;

              if (think.isEmpty(userinfo)) {
                _context.next = 75;
                break;
              }

              //他人的个人中心基本信息
              this.assign("userinfo", userinfo[0]);
              return _context.abrupt('return', this.displayView("index_index"));

            case 75:
              return _context.abrupt('return', this.displayView("../common/error_404"));

            case 76:
              _context.next = 79;
              break;

            case 78:
              return _context.abrupt('return', this.displayView("../common/error_404"));

            case 79:
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

  _class.prototype.settingAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', this.displayView("index_setting"));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function settingAction() {
      return _ref2.apply(this, arguments);
    }

    return settingAction;
  }();

  //收藏/取消收藏接口


  _class.prototype.savecollectAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var data, mycreatetime, rs, points, _rs, _points;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.post();

            case 2:
              data = _context3.sent;
              mycreatetime = think.datetime(this.post("createtime"));

              if (think.isEmpty(this.post("cid"))) {
                _context3.next = 15;
                break;
              }

              _context3.next = 7;
              return this.model("personal").deleteRecord("user_collect", { id: data.cid });

            case 7:
              rs = _context3.sent;
              _context3.next = 10;
              return this.model("personal").decrepoint({ name: data.author }, 1);

            case 10:
              points = _context3.sent;

              if (!rs) {
                _context3.next = 13;
                break;
              }

              return _context3.abrupt('return', this.success({ status: 0, msg: "取消收藏成功！", cid: data.cid }));

            case 13:
              _context3.next = 24;
              break;

            case 15:
              //未收藏
              data.createtime = mycreatetime;
              _context3.next = 18;
              return this.model("personal").addRecord("user_collect", data);

            case 18:
              _rs = _context3.sent;
              _context3.next = 21;
              return this.model("personal").decrepoint({ name: data.author }, this.config('point.addcollect'));

            case 21:
              _points = _context3.sent;

              if (!_rs) {
                _context3.next = 24;
                break;
              }

              return _context3.abrupt('return', this.success({ status: 1, msg: "收藏成功！", cid: _rs }));

            case 24:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function savecollectAction() {
      return _ref3.apply(this, arguments);
    }

    return savecollectAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=index.js.map