'use strict';exports.__esModule = true;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.js');var _base2 = _interopRequireDefault(_base);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_Base) {(0, _inherits3.default)(_class, _Base);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));}_class.prototype.



    indexAction = function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {var sysdata;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                            this.assign("title", "系统设置");_context.next = 3;return (
                                this.model('admin').findOne('system'));case 3:sysdata = _context.sent;
                            this.assign('sysdata', sysdata);return _context.abrupt('return',
                            this.display());case 6:case 'end':return _context.stop();}}}, _callee, this);}));function indexAction() {return _ref.apply(this, arguments);}return indexAction;}();_class.prototype.

    editAction = function () {var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {var mydata, rs;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                                this.post());case 2:mydata = _context2.sent;_context2.next = 5;return (
                                this.model('admin').updateRecord('system', { id: 1 }, mydata));case 5:rs = _context2.sent;if (!
                            rs) {_context2.next = 8;break;}return _context2.abrupt('return', this.success());case 8:case 'end':return _context2.stop();}}}, _callee2, this);}));function editAction() {return _ref2.apply(this, arguments);}return editAction;}();_class.prototype.

    commenteditAction = function () {var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {var mydata, rs;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                                this.post());case 2:mydata = _context3.sent;_context3.next = 5;return (
                                this.model('admin').updateRecord('system_comment', { id: 1 }, mydata));case 5:rs = _context3.sent;if (!
                            rs) {_context3.next = 8;break;}return _context3.abrupt('return', this.success());case 8:case 'end':return _context3.stop();}}}, _callee3, this);}));function commenteditAction() {return _ref3.apply(this, arguments);}return commenteditAction;}();_class.prototype.

    setcommentAction = function () {var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {var sysdata;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                            this.assign("title", "评论设置");_context4.next = 3;return (
                                this.model('admin').findOne('system_comment', { id: 1 }));case 3:sysdata = _context4.sent;
                            this.assign('sysdata', sysdata);return _context4.abrupt('return',
                            this.display());case 6:case 'end':return _context4.stop();}}}, _callee4, this);}));function setcommentAction() {return _ref4.apply(this, arguments);}return setcommentAction;}();return _class;}(_base2.default);exports.default = _class;