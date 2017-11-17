'use strict';

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

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

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _base = require("./base.js");

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
            var articlelist, result, list, selval, searchtxt, pagenumber, pagesize, map, _map2, _map, _map3, Page, page, pageData, pageSize;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            articlelist = {}, result = {}, list = {};
                            selval = this.get('type');
                            searchtxt = this.get('search');
                            pagenumber = this.get('page') || 1;
                            pagesize = this.get('pagesize') || 1;
                            // 设置分页

                            if (!selval) {
                                _context.next = 17;
                                break;
                            }

                            //文章筛选
                            map = {};

                            map[this.get('type')] = 1;
                            _context.next = 10;
                            return this.model("admin").getArticleJoinRecord(map, pagenumber, pagesize);

                        case 10:
                            articlelist = _context.sent;
                            _context.next = 13;
                            return this.model("admin").getPageCountSelect(map, pagenumber, pagesize);

                        case 13:
                            result = _context.sent;

                            this.assign("type", selval);
                            _context.next = 36;
                            break;

                        case 17:
                            if (!searchtxt) {
                                _context.next = 28;
                                break;
                            }

                            //文章搜索
                            _map = (_map2 = { title: ["like", "%" + searchtxt + "%"] }, _map2['li_article.id'] = ["like", "%" + searchtxt * 1 + "%"], _map2._logic = "OR", _map2);
                            _context.next = 21;
                            return this.model("admin").getArticleJoinRecord(_map, pagenumber, pagesize);

                        case 21:
                            articlelist = _context.sent;
                            _context.next = 24;
                            return this.model("admin").getPageCountSelect(_map, pagenumber, pagesize);

                        case 24:
                            result = _context.sent;

                            this.assign("type", '');
                            _context.next = 36;
                            break;

                        case 28:
                            _map3 = {};
                            _context.next = 31;
                            return this.model("admin").getArticleJoinRecord(_map3, pagenumber, pagesize);

                        case 31:
                            articlelist = _context.sent;
                            _context.next = 34;
                            return this.model("admin").getPageCountSelect(_map3, pagenumber, pagesize);

                        case 34:
                            result = _context.sent;

                            this.assign("type", '');

                        case 36:
                            Page = think.adapter("template", "page");
                            page = new Page(this.http);
                            pageData = page.pagination(result);

                            this.assign("articlelist", articlelist);
                            this.assign('pageData', pageData);

                            // 设置分页
                            _context.next = 43;
                            return this.config("pagesize");

                        case 43:
                            pageSize = _context.sent;

                            if (this.get("page")) {
                                _context.next = 46;
                                break;
                            }

                            return _context.abrupt("return", this.redirect("/admin/content/index?page=1&pagesize=" + pageSize));

                        case 46:
                            this.assign("title", "Danh sách bài viết");
                            this.assign("pagecount", this.get("page"));
                            this.assign("pagesize", pageSize);
                            this.assign('isdraft', false);
                            return _context.abrupt("return", this.display());

                        case 51:
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

    _class.prototype.draftlistAction = function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
            var map, pagenumber, pagesize, articlelist, result, Page, page, pageData, pageSize;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            // 设置分页
                            map = { ispublished: 0 };
                            pagenumber = this.get('page') | 1;
                            pagesize = this.get('pagesize') | 1;
                            _context2.next = 5;
                            return this.model("admin").getDraftJoinRecord({
                                tags: { on: "tag, id" }
                            }, map, pagenumber, pagesize);

                        case 5:
                            articlelist = _context2.sent;
                            _context2.next = 8;
                            return this.model("admin").getPageCountSelect(map, pagenumber, pagesize);

                        case 8:
                            result = _context2.sent;
                            Page = think.adapter("template", "page");
                            page = new Page(this.http);
                            pageData = page.pagination(result);

                            this.assign("articlelist", articlelist);
                            this.assign('pageData', pageData);
                            this.assign('isdraft', true);

                            // 设置分页
                            _context2.next = 17;
                            return this.config("pagesize");

                        case 17:
                            pageSize = _context2.sent;

                            if (this.get("page")) {
                                _context2.next = 20;
                                break;
                            }

                            return _context2.abrupt("return", this.redirect("/admin/content/draftlist?page=1&pagesize=" + pageSize));

                        case 20:
                            this.assign("title", "Bài viết nháp");
                            this.assign("pagecount", this.get("page"));
                            this.assign("pagesize", pageSize);
                            return _context2.abrupt("return", this.display('index'));

                        case 24:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function draftlistAction() {
            return _ref2.apply(this, arguments);
        }

        return draftlistAction;
    }();
    //文章编辑/新增


    _class.prototype.articleAction = function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
            var lstparentmenu, navList, i, submenu, submenusid, j, sources, article, tags, keywords, tagname, item, picurl, tag_selected_id, item_selected_id;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return this.model("admin").findAll('item', { parentid: ['IN', [0]] });

                        case 2:
                            lstparentmenu = _context3.sent;
                            navList = { menu: [] };
                            i = 0;

                        case 5:
                            if (!(i < lstparentmenu.length)) {
                                _context3.next = 15;
                                break;
                            }

                            _context3.next = 8;
                            return this.model("admin").findAll('item', { parentid: ['IN', [parseInt(lstparentmenu[i].id)]] });

                        case 8:
                            submenu = _context3.sent;
                            submenusid = [];

                            for (j = 0; j < submenu.length; j++) {
                                submenusid.push(submenu[j].id);
                            }
                            navList.menu.push({ parentmenu: JSON.parse((0, _stringify2.default)(lstparentmenu[i])), submenus: JSON.parse((0, _stringify2.default)(submenu)), submenusid: submenusid });

                        case 12:
                            i++;
                            _context3.next = 5;
                            break;

                        case 15:
                            this.assign("navList", navList);
                            _context3.next = 18;
                            return this.model("admin").findAll('source');

                        case 18:
                            sources = _context3.sent;

                            this.assign("sources", sources);
                            //编辑或者新增

                            if (!this.get('id')) {
                                _context3.next = 52;
                                break;
                            }

                            _context3.next = 23;
                            return this.model('admin').findOne('article', { id: this.get('id') });

                        case 23:
                            article = _context3.sent;

                            console.log(article.keywords.substring(1, article.keywords.length - 1));
                            tags = '{"tags":[';

                            if (!article.keywords) {
                                _context3.next = 38;
                                break;
                            }

                            keywords = article.keywords.substring(1, article.keywords.length - 1).split(",");
                            i = 0;

                        case 29:
                            if (!(i < keywords.length)) {
                                _context3.next = 38;
                                break;
                            }

                            _context3.next = 32;
                            return this.model("admin").findOne("tags", { id: keywords[i] });

                        case 32:
                            tagname = _context3.sent.tagname;

                            console.log(tagname);
                            if (tagname) {
                                item = "{";

                                item += '"value":' + keywords[i] + ',"text":"' + tagname + '"';
                                item += "}";
                                if (keywords.length == i + 1) tags += item;else tags += item + ",";
                            }

                        case 35:
                            i++;
                            _context3.next = 29;
                            break;

                        case 38:
                            tags += "]}";
                            console.log(tags);
                            //  console.log((await this.model("admin").findOne("tags",{id: 3})).tagname);
                            this.assign("tags", JSON.parse(tags));
                            picurl = article.picurl === '' ? '/static/common/images/common/default.jpg' : article.picurl;
                            tag_selected_id = article.tag;
                            item_selected_id = article.item;

                            if (tag_selected_id) {
                                this.assign("tagselectedId", tag_selected_id);
                            } else {
                                this.assign("tagselectedId", '');
                            }
                            if (item_selected_id) {
                                this.assign("itemselectedId", item_selected_id);
                            } else {
                                this.assign("itemselectedId", '');
                            }
                            this.assign("piccss", 'background-image: url(' + picurl + ');background-size:82px 82px;');
                            this.assign("picurl", picurl);
                            this.assign('article', article);

                            this.assign("title", "Thêm bài viết");

                            _context3.next = 59;
                            break;

                        case 52:
                            this.assign('article', {});
                            this.assign("selectedId", '');
                            this.assign("picurl", '');
                            this.assign("piccss", '');
                            this.assign("tagselectedId", '');
                            this.assign("itemselectedId", '');
                            this.assign("title", "Thêm bài viết");

                        case 59:
                            this.assign('ismarkdown', false); //不显示markdown导入
                            return _context3.abrupt("return", this.display());

                        case 61:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function articleAction() {
            return _ref3.apply(this, arguments);
        }

        return articleAction;
    }();

    //新增markdown文章


    _class.prototype.addmarkdownAction = function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
            var tagsList, itemList;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return this.model("admin").findAll("tags");

                        case 2:
                            tagsList = _context4.sent;

                            this.assign("tagsList", tagsList);
                            //获取类型
                            _context4.next = 6;
                            return this.model("admin").findAll("item");

                        case 6:
                            itemList = _context4.sent;

                            this.assign("itemList", itemList);
                            //新增
                            this.assign("title", "Thêm bài viết markdown");
                            this.assign('article', {});
                            this.assign("selectedId", '');
                            this.assign("picurl", '');
                            this.assign("piccss", '');
                            this.assign("tagselectedId", '');
                            this.assign("itemselectedId", '');
                            this.assign('ismarkdown', true);
                            return _context4.abrupt("return", this.display('article'));

                        case 17:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function addmarkdownAction() {
            return _ref4.apply(this, arguments);
        }

        return addmarkdownAction;
    }();

    _class.prototype.gettagsAction = function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
            var term, tagsList;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return this.post("term");

                        case 2:
                            term = _context5.sent;

                            console.log("term");

                            if (think.isEmpty(term)) {
                                _context5.next = 12;
                                break;
                            }

                            _context5.next = 7;
                            return this.model("admin").findAll("tags", { tagname: ['like', '%' + term + '%'] });

                        case 7:
                            tagsList = _context5.sent;

                            console.log((0, _stringify2.default)(tagsList));
                            return _context5.abrupt("return", this.success(JSON.parse((0, _stringify2.default)(tagsList))));

                        case 12:
                            return _context5.abrupt("return", this.success());

                        case 13:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function gettagsAction() {
            return _ref5.apply(this, arguments);
        }

        return gettagsAction;
    }();
    //新增/编辑文章提交接口


    _class.prototype.doaddAction = function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
            var data, titleexist, article, item, _article, cg, citems, _iterator, _isArray, _i, _ref7, tagsList, _iterator2, _isArray2, _i2, _ref8, dateC, ct, sm, smap, rs, uinfo, articleinfo, _cg, _iterator3, _isArray3, _i3, _ref9, _tagsList, _iterator4, _isArray4, _i4, _ref10;

            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return this.post();

                        case 2:
                            data = _context6.sent;
                            titleexist = false;

                            if (think.isEmpty(data.id)) {
                                _context6.next = 11;
                                break;
                            }

                            _context6.next = 7;
                            return this.model("admin").findOne("article", { title: data.title, id: ["NOTIN", data.id] });

                        case 7:
                            article = _context6.sent;

                            if (!think.isEmpty(article)) titleexist = true;
                            _context6.next = 15;
                            break;

                        case 11:
                            _context6.next = 13;
                            return this.model("admin").findOne("article", { title: data.title });

                        case 13:
                            article = _context6.sent;

                            if (!think.isEmpty(article)) titleexist = true;

                        case 15:
                            if (!titleexist) {
                                _context6.next = 17;
                                break;
                            }

                            return _context6.abrupt("return", this.success({ titleexist: titleexist }));

                        case 17:
                            if (!(data.item != 0)) {
                                _context6.next = 23;
                                break;
                            }

                            _context6.next = 20;
                            return this.model("admin").findOne("item", { id: data.item });

                        case 20:
                            item = _context6.sent;

                            data['itemurlrewrite'] = item.urlrewrite;
                            data['itemname'] = item.itemname;

                        case 23:
                            console.log(data);

                            if (think.isEmpty(this.post("id"))) {
                                _context6.next = 96;
                                break;
                            }

                            _context6.next = 27;
                            return this.model("admin").findOne("article", { id: this.post("id") });

                        case 27:
                            _article = _context6.sent;

                            data.createtime = _article.createtime;
                            data.lastmodified = think.datetime(new Date());
                            _context6.next = 32;
                            return this.model("admin").findOne("item", { id: _article.item });

                        case 32:
                            cg = _context6.sent;

                            if (think.isEmpty(cg)) {
                                _context6.next = 37;
                                break;
                            }

                            cg.lastmodified = data.lastmodified;
                            _context6.next = 37;
                            return this.model("admin").updateRecord("item", {}, cg);

                        case 37:
                            if (!(data.keywords.length > 0)) {
                                _context6.next = 74;
                                break;
                            }

                            citems = [];
                            _iterator = data.keywords.split(","), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

                        case 40:
                            if (!_isArray) {
                                _context6.next = 46;
                                break;
                            }

                            if (!(_i >= _iterator.length)) {
                                _context6.next = 43;
                                break;
                            }

                            return _context6.abrupt("break", 54);

                        case 43:
                            _ref7 = _iterator[_i++];
                            _context6.next = 50;
                            break;

                        case 46:
                            _i = _iterator.next();

                            if (!_i.done) {
                                _context6.next = 49;
                                break;
                            }

                            return _context6.abrupt("break", 54);

                        case 49:
                            _ref7 = _i.value;

                        case 50:
                            item = _ref7;

                            if (!think.isEmpty(item)) citems.push(item);

                        case 52:
                            _context6.next = 40;
                            break;

                        case 54:
                            _context6.next = 56;
                            return this.model("tags").where({ id: ["IN", citems] }).select();

                        case 56:
                            tagsList = _context6.sent;
                            _iterator2 = tagsList, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);

                        case 58:
                            if (!_isArray2) {
                                _context6.next = 64;
                                break;
                            }

                            if (!(_i2 >= _iterator2.length)) {
                                _context6.next = 61;
                                break;
                            }

                            return _context6.abrupt("break", 74);

                        case 61:
                            _ref8 = _iterator2[_i2++];
                            _context6.next = 68;
                            break;

                        case 64:
                            _i2 = _iterator2.next();

                            if (!_i2.done) {
                                _context6.next = 67;
                                break;
                            }

                            return _context6.abrupt("break", 74);

                        case 67:
                            _ref8 = _i2.value;

                        case 68:
                            item = _ref8;

                            item.lastmodified = data.lastmodified;
                            _context6.next = 72;
                            return this.model("admin").updateRecord("tags", {}, item);

                        case 72:
                            _context6.next = 58;
                            break;

                        case 74:
                            dateC = new Date(_article.createtime);
                            ct = dateC.getFullYear() + "-" + ('0' + (dateC.getMonth() + 1)).slice(-2) + "-" + ('0' + dateC.getDate()).slice(-2);
                            _context6.next = 78;
                            return this.model("admin").findOne("sitemap", { createtime: ct });

                        case 78:
                            sm = _context6.sent;

                            if (think.isEmpty(sm)) {
                                _context6.next = 86;
                                break;
                            }

                            smap = JSON.parse((0, _stringify2.default)(sm));

                            smap.lastmodified = data.lastmodified;
                            _context6.next = 84;
                            return this.model("admin").updateRecord("sitemap", {}, smap);

                        case 84:
                            _context6.next = 89;
                            break;

                        case 86:
                            smap = { createtime: ct, lastmodified: data.lastmodified };
                            _context6.next = 89;
                            return this.model("admin").addRecord("sitemap", smap);

                        case 89:
                            _context6.next = 91;
                            return this.model("admin").updateRecord("article", {}, data);

                        case 91:
                            rs = _context6.sent;

                            if (!rs) {
                                _context6.next = 94;
                                break;
                            }

                            return _context6.abrupt("return", this.success());

                        case 94:
                            _context6.next = 166;
                            break;

                        case 96:
                            _context6.next = 98;
                            return this.session("uInfo");

                        case 98:
                            uinfo = _context6.sent;

                            data.createtime = think.datetime(this.post('createtime'));
                            data.lastmodified = data.createtime;
                            data['author'] = uinfo.name;
                            _context6.next = 104;
                            return this.model("admin").addRecord("article", data);

                        case 104:
                            articleinfo = _context6.sent;
                            _context6.next = 107;
                            return this.model("admin").findOne("item", { id: data.item });

                        case 107:
                            _cg = _context6.sent;

                            if (think.isEmpty(_cg)) {
                                _context6.next = 112;
                                break;
                            }

                            _cg.lastmodified = data.lastmodified;
                            _context6.next = 112;
                            return this.model("admin").updateRecord("item", {}, _cg);

                        case 112:
                            if (!(data.keywords.length > 0)) {
                                _context6.next = 149;
                                break;
                            }

                            citems = [];
                            _iterator3 = data.keywords.split(","), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);

                        case 115:
                            if (!_isArray3) {
                                _context6.next = 121;
                                break;
                            }

                            if (!(_i3 >= _iterator3.length)) {
                                _context6.next = 118;
                                break;
                            }

                            return _context6.abrupt("break", 129);

                        case 118:
                            _ref9 = _iterator3[_i3++];
                            _context6.next = 125;
                            break;

                        case 121:
                            _i3 = _iterator3.next();

                            if (!_i3.done) {
                                _context6.next = 124;
                                break;
                            }

                            return _context6.abrupt("break", 129);

                        case 124:
                            _ref9 = _i3.value;

                        case 125:
                            item = _ref9;

                            if (!think.isEmpty(item)) citems.push(item);

                        case 127:
                            _context6.next = 115;
                            break;

                        case 129:
                            _context6.next = 131;
                            return this.model("tags").where({ id: ["IN", citems] }).select();

                        case 131:
                            _tagsList = _context6.sent;
                            _iterator4 = _tagsList, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);

                        case 133:
                            if (!_isArray4) {
                                _context6.next = 139;
                                break;
                            }

                            if (!(_i4 >= _iterator4.length)) {
                                _context6.next = 136;
                                break;
                            }

                            return _context6.abrupt("break", 149);

                        case 136:
                            _ref10 = _iterator4[_i4++];
                            _context6.next = 143;
                            break;

                        case 139:
                            _i4 = _iterator4.next();

                            if (!_i4.done) {
                                _context6.next = 142;
                                break;
                            }

                            return _context6.abrupt("break", 149);

                        case 142:
                            _ref10 = _i4.value;

                        case 143:
                            item = _ref10;

                            item.lastmodified = data.lastmodified;
                            _context6.next = 147;
                            return this.model("admin").updateRecord("tags", {}, item);

                        case 147:
                            _context6.next = 133;
                            break;

                        case 149:
                            dateC = new Date(data.createtime);

                            console.log(dateC);
                            ct = dateC.getFullYear() + "-" + ('0' + (dateC.getMonth() + 1)).slice(-2) + "-" + ('0' + dateC.getDate()).slice(-2);
                            _context6.next = 154;
                            return this.model("admin").findOne("sitemap", { createtime: ct });

                        case 154:
                            sm = _context6.sent;

                            if (think.isEmpty(sm)) {
                                _context6.next = 162;
                                break;
                            }

                            smap = JSON.parse((0, _stringify2.default)(sm));

                            smap.lastmodified = data.lastmodified;
                            _context6.next = 160;
                            return this.model("admin").updateRecord("sitemap", {}, smap);

                        case 160:
                            _context6.next = 165;
                            break;

                        case 162:
                            smap = { createtime: ct, lastmodified: data.lastmodified };
                            _context6.next = 165;
                            return this.model("admin").addRecord("sitemap", smap);

                        case 165:
                            return _context6.abrupt("return", this.success({ id: articleinfo }));

                        case 166:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function doaddAction() {
            return _ref6.apply(this, arguments);
        }

        return doaddAction;
    }();

    _class.prototype.updatestatusAction = function () {
        var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
            var pid, status, rs;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.next = 2;
                            return this.post("id");

                        case 2:
                            pid = _context7.sent;
                            _context7.next = 5;
                            return this.post("ispublished");

                        case 5:
                            status = _context7.sent;

                            if (think.isEmpty(pid)) {
                                _context7.next = 12;
                                break;
                            }

                            _context7.next = 9;
                            return this.model("admin").updateRecord("article", { id: pid }, { ispublished: status });

                        case 9:
                            rs = _context7.sent;

                            if (!rs) {
                                _context7.next = 12;
                                break;
                            }

                            return _context7.abrupt("return", this.success());

                        case 12:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function updatestatusAction() {
            return _ref11.apply(this, arguments);
        }

        return updatestatusAction;
    }();
    //删除或批量删除接口


    _class.prototype.delsomeAction = function () {
        var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
            var arr, where, rs;
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _context8.next = 2;
                            return this.post('delarr[]');

                        case 2:
                            arr = _context8.sent;
                            where = { id: ["IN", arr] };
                            _context8.next = 6;
                            return this.model("admin").deleteRecord("article", where);

                        case 6:
                            rs = _context8.sent;

                            if (!rs) {
                                _context8.next = 9;
                                break;
                            }

                            return _context8.abrupt("return", this.success());

                        case 9:
                        case "end":
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        function delsomeAction() {
            return _ref12.apply(this, arguments);
        }

        return delsomeAction;
    }();

    //上传图片接口


    _class.prototype.uploadAction = function () {
        var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
            var IS_USE_OSS, ALIOSS, alioss, file, rs, _file, filepath, newpath, uploadPath, basename;

            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            IS_USE_OSS = think.config('OSS.on');

                            if (!IS_USE_OSS) {
                                _context9.next = 16;
                                break;
                            }

                            //上传OSS图片接口
                            ALIOSS = think.service("alioss");
                            alioss = new ALIOSS();
                            file = think.extend({}, this.file('file'));
                            _context9.next = 7;
                            return alioss.upload(file);

                        case 7:
                            rs = _context9.sent;

                            console.log(rs);

                            if (!rs) {
                                _context9.next = 13;
                                break;
                            }

                            return _context9.abrupt("return", this.json({ path: think.config('OSS.domain') + "/" + rs.name }));

                        case 13:
                            return _context9.abrupt("return", this.json("上传失败！"));

                        case 14:
                            _context9.next = 24;
                            break;

                        case 16:
                            //上传应用服务器图片接口
                            _file = think.extend({}, this.file('file'));
                            filepath = _file.path;
                            newpath = liFormatDate(new Date().toLocaleDateString());
                            uploadPath = think.UPLOAD_PATH + '/pics/' + newpath;

                            think.mkdir(uploadPath);
                            basename = _path2.default.basename(filepath);

                            _fs2.default.renameSync(filepath, uploadPath + basename);
                            this.json({ path: "static/upload/pics/" + newpath + basename });

                        case 24:
                        case "end":
                            return _context9.stop();
                    }
                }
            }, _callee9, this);
        }));

        function uploadAction() {
            return _ref13.apply(this, arguments);
        }

        return uploadAction;
    }();

    //上传阿里云OSS图片接口


    _class.prototype.uploadeditorAction = function () {
        var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
            var IS_USE_OSS, ALIOSS, alioss, file, rs, _file2, filepath, newpath, uploadPath, basename;

            return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            IS_USE_OSS = think.config('OSS.on');

                            if (!IS_USE_OSS) {
                                _context10.next = 15;
                                break;
                            }

                            //上传OSS图片接口
                            ALIOSS = think.service("alioss");
                            alioss = new ALIOSS();
                            file = think.extend({}, this.file('thumb_img'));
                            _context10.next = 7;
                            return alioss.upload(file);

                        case 7:
                            rs = _context10.sent;

                            if (!rs) {
                                _context10.next = 12;
                                break;
                            }

                            return _context10.abrupt("return", this.json(think.config('OSS.domain') + "/" + rs.name));

                        case 12:
                            return _context10.abrupt("return", this.json("上传失败！"));

                        case 13:
                            _context10.next = 23;
                            break;

                        case 15:
                            //上传应用服务器图片接口
                            _file2 = think.extend({}, this.file('thumb_img'));
                            filepath = _file2.path;
                            newpath = liFormatDate(new Date().toLocaleDateString());
                            uploadPath = think.UPLOAD_PATH + '/pics/' + newpath;

                            think.mkdir(uploadPath);
                            basename = _path2.default.basename(filepath);

                            _fs2.default.renameSync(filepath, uploadPath + basename);
                            this.json("/static/upload/pics/" + newpath + basename);

                        case 23:
                        case "end":
                            return _context10.stop();
                    }
                }
            }, _callee10, this);
        }));

        function uploadeditorAction() {
            return _ref14.apply(this, arguments);
        }

        return uploadeditorAction;
    }();
    //上传markdown文件及解析接口、内容分页


    _class.prototype.uploadfileAction = function () {
        var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11() {
            var marked, file, data, html, encodeHTMLContent, newHtml, ainfo, ainfo_obj, end, note;
            return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            encodeHTMLContent = function encodeHTMLContent(str) {
                                return str.replace(/&quot;/g, '"').replace(/&lt;!--/g, "<!--").replace(/--&gt;/g, "-->");
                            };

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

                            file = think.extend({}, this.file('file'));
                            _context11.next = 6;
                            return getContent(file.path);

                        case 6:
                            data = _context11.sent;
                            _context11.next = 9;
                            return marked(data);

                        case 9:
                            html = _context11.sent;
                            newHtml = encodeHTMLContent(html), ainfo = {};

                            if (!newHtml) {
                                _context11.next = 28;
                                break;
                            }

                            ainfo_obj = void 0;

                            if (!(newHtml.indexOf("<!--") > 0 && newHtml.indexOf("-->") > 0)) {
                                _context11.next = 27;
                                break;
                            }

                            //获取注释信息
                            end = newHtml.indexOf("-->") - 1;
                            note = newHtml.substr(0, newHtml.indexOf("-->") - 1);

                            if (note.indexOf("{") >= 0 && note.indexOf("-") > 0) {
                                ainfo = note.substr(note.indexOf("{"), end);
                            }
                            _context11.prev = 17;

                            ainfo_obj = JSON.parse(ainfo);
                            _context11.next = 24;
                            break;

                        case 21:
                            _context11.prev = 21;
                            _context11.t0 = _context11["catch"](17);
                            return _context11.abrupt("return", this.fail(1000, '解析错误！请检查文章配置项!'));

                        case 24:
                            this.json({ articlehtml: newHtml, ainfo: ainfo_obj });
                            _context11.next = 28;
                            break;

                        case 27:
                            this.json({ articlehtml: html });

                        case 28:
                        case "end":
                            return _context11.stop();
                    }
                }
            }, _callee11, this, [[17, 21]]);
        }));

        function uploadfileAction() {
            return _ref15.apply(this, arguments);
        }

        return uploadfileAction;
    }();

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=content.js.map