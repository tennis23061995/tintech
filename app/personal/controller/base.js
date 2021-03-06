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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$controller$bas) {
    (0, _inherits3.default)(_class, _think$controller$bas);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
    }

    /**
     * some base method in here
     */
    _class.prototype.__before = function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var _web, csrf, uinfo, islogin, logininfo, lstparentmenu, navList, i, submenu, submenusid, j;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this.getConfig();

                        case 2:
                            _web = _context.sent;

                            this.assign('_web', _web);

                            //设置CSRF值
                            _context.next = 6;
                            return this.session("__CSRF__");

                        case 6:
                            csrf = _context.sent;

                            this.assign("csrf", csrf);

                            // 是否登陆
                            _context.next = 10;
                            return this.session('uInfo');

                        case 10:
                            uinfo = _context.sent;
                            islogin = !think.isEmpty(uinfo) ? 1 : 0;

                            this.assign("islogin", islogin);

                            if (think.isEmpty(uinfo)) {
                                _context.next = 18;
                                break;
                            }

                            _context.next = 16;
                            return this.model('personal').findAll('user', { name: uinfo.name });

                        case 16:
                            logininfo = _context.sent;

                            //自己的个人中心基本信息
                            this.assign("logininfo", logininfo[0]);

                        case 18:
                            _context.next = 20;
                            return this.model("personal").findAll('item', { parentid: ['IN', [0]] });

                        case 20:
                            lstparentmenu = _context.sent;
                            navList = { menu: [] };
                            i = 0;

                        case 23:
                            if (!(i < lstparentmenu.length)) {
                                _context.next = 33;
                                break;
                            }

                            _context.next = 26;
                            return this.model("personal").findAll('item', { parentid: ['IN', [parseInt(lstparentmenu[i].id)]] });

                        case 26:
                            submenu = _context.sent;
                            submenusid = [];

                            for (j = 0; j < submenu.length; j++) {
                                submenusid.push(submenu[j].id);
                            }
                            navList.menu.push({ parentmenu: JSON.parse((0, _stringify2.default)(lstparentmenu[i])), submenus: JSON.parse((0, _stringify2.default)(submenu)), submenusid: submenusid });

                        case 30:
                            i++;
                            _context.next = 23;
                            break;

                        case 33:
                            console.log(navList);
                            //let navList = await this.model("home").findAll('item',{parentid:['IN', [0]]});
                            this.assign("navList", navList);

                            // 设置主题地址
                            this.THEME_VIEW_PATH = '' + think.THEME_PATH + think.sep + _web.theme + think.sep + think.Modules_Src + think.sep + this.http.module + think.sep;
                            this.assign("theme_url", 'static/theme/' + _web.theme + '/res');

                        case 37:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function __before() {
            return _ref.apply(this, arguments);
        }

        return __before;
    }();

    _class.prototype.getConfig = function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
            var sysdata;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return this.model('personal').findOne('system', { id: 1 });

                        case 2:
                            sysdata = _context2.sent;

                            this.assign('_web', sysdata);
                            return _context2.abrupt('return', sysdata);

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function getConfig() {
            return _ref2.apply(this, arguments);
        }

        return getConfig;
    }();

    // 渲染主题view层


    _class.prototype.displayView = function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(name) {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            return _context3.abrupt('return', this.display(this.THEME_VIEW_PATH + name + '.html'));

                        case 1:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function displayView(_x) {
            return _ref3.apply(this, arguments);
        }

        return displayView;
    }();

    return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=base.js.map