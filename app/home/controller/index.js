'use strict';

exports.__esModule = true;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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

var _sitemap = require('./sitemap.js');

var _sitemap2 = _interopRequireDefault(_sitemap);

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

  // 首页
  _class.prototype.indexAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var setting;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.model('home').findOne('system_comment');

            case 2:
              setting = _context.sent;

              // this.assign("demo","demo")
              // let content = await this.fetch('admin/content/style1');
              // console.log(content);
              //   this.assign("ss",content)
              this.assign("setting", setting);

              return _context.abrupt('return', this.displayView('index_index'));

            case 5:
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

  _class.prototype.getvideoAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var id, item;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.post("id");

            case 2:
              id = _context2.sent;

              console.log("video" + id);
              _context2.next = 6;
              return this.model("home").findOne("video", { id: id });

            case 6:
              item = _context2.sent;
              return _context2.abrupt('return', this.success({ content: item }));

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getvideoAction() {
      return _ref2.apply(this, arguments);
    }

    return getvideoAction;
  }();

  _class.prototype.getnewsAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var id, category, lstcategory, categories, i, content, rejectarticles, topList, rejectnews, newsList, _topList, _newsList, newsList1, _topList2;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.post("id");

            case 2:
              id = _context3.sent;
              _context3.next = 5;
              return this.model("home").findOne("item", { id: id });

            case 5:
              category = _context3.sent;
              _context3.next = 8;
              return this.model("home").findAll("item", { parentid: id });

            case 8:
              lstcategory = _context3.sent;
              categories = [category.id];

              for (i = 0; i < lstcategory.length; i++) {
                categories.push(lstcategory[i].id);
              }
              content = "";
              rejectarticles = [0];

              if (!category.itemname) {
                _context3.next = 65;
                break;
              }

              if (!(category.style == 1)) {
                _context3.next = 32;
                break;
              }

              _context3.next = 17;
              return this.model("article").where({ item: ["IN", categories] }).order("flag_a DESC,totop DESC,torecom DESC,topicrecom DESC,createtime DESC").limit(2).select();

            case 17:
              topList = _context3.sent;

              if (think.isEmpty(topList)) {
                _context3.next = 30;
                break;
              }

              rejectnews = [0];

              for (i = 0; i < topList.length; i++) {
                rejectarticles.push(topList[i].id);
                rejectnews.push(topList[i].id);
              }

              _context3.next = 23;
              return this.model("article").where({ item: ["IN", categories], id: ["NOTIN", rejectnews] }).order("flag_a DESC,totop DESC,torecom DESC,topicrecom DESC,createtime DESC").limit(6).select();

            case 23:
              newsList = _context3.sent;

              for (i = 0; i < newsList.length; i++) {
                rejectarticles.push(newsList[i].id);
              }
              this.assign("topList", topList);
              this.assign("newsList", newsList);
              _context3.next = 29;
              return this.fetch("home/index/style1");

            case 29:
              content = _context3.sent;

            case 30:
              _context3.next = 65;
              break;

            case 32:
              if (!(category.style == 2)) {
                _context3.next = 55;
                break;
              }

              _context3.next = 35;
              return this.model("article").where({ item: ["IN", categories] }).order("flag_a DESC,totop DESC,torecom DESC,topicrecom DESC,createtime DESC").limit(2).select();

            case 35:
              _topList = _context3.sent;

              if (think.isEmpty(_topList)) {
                _context3.next = 53;
                break;
              }

              rejectnews = [];

              for (i = 0; i < _topList.length; i++) {
                rejectarticles.push(_topList[i].id);
                rejectnews.push(_topList[i].id);
              }

              _context3.next = 41;
              return this.model("article").where({ item: ["IN", categories], id: ["NOTIN", rejectnews] }).order("flag_a DESC,totop DESC,torecom DESC,topicrecom DESC,createtime DESC").limit(3).select();

            case 41:
              _newsList = _context3.sent;


              for (i = 0; i < _newsList.length; i++) {
                rejectarticles.push(_newsList[i].id);
                rejectnews.push(_newsList[i].id);
              }
              _context3.next = 45;
              return this.model("article").where({ item: ["IN", categories], id: ["NOTIN", rejectnews] }).order("flag_a DESC,totop DESC,torecom DESC,topicrecom DESC,createtime DESC").limit(3).select();

            case 45:
              newsList1 = _context3.sent;

              for (i = 0; i < newsList1.length; i++) {
                rejectarticles.push(newsList1[i].id);
              }
              this.assign("topList", _topList);
              this.assign("newsList", _newsList);
              this.assign("newsList1", newsList1);
              _context3.next = 52;
              return this.fetch("home/index/style2");

            case 52:
              content = _context3.sent;

            case 53:
              _context3.next = 65;
              break;

            case 55:
              if (!(category.style == 3)) {
                _context3.next = 65;
                break;
              }

              _context3.next = 58;
              return this.model("article").where({ item: ["IN", categories] }).order("flag_a DESC,totop DESC,torecom DESC,topicrecom DESC,createtime DESC").limit(6).select();

            case 58:
              _topList2 = _context3.sent;

              if (think.isEmpty(_topList2)) {
                _context3.next = 65;
                break;
              }

              for (i = 0; i < _topList2.length; i++) {
                rejectarticles.push(_topList2[i].id);
              }
              this.assign("topList", _topList2);
              _context3.next = 64;
              return this.fetch("home/index/style3");

            case 64:
              content = _context3.sent;

            case 65:
              console.log(content);
              return _context3.abrupt('return', this.success({ content: content }));

            case 67:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getnewsAction() {
      return _ref3.apply(this, arguments);
    }

    return getnewsAction;
  }();

  _class.prototype.menuAction = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var b, pagenumber, pagesize, aurl, itemId, urlrewrite, category, lstcategory, categories, i, content, rejectarticles, topList, rejectnews, newsList, _topList3, _newsList2, newsList1, _topList4, parentids, items, itemList, result, Page, page, pageData, cate, ca;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              b = this.get("page");

              console.log(b);
              pagenumber = this.get("page") || 1;
              pagesize = this.get("pagesize") || 10;
              _context4.next = 6;
              return this.get("curl");

            case 6:
              aurl = _context4.sent;
              itemId = aurl.split('-')[aurl.split('-').length - 1];
              urlrewrite = aurl.replace("-" + itemId, "");
              _context4.next = 11;
              return this.model("home").findOne("item", { urlrewrite: urlrewrite, id: itemId });

            case 11:
              category = _context4.sent;
              _context4.next = 14;
              return this.model("home").findAll("item", { parentid: itemId });

            case 14:
              lstcategory = _context4.sent;
              categories = [category.id];

              for (i = 0; i < lstcategory.length; i++) {
                categories.push(lstcategory[i].id);
              }
              console.log(category.itemname);
              content = "";
              rejectarticles = [0];

              if (!category.itemname) {
                _context4.next = 103;
                break;
              }

              if (!(category.style == 1)) {
                _context4.next = 39;
                break;
              }

              _context4.next = 24;
              return this.model("article").where({ item: ["IN", categories] }).order("flag_a DESC,totop DESC,torecom DESC,topicrecom DESC,createtime DESC").limit(2).select();

            case 24:
              topList = _context4.sent;

              if (think.isEmpty(topList)) {
                _context4.next = 37;
                break;
              }

              rejectnews = [0];

              for (i = 0; i < topList.length; i++) {
                rejectarticles.push(topList[i].id);
                rejectnews.push(topList[i].id);
              }

              _context4.next = 30;
              return this.model("article").where({ item: ["IN", categories], id: ["NOTIN", rejectnews] }).order("flag_a DESC,totop DESC,torecom DESC,topicrecom DESC,createtime DESC").limit(6).select();

            case 30:
              newsList = _context4.sent;

              for (i = 0; i < newsList.length; i++) {
                rejectarticles.push(newsList[i].id);
              }
              this.assign("topList", topList);
              this.assign("newsList", newsList);
              _context4.next = 36;
              return this.fetch("home/index/style1");

            case 36:
              content = _context4.sent;

            case 37:
              _context4.next = 72;
              break;

            case 39:
              if (!(category.style == 2)) {
                _context4.next = 62;
                break;
              }

              _context4.next = 42;
              return this.model("article").where({ item: ["IN", categories] }).order("flag_a DESC,totop DESC,torecom DESC,topicrecom DESC,createtime DESC").limit(2).select();

            case 42:
              _topList3 = _context4.sent;

              if (think.isEmpty(_topList3)) {
                _context4.next = 60;
                break;
              }

              rejectnews = [];

              for (i = 0; i < _topList3.length; i++) {
                rejectarticles.push(_topList3[i].id);
                rejectnews.push(_topList3[i].id);
              }

              _context4.next = 48;
              return this.model("article").where({ item: ["IN", categories], id: ["NOTIN", rejectnews] }).order("flag_a DESC,totop DESC,torecom DESC,topicrecom DESC,createtime DESC").limit(3).select();

            case 48:
              _newsList2 = _context4.sent;


              for (i = 0; i < _newsList2.length; i++) {
                rejectarticles.push(_newsList2[i].id);
                rejectnews.push(_newsList2[i].id);
              }
              _context4.next = 52;
              return this.model("article").where({ item: ["IN", categories], id: ["NOTIN", rejectnews] }).order("flag_a DESC,totop DESC,torecom DESC,topicrecom DESC,createtime DESC").limit(3).select();

            case 52:
              newsList1 = _context4.sent;

              for (i = 0; i < newsList1.length; i++) {
                rejectarticles.push(newsList1[i].id);
              }
              this.assign("topList", _topList3);
              this.assign("newsList", _newsList2);
              this.assign("newsList1", newsList1);
              _context4.next = 59;
              return this.fetch("home/index/style2");

            case 59:
              content = _context4.sent;

            case 60:
              _context4.next = 72;
              break;

            case 62:
              if (!(category.style == 3)) {
                _context4.next = 72;
                break;
              }

              _context4.next = 65;
              return this.model("article").where({ item: ["IN", categories] }).order("flag_a DESC,totop DESC,torecom DESC,topicrecom DESC,createtime DESC").limit(6).select();

            case 65:
              _topList4 = _context4.sent;

              if (think.isEmpty(_topList4)) {
                _context4.next = 72;
                break;
              }

              for (i = 0; i < _topList4.length; i++) {
                rejectarticles.push(_topList4[i].id);
              }
              this.assign("topList", _topList4);
              _context4.next = 71;
              return this.fetch("home/index/style3");

            case 71:
              content = _context4.sent;

            case 72:
              parentids = [category.id];

              if (!(category.parentid == 0)) {
                _context4.next = 78;
                break;
              }

              _context4.next = 76;
              return this.model("home").findAll("item", { parentid: category.id });

            case 76:
              items = _context4.sent;

              if (items.length > 0) {
                for (i = 0; i < items.length; i++) {
                  parentids.push(items[i].id);
                }
              }

            case 78:
              console.log("reject:" + rejectarticles);
              _context4.next = 81;
              return this.model("home").getPageSelect({ item: ["IN", parentids], id: ["NOTIN", rejectarticles], ispublished: 1 }, pagenumber, pagesize);

            case 81:
              itemList = _context4.sent;
              _context4.next = 84;
              return this.model("home").getPageCountSelect({
                item: ["IN", parentids],
                id: ["NOTIN", rejectarticles],
                ispublished: 1
              }, pagenumber, pagesize);

            case 84:
              result = _context4.sent;
              Page = think.adapter("template", "page");
              page = new Page(this.http);
              pageData = page.pagination(result);

              this.assign('pageData', pageData);
              this.assign("itemList", itemList);

              //分页
              cate = {};

              cate.category = category;
              _context4.next = 94;
              return this.model("home").findOne("item", { id: category.parentid });

            case 94:
              ca = _context4.sent;

              if (!think.isEmpty(ca)) {
                cate.categoryparent = ca;
              }
              this.assign('category', cate);
              this.assign('content', content);
              this.assign('more', 0);
              this.assign('menu', urlrewrite + '-' + itemId);
              return _context4.abrupt('return', this.displayView('index_menu'));

            case 103:
              return _context4.abrupt('return', this.displayView("../common/error_404"));

            case 104:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function menuAction() {
      return _ref4.apply(this, arguments);
    }

    return menuAction;
  }();
  //文章页


  _class.prototype.pageAction = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var aurl, aid, aurlrewrite, curl, cid, curlrewrite, menuInfo, blogInfo, viewcount, tagItem, acc, html, strArray, particle, ainfo, pid, id, relatearticle, title, strArrayVal, particleVal, cate, ca, setting, replyList, uinfo, loginuserinfo, collectList, tags, listtags, keywords, i, tag;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              aurl = this.get("aurl");
              aid = aurl.split('-')[aurl.split('-').length - 1];
              aurlrewrite = aurl.replace("-" + aid, "");
              curl = this.get("curl");
              cid = curl.split('-')[curl.split('-').length - 1];
              curlrewrite = curl.replace("-" + cid, "");
              _context5.next = 8;
              return this.model("home").findOne('item', { urlrewrite: curlrewrite, id: cid });

            case 8:
              menuInfo = _context5.sent;

              console.log(menuInfo.itemname);

              if (!menuInfo.itemname) {
                _context5.next = 91;
                break;
              }

              _context5.next = 13;
              return this.model("home").findOne('article', { urlrewrite: aurlrewrite, id: aid, item: cid });

            case 13:
              blogInfo = _context5.sent;

              if (!(blogInfo.ispublished === 1)) {
                _context5.next = 89;
                break;
              }

              _context5.next = 17;
              return this.model("home").addViewCount({ id: aid });

            case 17:
              viewcount = _context5.sent;
              _context5.next = 20;
              return this.model("home").findOne("item", { id: blogInfo.item });

            case 20:
              tagItem = _context5.sent;
              _context5.next = 23;
              return this.model("home").findOne("user", { name: blogInfo.author });

            case 23:
              acc = _context5.sent;

              console.log(blogInfo.author);
              this.assign('itemname', tagItem.itemname);
              this.assign('blogInfo', blogInfo);
              this.assign('acc', acc);
              //设置文章分页
              html = blogInfo.content;
              strArray = [], particle = '', ainfo = '';
              pid = this.get('pid');

              if (html) {
                if (html.indexOf("<!--page-->") > 0) {
                  strArray = html.split("<!--page-->");
                  if (pid) {
                    id = pid * 1 - 1;

                    particle = strArray[id];
                  } else {
                    pid = 1;
                    particle = strArray[0];
                  }
                }
              }
              //关联文章
              _context5.next = 34;
              return this.model("home").getArticleList({ id: ['!=', aid], item: blogInfo.item, ispublished: 1 });

            case 34:
              relatearticle = _context5.sent;

              this.assign("relatearticle", relatearticle);

              //跳转到内容分页
              title = blogInfo.title || '';
              strArrayVal = strArray || '';
              particleVal = particle || '';


              this.assign("title", blogInfo.title);
              this.assign('strArray', strArrayVal);
              this.assign('particle', particleVal);
              this.assign('pid', pid);
              this.assign('menu', menuInfo);
              cate = {};

              cate.category = menuInfo;
              _context5.next = 48;
              return this.model("home").findOne("item", { id: menuInfo.parentid });

            case 48:
              ca = _context5.sent;

              if (!think.isEmpty(ca)) {
                cate.categoryparent = ca;
              }
              this.assign('category', cate);
              _context5.next = 53;
              return this.model('home').findOne('system_comment');

            case 53:
              setting = _context5.sent;

              this.assign("setting", setting);
              //comment
              _context5.next = 57;
              return this.model("home").getReplyListInfo({ tid: aid });

            case 57:
              replyList = _context5.sent;

              this.assign("replyList", replyList);

              //let topicItem=await this.model("topic").findOne("topic_item",{name:topicInfo.item});
              //let viewcount=await this.model("article").where({id:aid}).increment('view',1);
              //this.assign('topicInfo',topicInfo);
              //this.assign("replycount",blogInfo.replycount);
              //this.assign('topicItem',topicItem.comment);

              //account
              _context5.next = 61;
              return this.session('uInfo');

            case 61:
              uinfo = _context5.sent;

              if (think.isEmpty(uinfo)) {
                _context5.next = 71;
                break;
              }

              _context5.next = 65;
              return this.model('home').findOne('user', { name: uinfo.name });

            case 65:
              loginuserinfo = _context5.sent;

              this.assign("loginuserinfo", loginuserinfo);
              //collection
              _context5.next = 69;
              return this.model('home').findAll('user_collect', { aid: aid, type: 'article', author: uinfo.name, iscollect: 1 });

            case 69:
              collectList = _context5.sent;

              if (collectList.length > 0) {
                this.assign("cid", collectList[0].id);
                this.assign("iscollect", 1);
              } else {
                this.assign("cid", "");
                this.assign("iscollect", 0);
              }

            case 71:
              tags = blogInfo.keywords.split(",");
              listtags = { tags: [] };
              keywords = "";

              if (think.isEmpty(tags)) {
                _context5.next = 86;
                break;
              }

              i = 0;

            case 76:
              if (!(i < tags.length)) {
                _context5.next = 85;
                break;
              }

              if (think.isEmpty(tags[i])) {
                _context5.next = 82;
                break;
              }

              _context5.next = 80;
              return this.model("home").findOne("tags", { id: tags[i] });

            case 80:
              tag = _context5.sent;

              listtags.tags.push({ tag: JSON.parse((0, _stringify2.default)(tag)) });

            case 82:
              i++;
              _context5.next = 76;
              break;

            case 85:

              if (listtags.tags.length > 0) {
                for (i = 0; i < listtags.tags.length; i++) {
                  if (i == listtags.tags.length - 1) keywords += listtags.tags[i].tag.tagname;else keywords += listtags.tags[i].tag.tagname + ", ";
                }
              }

            case 86:
              this.assign("keywords", keywords);
              this.assign("listtags", listtags);
              return _context5.abrupt('return', this.displayView('index_page'));

            case 89:
              _context5.next = 92;
              break;

            case 91:
              return _context5.abrupt('return', this.displayView("../common/error_404"));

            case 92:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function pageAction() {
      return _ref5.apply(this, arguments);
    }

    return pageAction;
  }();

  _class.prototype.previewAction = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      var aid, blogInfo, viewcount, tagItem, html, strArray, particle, ainfo, pid, id, tagname, title, strArrayVal, particleVal;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.get("aid");

            case 2:
              aid = _context6.sent;
              _context6.next = 5;
              return this.model("home").findOne("article", { id: aid });

            case 5:
              blogInfo = _context6.sent;
              _context6.next = 8;
              return this.model("home").addViewCount({ id: aid });

            case 8:
              viewcount = _context6.sent;
              _context6.next = 11;
              return this.model("home").findOne("tags", { id: blogInfo.tag });

            case 11:
              tagItem = _context6.sent;

              this.assign('blogInfo', blogInfo);
              //设置文章分页
              html = blogInfo.content;
              strArray = [], particle = '', ainfo = '';
              pid = this.get('pid');

              if (html) {
                if (html.indexOf("<!--page-->") > 0) {
                  strArray = html.split("<!--page-->");
                  if (pid) {
                    id = pid * 1 - 1;

                    particle = strArray[id];
                  } else {
                    pid = 1;
                    particle = strArray[0];
                  }
                }
              }
              //跳转到内容分页
              tagname = tagItem.tagname || '';
              title = blogInfo.title || '';
              strArrayVal = strArray || '';
              particleVal = particle || '';


              this.assign("title", blogInfo.title);
              this.assign('strArray', strArrayVal);
              this.assign('particle', particleVal);
              this.assign('pid', pid);
              this.assign('tagname', tagname);
              return _context6.abrupt('return', this.displayView('index_preview'));

            case 27:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function previewAction() {
      return _ref6.apply(this, arguments);
    }

    return previewAction;
  }();
  //前端资讯


  _class.prototype.newsAction = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              this.getList(2, 'news');

            case 1:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function newsAction() {
      return _ref7.apply(this, arguments);
    }

    return newsAction;
  }();
  //nodejs文章


  _class.prototype.nodeAction = function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              this.getList(3, 'node');

            case 1:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function nodeAction() {
      return _ref8.apply(this, arguments);
    }

    return nodeAction;
  }();
  //苹果精品软件


  _class.prototype.downloadAction = function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              this.getList(4, 'download');

            case 1:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function downloadAction() {
      return _ref9.apply(this, arguments);
    }

    return downloadAction;
  }();
  //活动


  _class.prototype.activityAction = function () {
    var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              this.getList(6, 'activity');

            case 1:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function activityAction() {
      return _ref10.apply(this, arguments);
    }

    return activityAction;
  }();
  //大杂烩


  _class.prototype.othersAction = function () {
    var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11() {
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              this.getList(1, 'others');

            case 1:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function othersAction() {
      return _ref11.apply(this, arguments);
    }

    return othersAction;
  }();
  //招聘


  _class.prototype.jobsAction = function () {
    var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12() {
      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              this.getList(5, 'jobs');

            case 1:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function jobsAction() {
      return _ref12.apply(this, arguments);
    }

    return jobsAction;
  }();
  //分类公用方法


  _class.prototype.getList = function () {
    var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(itemId, menu) {
      var pagenumber, pagesize, itemList, result, Page, page, pageData, item;
      return _regenerator2.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              pagenumber = this.get("page") || 1;
              pagesize = this.get("pagesize") || 10;
              //分页

              _context13.next = 4;
              return this.model("home").getPageSelect({ item: itemId, ispublished: 1 }, pagenumber, pagesize);

            case 4:
              itemList = _context13.sent;
              _context13.next = 7;
              return this.model("home").getPageCountSelect({ item: itemId, ispublished: 1 }, pagenumber, pagesize);

            case 7:
              result = _context13.sent;
              Page = think.adapter("template", "page");
              page = new Page(this.http);
              pageData = page.pagination(result);


              this.assign("itemList", itemList);
              this.assign('pageData', pageData);
              this.assign('menu', menu);
              //分页

              _context13.next = 16;
              return this.model("home").findOne("item", { id: itemId });

            case 16:
              item = _context13.sent;

              this.assign('categoryName', item.itemname);
              this.assign('more', 0);
              return _context13.abrupt('return', this.displayView("index_item"));

            case 20:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function getList(_x, _x2) {
      return _ref13.apply(this, arguments);
    }

    return getList;
  }();

  _class.prototype.moreAction = function () {
    var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14() {
      var murl, itemId, urlrewrite, pagenumber, pagesize, items, lsttags, i, item, itemList, result, Page, page, pageData;
      return _regenerator2.default.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              murl = this.get("murl");
              itemId = murl.split('-')[murl.split('-').length - 1];
              urlrewrite = murl.replace("-" + itemId, "");
              pagenumber = this.get("page") || 1;
              pagesize = this.get("pagesize") || 10;
              _context14.next = 7;
              return this.model("home").findAll("item", { parentid: parseInt(itemId) });

            case 7:
              items = _context14.sent;
              lsttags = [parseInt(itemId)];

              for (i = 0; i < items.length; i++) {
                console.log(items[i].id);
                lsttags.push(items[i].id);
              }
              console.log(lsttags);
              _context14.next = 13;
              return this.model("home").findOne("item", { urlrewrite: urlrewrite, id: ['IN', lsttags] });

            case 13:
              item = _context14.sent;

              if (!item.itemname) {
                _context14.next = 32;
                break;
              }

              _context14.next = 17;
              return this.model("home").getPageSelect({ ispublished: 1, item: itemId }, pagenumber, pagesize);

            case 17:
              itemList = _context14.sent;
              _context14.next = 20;
              return this.model("home").getPageCountSelect({ ispublished: 1, item: itemId }, pagenumber, pagesize);

            case 20:
              result = _context14.sent;
              Page = think.adapter("template", "page");
              page = new Page(this.http);
              pageData = page.pagination(result);


              this.assign("itemList", itemList);
              this.assign('pageData', pageData);
              this.assign('menu', 'tat-ca/' + urlrewrite + '-' + itemId);
              //分页
              this.assign('more', 1);
              this.assign('categoryName', '全部文章');
              return _context14.abrupt('return', this.displayView("index_category"));

            case 32:
              return _context14.abrupt('return', this.displayView("../common/error_404"));

            case 33:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    function moreAction() {
      return _ref14.apply(this, arguments);
    }

    return moreAction;
  }();
  //分类


  _class.prototype.categoryAction = function () {
    var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15() {
      var b, pagenumber, pagesize, aurl, itemId, urlrewrite, category, itemList, result, Page, page, pageData;
      return _regenerator2.default.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              b = this.get("page");

              console.log(b);
              pagenumber = this.get("page") || 1;
              pagesize = this.get("pagesize") || 10;
              _context15.next = 6;
              return this.get("aurl");

            case 6:
              aurl = _context15.sent;
              itemId = aurl.split('-')[aurl.split('-').length - 1];
              urlrewrite = aurl.replace("-" + itemId, "");

              console.log(itemId);
              console.log(urlrewrite);
              _context15.next = 13;
              return this.model("home").findOne("tags", { urlrewrite: urlrewrite, id: itemId });

            case 13:
              category = _context15.sent;

              if (!category.tagname) {
                _context15.next = 33;
                break;
              }

              _context15.next = 17;
              return this.model("home").getPageSelect({ keywords: ["like", "%," + itemId.toString() + ",%"], ispublished: 1 }, pagenumber, pagesize);

            case 17:
              itemList = _context15.sent;
              _context15.next = 20;
              return this.model("home").getPageCountSelect({
                keywords: ["like", "%," + itemId.toString() + ",%"],
                ispublished: 1
              }, pagenumber, pagesize);

            case 20:
              result = _context15.sent;
              Page = think.adapter("template", "page");
              page = new Page(this.http);
              pageData = page.pagination(result);

              console.log("tag" + itemList);
              this.assign("itemList", itemList);
              this.assign('pageData', pageData);
              //分页
              this.assign('category', category);
              this.assign('more', 0);
              this.assign('menu', 'xu-huong/' + urlrewrite + '-' + itemId);
              return _context15.abrupt('return', this.displayView('index_category'));

            case 33:
              return _context15.abrupt('return', this.displayView("../common/error_404"));

            case 34:
            case 'end':
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    function categoryAction() {
      return _ref15.apply(this, arguments);
    }

    return categoryAction;
  }();

  // 友情链接提交接口


  _class.prototype.linkssaveAction = function () {
    var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16() {
      var mydata, rs;
      return _regenerator2.default.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return this.post();

            case 2:
              mydata = _context16.sent;

              if (!(mydata.domain !== '' && mydata.link !== '' && mydata.qq !== '')) {
                _context16.next = 9;
                break;
              }

              _context16.next = 6;
              return this.model("home").addRecord("links", mydata);

            case 6:
              rs = _context16.sent;

              if (!rs) {
                _context16.next = 9;
                break;
              }

              return _context16.abrupt('return', this.success());

            case 9:
            case 'end':
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    function linkssaveAction() {
      return _ref16.apply(this, arguments);
    }

    return linkssaveAction;
  }();
  // 留言提交接口


  _class.prototype.guestsaveAction = function () {
    var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee17() {
      var mydata, rs;
      return _regenerator2.default.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return this.post();

            case 2:
              mydata = _context17.sent;

              if (!(mydata.nickname !== '' && mydata.contact !== '' && mydata.guest !== '')) {
                _context17.next = 9;
                break;
              }

              _context17.next = 6;
              return this.model("home").addRecord("guest", mydata);

            case 6:
              rs = _context17.sent;

              if (!rs) {
                _context17.next = 9;
                break;
              }

              return _context17.abrupt('return', this.success());

            case 9:
            case 'end':
              return _context17.stop();
          }
        }
      }, _callee17, this);
    }));

    function guestsaveAction() {
      return _ref17.apply(this, arguments);
    }

    return guestsaveAction;
  }();

  _class.prototype.guestAction = function () {
    var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee18() {
      return _regenerator2.default.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              this.assign("title", "留言板");
              return _context18.abrupt('return', this.displayView("index_guest"));

            case 2:
            case 'end':
              return _context18.stop();
          }
        }
      }, _callee18, this);
    }));

    function guestAction() {
      return _ref18.apply(this, arguments);
    }

    return guestAction;
  }();

  _class.prototype.aboutAction = function () {
    var _ref19 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee19() {
      return _regenerator2.default.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              this.assign("title", "关于我们");
              return _context19.abrupt('return', this.displayView("index_about"));

            case 2:
            case 'end':
              return _context19.stop();
          }
        }
      }, _callee19, this);
    }));

    function aboutAction() {
      return _ref19.apply(this, arguments);
    }

    return aboutAction;
  }();

  _class.prototype.adsAction = function () {
    var _ref20 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee20() {
      return _regenerator2.default.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              this.assign("title", "推广服务");
              return _context20.abrupt('return', this.displayView("index_ads"));

            case 2:
            case 'end':
              return _context20.stop();
          }
        }
      }, _callee20, this);
    }));

    function adsAction() {
      return _ref20.apply(this, arguments);
    }

    return adsAction;
  }();

  _class.prototype.copyrightAction = function () {
    var _ref21 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee21() {
      return _regenerator2.default.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              this.assign("title", "版权声明");
              return _context21.abrupt('return', this.displayView("index_copyright"));

            case 2:
            case 'end':
              return _context21.stop();
          }
        }
      }, _callee21, this);
    }));

    function copyrightAction() {
      return _ref21.apply(this, arguments);
    }

    return copyrightAction;
  }();

  _class.prototype.linksAction = function () {
    var _ref22 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee22() {
      return _regenerator2.default.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              this.assign("title", "友情链接");
              return _context22.abrupt('return', this.displayView("index_links"));

            case 2:
            case 'end':
              return _context22.stop();
          }
        }
      }, _callee22, this);
    }));

    function linksAction() {
      return _ref22.apply(this, arguments);
    }

    return linksAction;
  }();

  _class.prototype.policyAction = function () {
    var _ref23 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee23() {
      return _regenerator2.default.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              this.assign("title", "注册协议");
              return _context23.abrupt('return', this.displayView("index_policy"));

            case 2:
            case 'end':
              return _context23.stop();
          }
        }
      }, _callee23, this);
    }));

    function policyAction() {
      return _ref23.apply(this, arguments);
    }

    return policyAction;
  }();

  _class.prototype.donateAction = function () {
    var _ref24 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee24() {
      return _regenerator2.default.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              this.assign("title", "捐赠");
              return _context24.abrupt('return', this.displayView("index_donate"));

            case 2:
            case 'end':
              return _context24.stop();
          }
        }
      }, _callee24, this);
    }));

    function donateAction() {
      return _ref24.apply(this, arguments);
    }

    return donateAction;
  }();

  _class.prototype.dologoutAction = function () {
    var _ref25 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee25() {
      return _regenerator2.default.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              this.session("uInfo", "");
              return _context25.abrupt('return', this.redirect("/"));

            case 2:
            case 'end':
              return _context25.stop();
          }
        }
      }, _callee25, this);
    }));

    function dologoutAction() {
      return _ref25.apply(this, arguments);
    }

    return dologoutAction;
  }();

  // 站点地图


  _class.prototype.sitemapAction = function () {
    var _ref26 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee26() {
      var data, sysdata, list, article, topic, user, others;
      return _regenerator2.default.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:

              //生成xml
              data = {};
              _context26.next = 3;
              return this.model("home").findOne("system", { id: 1 });

            case 3:
              sysdata = _context26.sent;
              _context26.next = 6;
              return this.model("home").findAll("item");

            case 6:
              list = _context26.sent;
              _context26.next = 9;
              return this.model("home").findAll("article");

            case 9:
              article = _context26.sent;
              _context26.next = 12;
              return this.model("home").findAll("topic");

            case 12:
              topic = _context26.sent;
              _context26.next = 15;
              return this.model("home").findAll("user");

            case 15:
              user = _context26.sent;
              others = [{ id: 1, itemname: '大杂烩', url: 'others.html' }, { id: 2, itemname: '前端资讯', url: 'news.html' }, { id: 3, itemname: 'nodejs', url: 'node.html' }, { id: 4, itemname: '资源下载', url: 'download.html' }, { id: 5, itemname: '招聘', url: 'jobs.html' }, { id: 6, itemname: '活动', url: 'activity.html' }, { id: 7, itemname: '关于', url: 'about.html' }, { id: 8, itemname: '友情链接', url: 'links.html' }, { id: 9, itemname: '注册', url: 'register.html' }, { id: 10, itemname: '捐赠', url: 'donate.html' }, { id: 11, itemname: '推广服务', url: 'ads.html' }, { id: 12, itemname: '注册协议', url: 'policy.html' }, { id: 13, itemname: '版权声明', url: 'copyright.html' }, { id: 14, itemname: '会员登录', url: 'login.html' }, { id: 15, itemname: '留言板', url: 'guest.html' }, { id: 16, itemname: 'liblog', url: 'liblog.html' }];

              data = {
                homeurl: sysdata.url,
                list: list,
                article: article,
                others: others,
                topic: topic,
                user: user
              };
              _sitemap2.default.createXml(data);
              return _context26.abrupt('return', this.displayView("index_sitemap"));

            case 20:
            case 'end':
              return _context26.stop();
          }
        }
      }, _callee26, this);
    }));

    function sitemapAction() {
      return _ref26.apply(this, arguments);
    }

    return sitemapAction;
  }();

  _class.prototype.liblogAction = function () {
    var _ref27 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee27() {
      return _regenerator2.default.wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              return _context27.abrupt('return', this.displayView("index_liblog"));

            case 1:
            case 'end':
              return _context27.stop();
          }
        }
      }, _callee27, this);
    }));

    function liblogAction() {
      return _ref27.apply(this, arguments);
    }

    return liblogAction;
  }();

  _class.prototype.savereplyAction = function () {
    var _ref28 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee28() {
      var marked, mycreatetime, data, html, isexist, tid, updata, rs, _updata, _rs, points, replycount;

      return _regenerator2.default.wrap(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              console.log("aaa");
              //编辑或者新增回复
              marked = require('marked');

              marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: true,
                pedantic: false,
                sanitize: true,
                smartLists: true,
                smartypants: false
              });
              mycreatetime = think.datetime(this.post('createtime'));
              _context28.next = 6;
              return this.post();

            case 6:
              data = _context28.sent;

              data.createtime = mycreatetime;

              if (!(data.text === '')) {
                _context28.next = 12;
                break;
              }

              return _context28.abrupt('return', this.json({ status: 0, errno: 1, errmsg: 'Trả lời không để trống!' }));

            case 12:
              // 解析markdown
              html = marked(data.comment);
              // data.comment=html;

              if (think.isEmpty(data.id)) {
                _context28.next = 32;
                break;
              }

              _context28.next = 16;
              return this.model("home").findOne("article_comment", { id: data.id });

            case 16:
              isexist = _context28.sent;
              _context28.next = 19;
              return this.model("home").findOne("article", { id: data.tid });

            case 19:
              tid = _context28.sent;

              if (!(!think.isEmpty(isexist) && !think.isEmpty(tid))) {
                _context28.next = 29;
                break;
              }

              //更新最后回复数据
              updata = {
                updatetime: mycreatetime,
                updateauthor: data.author,
                updatepic: data.pic
              };
              //let updatetime=await this.model("home").updateRecord("article",{id:data.tid},updata);
              //更新最后回复数据
              // 更新回复

              _context28.next = 24;
              return this.model("home").updateRecord("article_comment", { id: data.id }, data);

            case 24:
              rs = _context28.sent;

              if (!rs) {
                _context28.next = 27;
                break;
              }

              return _context28.abrupt('return', this.success());

            case 27:
              _context28.next = 30;
              break;

            case 29:
              return _context28.abrupt('return', this.fail("该主题或回复不存在或已删除！"));

            case 30:
              _context28.next = 47;
              break;

            case 32:
              console.log("thanh cong");
              //更新最后回复数据
              _updata = {
                updatetime: mycreatetime,
                updateauthor: data.author,
                updatepic: data.pic
              };

              console.log(data.tid);
              //  let updatetime=await this.model("home").updateRecord("article",{id:data.tid},updata);
              //更新最后回复数据
              //增加
              console.log("thanh cong2");
              _context28.next = 38;
              return this.model("article_comment").add(data);

            case 38:
              _rs = _context28.sent;
              _context28.next = 41;
              return this.model("home").increpoint({ name: data.author }, this.config('point.addcomment'));

            case 41:
              points = _context28.sent;
              _context28.next = 44;
              return this.model("article").where({ id: data.tid }).increment('replycount', 1);

            case 44:
              replycount = _context28.sent;

              if (!_rs) {
                _context28.next = 47;
                break;
              }

              return _context28.abrupt('return', this.success());

            case 47:
            case 'end':
              return _context28.stop();
          }
        }
      }, _callee28, this);
    }));

    function savereplyAction() {
      return _ref28.apply(this, arguments);
    }

    return savereplyAction;
  }();

  _class.prototype.removereplyAction = function () {
    var _ref29 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee29() {
      var data, myid, rs, replycount;
      return _regenerator2.default.wrap(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              _context29.next = 2;
              return this.post();

            case 2:
              data = _context29.sent;
              myid = data.id;

              if (think.isEmpty(myid)) {
                _context29.next = 13;
                break;
              }

              _context29.next = 7;
              return this.model("article_comment").where({ id: myid }).delete();

            case 7:
              rs = _context29.sent;
              _context29.next = 10;
              return this.model("article").where({ id: data.tid }).decrement('replycount', 1);

            case 10:
              replycount = _context29.sent;

              if (!rs) {
                _context29.next = 13;
                break;
              }

              return _context29.abrupt('return', this.success());

            case 13:
            case 'end':
              return _context29.stop();
          }
        }
      }, _callee29, this);
    }));

    function removereplyAction() {
      return _ref29.apply(this, arguments);
    }

    return removereplyAction;
  }();

  _class.prototype.postlikeAction = function () {
    var _ref30 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee30() {
      var data, liker, myid, item, arr, likers, n, newlikers, m, rs, _m, _newlikers, _rs2;

      return _regenerator2.default.wrap(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              _context30.next = 2;
              return this.post();

            case 2:
              data = _context30.sent;
              liker = data.likers;
              myid = data.id;

              if (think.isEmpty(myid)) {
                _context30.next = 31;
                break;
              }

              _context30.next = 8;
              return this.model("home").findOne("article_comment", { id: myid });

            case 8:
              item = _context30.sent;
              arr = !item.likers ? [] : item.likers.split(",");
              likers = arr || [];
              n = likers.indexOf(liker);

              if (!(n < 0)) {
                _context30.next = 23;
                break;
              }

              likers.push(liker);
              newlikers = likers.join(",");
              m = likers.length;
              _context30.next = 18;
              return this.model("article_comment").where({ id: myid }).update({ like: m, likers: newlikers });

            case 18:
              rs = _context30.sent;

              if (!rs) {
                _context30.next = 21;
                break;
              }

              return _context30.abrupt('return', this.success({ likeCount: m }));

            case 21:
              _context30.next = 31;
              break;

            case 23:
              likers.splice(n, 1);
              _m = likers.length;
              _newlikers = likers.join(",");
              _context30.next = 28;
              return this.model("article_comment").where({ id: myid }).update({ like: _m, likers: _newlikers });

            case 28:
              _rs2 = _context30.sent;

              if (!_rs2) {
                _context30.next = 31;
                break;
              }

              return _context30.abrupt('return', this.success({ likeCount: _m }));

            case 31:
            case 'end':
              return _context30.stop();
          }
        }
      }, _callee30, this);
    }));

    function postlikeAction() {
      return _ref30.apply(this, arguments);
    }

    return postlikeAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=index.js.map