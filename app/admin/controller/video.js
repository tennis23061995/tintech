'use strict';

exports.__esModule = true;

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
                            return this.model("admin").getVideoJoinRecord(map, pagenumber, pagesize);

                        case 10:
                            articlelist = _context.sent;
                            _context.next = 13;
                            return this.model("admin").getPageVideoCountSelect(map, pagenumber, pagesize);

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
                            _map = (_map2 = { title: ["like", "%" + searchtxt + "%"] }, _map2['li_video.id'] = ["like", "%" + searchtxt * 1 + "%"], _map2._logic = "OR", _map2);
                            _context.next = 21;
                            return this.model("admin").getVideoJoinRecord(_map, pagenumber, pagesize);

                        case 21:
                            articlelist = _context.sent;
                            _context.next = 24;
                            return this.model("admin").getPageVideoCountSelect(_map, pagenumber, pagesize);

                        case 24:
                            result = _context.sent;

                            this.assign("type", '');
                            _context.next = 36;
                            break;

                        case 28:
                            _map3 = {};
                            _context.next = 31;
                            return this.model("admin").getVideoJoinRecord(_map3, pagenumber, pagesize);

                        case 31:
                            articlelist = _context.sent;
                            _context.next = 34;
                            return this.model("admin").getPageVideoCountSelect(_map3, pagenumber, pagesize);

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

                            return _context.abrupt("return", this.redirect("/admin/video/index?page=1&pagesize=" + pageSize));

                        case 46:
                            this.assign("title", "Danh sách video");
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


    _class.prototype.videoAction = function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
            var tagsList, lstparentmenu, navList, i, submenu, submenusid, j, article, tags, keywords, tagname, item, picurl, tag_selected_id, item_selected_id;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return this.model("admin").findAll("tags");

                        case 2:
                            tagsList = _context3.sent;

                            this.assign("tagsList", tagsList);
                            //获取类型
                            _context3.next = 6;
                            return this.model("admin").findAll('item', { parentid: ['IN', [0]] });

                        case 6:
                            lstparentmenu = _context3.sent;
                            navList = { menu: [] };
                            i = 0;

                        case 9:
                            if (!(i < lstparentmenu.length)) {
                                _context3.next = 19;
                                break;
                            }

                            _context3.next = 12;
                            return this.model("admin").findAll('item', { parentid: ['IN', [parseInt(lstparentmenu[i].id)]] });

                        case 12:
                            submenu = _context3.sent;
                            submenusid = [];

                            for (j = 0; j < submenu.length; j++) {
                                submenusid.push(submenu[j].id);
                            }
                            navList.menu.push({ parentmenu: JSON.parse((0, _stringify2.default)(lstparentmenu[i])), submenus: JSON.parse((0, _stringify2.default)(submenu)), submenusid: submenusid });

                        case 16:
                            i++;
                            _context3.next = 9;
                            break;

                        case 19:
                            this.assign("navList", navList);
                            //编辑或者新增

                            if (!this.get('id')) {
                                _context3.next = 50;
                                break;
                            }

                            _context3.next = 23;
                            return this.model('admin').findOne('video', { id: this.get('id') });

                        case 23:
                            article = _context3.sent;
                            tags = '{"tags":[';

                            if (!article.keywords) {
                                _context3.next = 37;
                                break;
                            }

                            keywords = article.keywords.split(",");
                            i = 0;

                        case 28:
                            if (!(i < keywords.length)) {
                                _context3.next = 37;
                                break;
                            }

                            _context3.next = 31;
                            return this.model("admin").findOne("tags", { id: keywords[i] });

                        case 31:
                            tagname = _context3.sent.tagname;

                            console.log(tagname);
                            if (tagname) {
                                item = "{";

                                item += '"value":' + keywords[i] + ',"text":"' + tagname + '"';
                                item += "}";
                                if (keywords.length == i + 1) tags += item;else tags += item + ",";
                            }

                        case 34:
                            i++;
                            _context3.next = 28;
                            break;

                        case 37:
                            tags += "]}";
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

                            this.assign("title", "Thêm video");

                            _context3.next = 57;
                            break;

                        case 50:
                            this.assign('article', {});
                            this.assign("selectedId", '');
                            this.assign("picurl", '');
                            this.assign("piccss", '');
                            this.assign("tagselectedId", '');
                            this.assign("itemselectedId", '');
                            this.assign("title", "Thêm video");

                        case 57:
                            this.assign('ismarkdown', false); //不显示markdown导入
                            return _context3.abrupt("return", this.display());

                        case 59:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function videoAction() {
            return _ref3.apply(this, arguments);
        }

        return videoAction;
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
            var mycreatetime, data, item, rs, articleinfo;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            //编辑或者新增
                            console.log("term");
                            mycreatetime = think.datetime(this.post('createtime'));
                            _context6.next = 4;
                            return this.post();

                        case 4:
                            data = _context6.sent;

                            if (!(data.item != 0)) {
                                _context6.next = 11;
                                break;
                            }

                            _context6.next = 8;
                            return this.model("admin").findOne("item", { id: data.item });

                        case 8:
                            item = _context6.sent;

                            data['itemurlrewrite'] = item.urlrewrite;
                            data['itemname'] = item.itemname;

                        case 11:
                            console.log(data);
                            data.createtime = mycreatetime;

                            if (think.isEmpty(this.post("id"))) {
                                _context6.next = 21;
                                break;
                            }

                            _context6.next = 16;
                            return this.model("admin").updateRecord("video", {}, data);

                        case 16:
                            rs = _context6.sent;

                            if (!rs) {
                                _context6.next = 19;
                                break;
                            }

                            return _context6.abrupt("return", this.success());

                        case 19:
                            _context6.next = 25;
                            break;

                        case 21:
                            _context6.next = 23;
                            return this.model("admin").addRecord("video", data);

                        case 23:
                            articleinfo = _context6.sent;
                            return _context6.abrupt("return", this.success({ id: articleinfo }));

                        case 25:
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
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
            var pid, rs;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.next = 2;
                            return this.post("id");

                        case 2:
                            pid = _context7.sent;

                            if (think.isEmpty(pid)) {
                                _context7.next = 9;
                                break;
                            }

                            _context7.next = 6;
                            return this.model("admin").updateRecord("video", { id: pid }, { ispublished: 1 });

                        case 6:
                            rs = _context7.sent;

                            if (!rs) {
                                _context7.next = 9;
                                break;
                            }

                            return _context7.abrupt("return", this.success());

                        case 9:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function updatestatusAction() {
            return _ref7.apply(this, arguments);
        }

        return updatestatusAction;
    }();
    //删除或批量删除接口


    _class.prototype.delsomeAction = function () {
        var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
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
                            return this.model("admin").deleteRecord("video", where);

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
            return _ref8.apply(this, arguments);
        }

        return delsomeAction;
    }();

    //上传图片接口


    _class.prototype.uploadAction = function () {
        var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
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
            return _ref9.apply(this, arguments);
        }

        return uploadAction;
    }();

    //上传阿里云OSS图片接口


    _class.prototype.uploadeditorAction = function () {
        var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
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
            return _ref10.apply(this, arguments);
        }

        return uploadeditorAction;
    }();
    //上传markdown文件及解析接口、内容分页


    _class.prototype.uploadfileAction = function () {
        var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11() {
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
            return _ref11.apply(this, arguments);
        }

        return uploadfileAction;
    }();

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=video.js.map