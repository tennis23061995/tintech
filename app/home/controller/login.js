'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  //用户登录
  _class.prototype.indexAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var uinfo;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.session('uInfo');

            case 2:
              uinfo = _context.sent;

              if (think.isEmpty(uinfo)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt('return', this.redirect('/personal/@' + uinfo.name));

            case 7:
              this.assign("title", "用户登录");
              return _context.abrupt('return', this.displayView("login_index"));

            case 9:
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

  _class.prototype.loginfacebookAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var token, urlprofile, resultuser, newData, result, uInfo, userData, rs, _uInfo;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.get("access_token");

            case 2:
              token = _context2.sent;
              urlprofile = "https://graph.facebook.com/me?access_token=" + token + "&fields=email,name,first_name,last_name,link,birthday,cover,devices,gender";
              _context2.next = 6;
              return doRequest(urlprofile);

            case 6:
              resultuser = _context2.sent;
              newData = JSON.parse(resultuser);

              console.log(newData);
              _context2.next = 11;
              return this.model('home').findOne('user', { email: newData.email, _logic: 'OR' });

            case 11:
              result = _context2.sent;

              if (think.isEmpty(result)) {
                _context2.next = 18;
                break;
              }

              uInfo = {
                email: result.email,
                pic: result.pic,
                name: result.name,
                nickname: result.nickname,
                openid: '',
                way: 'site'
              };
              _context2.next = 16;
              return this.session("uInfo", uInfo);

            case 16:
              _context2.next = 29;
              break;

            case 18:
              userData = {};

              userData.name = newData.id;
              userData.nickname = newData.name;
              userData.email = newData.email;
              userData.createtime = think.datetime(this.post('createtime'));
              _context2.next = 25;
              return this.model('home').addUser(userData);

            case 25:
              rs = _context2.sent;
              _uInfo = {
                email: userData.email,
                pic: '',
                name: userData.name,
                nickname: '',
                openid: '',
                way: 'site'
              };
              _context2.next = 29;
              return this.session("uInfo", _uInfo);

            case 29:
              _context2.t0 = this;
              _context2.next = 32;
              return this.get("href");

            case 32:
              _context2.t1 = _context2.sent;
              return _context2.abrupt('return', _context2.t0.redirect.call(_context2.t0, _context2.t1));

            case 34:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function loginfacebookAction() {
      return _ref2.apply(this, arguments);
    }

    return loginfacebookAction;
  }();

  _class.prototype.logingoogleAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var token, urlprofile, resultuser, newData, result, uInfo, userData, rs, _uInfo2;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.get("access_token");

            case 2:
              token = _context3.sent;

              console.log("token" + token);
              urlprofile = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + token;
              _context3.next = 7;
              return doRequest(urlprofile);

            case 7:
              resultuser = _context3.sent;
              newData = JSON.parse(resultuser);
              _context3.next = 11;
              return this.model('home').findOne('user', { email: newData.email, _logic: 'OR' });

            case 11:
              result = _context3.sent;

              if (think.isEmpty(result)) {
                _context3.next = 18;
                break;
              }

              uInfo = {
                email: result.email,
                pic: result.pic,
                name: result.name,
                nickname: result.nickname,
                openid: '',
                way: 'site'
              };
              _context3.next = 16;
              return this.session("uInfo", uInfo);

            case 16:
              _context3.next = 29;
              break;

            case 18:
              userData = {};

              userData.name = newData.id;
              userData.nickname = newData.name;
              userData.email = newData.email;
              userData.createtime = think.datetime(this.post('createtime'));
              _context3.next = 25;
              return this.model('home').addUser(userData);

            case 25:
              rs = _context3.sent;
              _uInfo2 = {
                email: userData.email,
                pic: '',
                name: userData.name,
                nickname: '',
                openid: '',
                way: 'site'
              };
              _context3.next = 29;
              return this.session("uInfo", _uInfo2);

            case 29:
              _context3.t0 = this;
              _context3.next = 32;
              return this.get("href");

            case 32:
              _context3.t1 = _context3.sent;
              return _context3.abrupt('return', _context3.t0.redirect.call(_context3.t0, _context3.t1));

            case 34:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function logingoogleAction() {
      return _ref3.apply(this, arguments);
    }

    return logingoogleAction;
  }();

  _class.prototype.dologinAction = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var data, code, sysCode, md5Pas, email, result, uInfo;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              data = this.post();
              code = data.code;
              _context4.next = 4;
              return this.session('code');

            case 4:
              sysCode = _context4.sent;
              _context4.next = 7;
              return think.md5(data.password);

            case 7:
              md5Pas = _context4.sent;
              _context4.next = 10;
              return data.email;

            case 10:
              email = _context4.sent;
              _context4.next = 13;
              return this.model('home').findOne('user', { email: email, name: email, _logic: 'OR' });

            case 13:
              result = _context4.sent;

              if (!((email === result.name || email === result.email) && md5Pas === result.password)) {
                _context4.next = 21;
                break;
              }

              uInfo = {
                email: email,
                pic: result.pic,
                name: result.name,
                nickname: result.nickname,
                openid: '',
                way: 'site'
              };
              _context4.next = 18;
              return this.session("uInfo", uInfo);

            case 18:
              return _context4.abrupt('return', this.json({ status: 1, errno: 0, uname: result.name, errmsg: "登陆成功!" }));

            case 21:
              return _context4.abrupt('return', this.json({ status: 0, errno: 1, errmsg: "Đăng nhập thất bại!" }));

            case 22:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function dologinAction() {
      return _ref4.apply(this, arguments);
    }

    return dologinAction;
  }();

  _class.prototype.githubAction = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var self, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, code, formData;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              self = this;
              GITHUB_CLIENT_ID = "776342f65de13d9b3df4", GITHUB_CLIENT_SECRET = "080784f5209b1dc0d934e66eeab8013c4e68735c";
              _context5.next = 4;
              return this.get('code');

            case 4:
              code = _context5.sent;
              formData = {
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code: code
              };


              _request2.default.post({
                url: 'https://github.com/login/oauth/access_token',
                form: formData,
                headers: { Accept: 'application/json' }
              }, function (err, res1, body) {

                var access_token = JSON.parse(body).access_token;
                var headers2 = {
                  'User-Agent': 'Awesome-Octocat-App'
                };
                _request2.default.get({
                  url: 'https://api.github.com/user',
                  qs: { access_token: access_token },
                  headers: headers2
                }, function (err, res2, body) {
                  var info = JSON.parse(body);
                  var uInfo = {
                    email: info.email,
                    pic: '',
                    name: '',
                    nickname: info.login,
                    openid: info.id,
                    way: 'github'
                  };
                  self.session("uInfo", uInfo);
                  self.redirect("/login/complete");
                });
              });

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function githubAction() {
      return _ref5.apply(this, arguments);
    }

    return githubAction;
  }();

  _class.prototype.qqloginAction = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      var self, QQ_CLIENT_ID, QQ_CLIENT_SECRET, REDIRECT_URI, QQ_grant_type, code, qs;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              self = this;
              QQ_CLIENT_ID = "101334443";
              QQ_CLIENT_SECRET = "ace474e949764ac84a9faeb8f99ae4c6";
              REDIRECT_URI = "http://www.jsout.com/login/qqlogin";
              QQ_grant_type = "authorization_code";
              //注意:回填地址, 因为QQ不允许像github一样填http://127.0.0.1:3000的开发者模式,
              // https://graph.qq.com/oauth2.0/authorize?redirect_uri=' + REDIRECT_URI + '&response_type=code&client_id=' + QQ_CLIENT_ID

              _context6.next = 7;
              return this.get('code');

            case 7:
              code = _context6.sent;
              qs = {
                grant_type: 'authorization_code',
                client_id: QQ_CLIENT_ID,
                client_secret: QQ_CLIENT_SECRET,
                code: code,
                redirect_uri: REDIRECT_URI
              };

              _request2.default.get({
                url: 'https://graph.qq.com/oauth2.0/token',
                qs: qs
              }, function (err, res1, body) {
                var access_token = body.match(/access_token=(\w+)&?/)[1];
                _request2.default.get({
                  url: 'https://graph.qq.com/oauth2.0/me',
                  qs: { access_token: access_token }
                }, function (err, res2, body) {
                  var openid = body.match(/"openid":"(\w+)"/)[1];
                  var qs = {
                    oauth_consumer_key: QQ_CLIENT_ID,
                    access_token: access_token,
                    openid: openid,
                    format: 'json'
                  };
                  // 获取用户信息
                  _request2.default.get({
                    url: 'https://graph.qq.com/user/get_user_info',
                    qs: qs
                  }, function (err, res2, body) {
                    var info = JSON.parse(body);
                    var uInfo = {
                      email: '',
                      pic: '',
                      name: '',
                      nickname: info.nickname,
                      openid: openid,
                      way: 'qq'
                    };
                    self.session("uInfo", uInfo);
                    self.redirect("/login/complete");
                  });
                });
              });

            case 10:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function qqloginAction() {
      return _ref6.apply(this, arguments);
    }

    return qqloginAction;
  }();

  _class.prototype.completeAction = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
      var uinfo, DB_userinfo;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              this.assign('title', '完善资料');
              _context7.next = 3;
              return this.session("uInfo");

            case 3:
              uinfo = _context7.sent;

              if (!think.isEmpty(uinfo)) {
                _context7.next = 8;
                break;
              }

              return _context7.abrupt('return', this.redirect("/login.html"));

            case 8:
              _context7.next = 10;
              return this.model('home').findOne('user', { openid: uinfo.openid });

            case 10:
              DB_userinfo = _context7.sent;

              if (!think.isEmpty(DB_userinfo)) {
                _context7.next = 16;
                break;
              }

              this.assign("uinfo", uinfo);
              return _context7.abrupt('return', this.displayView("login_complete"));

            case 16:
              //已注册
              uinfo.name = DB_userinfo.name;
              return _context7.abrupt('return', this.redirect("/personal/@" + DB_userinfo.name));

            case 18:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function completeAction() {
      return _ref7.apply(this, arguments);
    }

    return completeAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;

function doRequest(url) {
  var request = require('request');
  return new _promise2.default(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}
//# sourceMappingURL=login.js.map