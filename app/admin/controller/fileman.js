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

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _base = require("./base.js");

var _base2 = _interopRequireDefault(_base);

var _imageSize = require("image-size");

var _imageSize2 = _interopRequireDefault(_imageSize);

var _gm = require("gm");

var _gm2 = _interopRequireDefault(_gm);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _archiver = require("archiver");

var _archiver2 = _interopRequireDefault(_archiver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverRoot = './static/filemanager/';

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
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt("return", this.display());

                        case 1:
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

    _class.prototype.getconfigAction = function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            return _context2.abrupt("return", this.success({
                                "FILES_ROOT": "",
                                "RETURN_URL_PREFIX": "",
                                "SESSION_PATH_KEY": "",
                                "THUMBS_VIEW_WIDTH": "140",
                                "THUMBS_VIEW_HEIGHT": "120",
                                "PREVIEW_THUMB_WIDTH": "300",
                                "PREVIEW_THUMB_HEIGHT": "200",
                                "MAX_IMAGE_WIDTH": "1000",
                                "MAX_IMAGE_HEIGHT": "1000",
                                "INTEGRATION": "ckeditor",
                                "DIRLIST": "/admin/fileman/dirlist",
                                "CREATEDIR": "/admin/fileman/createdir",
                                "DELETEDIR": "/admin/fileman/delete",
                                "MOVEDIR": "/admin/fileman/move",
                                "COPYDIR": "/admin/fileman/copy",
                                "RENAMEDIR": "/admin/fileman/rename",
                                "FILESLIST": "/admin/fileman/fileslist",
                                "UPLOAD": "/admin/fileman/upload",
                                "DOWNLOAD": "/admin/fileman/download",
                                "DOWNLOADDIR": "/admin/fileman/downloaddir",
                                "DELETEFILE": "/admin/fileman/delete",
                                "MOVEFILE": "/admin/fileman/move",
                                "COPYFILE": "/admin/fileman/copy",
                                "RENAMEFILE": "/admin/fileman/rename",
                                "GENERATETHUMB": "/admin/fileman/generatethumb",
                                "DEFAULTVIEW": "list",
                                "FORBIDDEN_UPLOADS": "zip js jsp jsb mhtml mht xhtml xht php phtml php3 php4 php5 phps shtml jhtml pl sh py cgi exe application gadget hta cpl msc jar vb jse ws wsf wsc wsh ps1 ps2 psc1 psc2 msh msh1 msh2 inf reg scf msp scr dll msi vbs bat com pif cmd vxd cpl htpasswd htaccess",
                                "ALLOWED_UPLOADS": "",
                                "FILEPERMISSIONS": "0644",
                                "DIRPERMISSIONS": "0755",
                                "LANG": "auto",
                                "DATEFORMAT": "dd/MM/yyyy HH:mm",
                                "OPEN_LAST_DIR": "yes"
                            }));

                        case 1:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function getconfigAction() {
            return _ref2.apply(this, arguments);
        }

        return getconfigAction;
    }();

    _class.prototype.getlangAction = function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
            var langfile;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            langfile = think.serverRoot + "/filemanager/lang/" + this.post("lang") + ".json";

                            if (!_fs2.default.existsSync(langfile)) {
                                _context3.next = 3;
                                break;
                            }

                            return _context3.abrupt("return", this.success(JSON.parse(_fs2.default.readFileSync(langfile, 'utf8'))));

                        case 3:
                            return _context3.abrupt("return", this.success({}));

                        case 4:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function getlangAction() {
            return _ref3.apply(this, arguments);
        }

        return getlangAction;
    }();

    _class.prototype.dirlistAction = function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
            var type, response, filesRoot;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            type = this.get('type');
                            response = [];
                            filesRoot = 'pics';


                            getDirectories(filesRoot, type, response);
                            return _context4.abrupt("return", this.success(response));

                        case 5:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function dirlistAction() {
            return _ref4.apply(this, arguments);
        }

        return dirlistAction;
    }();

    _class.prototype.generatethumbAction = function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            this.header("content-type", "image/png");
                            (0, _gm2.default)(_path2.default.join(think.UPLOAD_PATH, this.get('f'))).resize(this.get('width') || '200', this.get('height') || '200', '^').gravity('Center').crop(this.get('width') || '200', this.get('height') || '200').stream('png').pipe(this.http.res);

                        case 2:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function generatethumbAction() {
            return _ref5.apply(this, arguments);
        }

        return generatethumbAction;
    }();

    _class.prototype.downloadAction = function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            this.download(_path2.default.join(think.UPLOAD_PATH, this.get('f')));

                        case 1:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function downloadAction() {
            return _ref6.apply(this, arguments);
        }

        return downloadAction;
    }();

    _class.prototype.downloaddirAction = function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
            var archive;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            this.header('Content-disposition', 'attachment; filename=' + _path2.default.basename(this.get('d')) + '.zip');

                            archive = (0, _archiver2.default)('zip');

                            archive.pipe(this.http.res);
                            archive.bulk([{ expand: true, cwd: _path2.default.join(think.UPLOAD_PATH, this.get('d')), src: ['**/*'] }]);
                            archive.finalize();

                        case 5:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function downloaddirAction() {
            return _ref7.apply(this, arguments);
        }

        return downloaddirAction;
    }();

    _class.prototype.copyAction = function () {
        var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
            var oldPath, newPath;
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _context8.prev = 0;
                            oldPath = _path2.default.join(think.UPLOAD_PATH, this.post('f') || this.post('d'));
                            newPath = _path2.default.join(think.UPLOAD_PATH, this.post('n'), this.post('d').split('/')[this.post('d').split('/').length - 1] || this.post('f').split('/')[this.post('f').split('/').length - 1]);

                            console.log(oldPath);
                            console.log(newPath);

                            if (!_fs2.default.existsSync(newPath)) {
                                _context8.next = 9;
                                break;
                            }

                            return _context8.abrupt("return", this.success({ res: "ok", msg: "Đã tồn tại" }));

                        case 9:
                            _fsExtra2.default.copySync(oldPath, newPath);
                            return _context8.abrupt("return", this.success({ res: "ok", msg: "Success" }));

                        case 11:
                            _context8.next = 16;
                            break;

                        case 13:
                            _context8.prev = 13;
                            _context8.t0 = _context8["catch"](0);
                            return _context8.abrupt("return", this.success({ res: "error", msg: "Có lỗi xảy ra" }));

                        case 16:
                        case "end":
                            return _context8.stop();
                    }
                }
            }, _callee8, this, [[0, 13]]);
        }));

        function copyAction() {
            return _ref8.apply(this, arguments);
        }

        return copyAction;
    }();

    _class.prototype.moveAction = function () {
        var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
            var oldPath, newPath;
            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            _context9.prev = 0;
                            oldPath = _path2.default.join(think.UPLOAD_PATH, this.post('f') || this.post('d'));
                            newPath = _path2.default.join(think.UPLOAD_PATH, this.post('n'), this.post('d').split('/')[this.post('d').split('/').length - 1]);

                            console.log(oldPath);
                            console.log(newPath);

                            if (!_fs2.default.existsSync(newPath)) {
                                _context9.next = 9;
                                break;
                            }

                            return _context9.abrupt("return", this.success({ res: "ok", msg: "Đã tồn tại" }));

                        case 9:
                            _fsExtra2.default.moveSync(oldPath, newPath);
                            return _context9.abrupt("return", this.success({ res: "ok", msg: "Success" }));

                        case 11:
                            _context9.next = 16;
                            break;

                        case 13:
                            _context9.prev = 13;
                            _context9.t0 = _context9["catch"](0);
                            return _context9.abrupt("return", this.success({ res: "error", msg: "Có lỗi xảy ra" }));

                        case 16:
                        case "end":
                            return _context9.stop();
                    }
                }
            }, _callee9, this, [[0, 13]]);
        }));

        function moveAction() {
            return _ref9.apply(this, arguments);
        }

        return moveAction;
    }();

    _class.prototype.createdirAction = function () {
        var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
            var pathfolder;
            return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            pathfolder = _path2.default.join(think.UPLOAD_PATH, this.post('d'), this.post('n'));
                            _context10.prev = 1;

                            if (_fs2.default.existsSync(pathfolder)) {
                                _context10.next = 7;
                                break;
                            }

                            _fs2.default.mkdirSync(_path2.default.join(think.UPLOAD_PATH, this.post('d'), this.post('n')));
                            return _context10.abrupt("return", this.success({ res: "ok", msg: "Success" }));

                        case 7:
                            return _context10.abrupt("return", this.success({ res: "error", msg: "Folder đã tồn tại" }));

                        case 8:
                            _context10.next = 13;
                            break;

                        case 10:
                            _context10.prev = 10;
                            _context10.t0 = _context10["catch"](1);
                            return _context10.abrupt("return", this.success({ res: "error", msg: "Có lỗi xảy ra" }));

                        case 13:
                        case "end":
                            return _context10.stop();
                    }
                }
            }, _callee10, this, [[1, 10]]);
        }));

        function createdirAction() {
            return _ref10.apply(this, arguments);
        }

        return createdirAction;
    }();

    _class.prototype.deleteAction = function () {
        var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11() {
            var pa;
            return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            _context11.prev = 0;
                            pa = _path2.default.join(think.UPLOAD_PATH, this.post('f') || this.post('d'));

                            console.log(pa);
                            _fsExtra2.default.removeSync(pa);
                            //if(fs.lstatSync(pa).isDirectory())
                            //{
                            //    console.log("folder")
                            //    fs.readdirSync(pa).forEach(function(file,index){
                            //        var curPath = pa + "/" + file;
                            //        if(fs.lstatSync(curPath).isDirectory()) { // recurse
                            //            deleteFolderRecursive(curPath);
                            //        } else { // delete file
                            //            fs.unlinkSync(curPath);
                            //        }
                            //    });
                            //    fs.rmdirSync(pa);
                            //}
                            //else
                            //{
                            //    console.log("file")
                            //    fs.unlinkSync(pa)
                            //}
                            return _context11.abrupt("return", this.success({ res: "ok", msg: "Success" }));

                        case 7:
                            _context11.prev = 7;
                            _context11.t0 = _context11["catch"](0);
                            return _context11.abrupt("return", this.success({ res: "error", msg: "Có lỗi xảy ra" }));

                        case 10:
                        case "end":
                            return _context11.stop();
                    }
                }
            }, _callee11, this, [[0, 7]]);
        }));

        function deleteAction() {
            return _ref11.apply(this, arguments);
        }

        return deleteAction;
    }();

    _class.prototype.uploadAction = function () {
        var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12() {
            var file, filepath, uploadPath, basename;
            return _regenerator2.default.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            _context12.prev = 0;
                            file = think.extend({}, this.file('files[]'));
                            filepath = file.path;
                            uploadPath = _path2.default.join(think.UPLOAD_PATH, this.post('d'));
                            basename = _path2.default.basename(filepath);

                            _fs2.default.renameSync(filepath, uploadPath + '/' + basename);

                            file.path = uploadPath + '/' + basename;

                            if (!think.isFile(file.path)) {
                                _context12.next = 9;
                                break;
                            }

                            return _context12.abrupt("return", this.success({ res: "ok", msg: "Success" }));

                        case 9:
                            return _context12.abrupt("return", this.success({ res: "error", msg: "Thất bại" }));

                        case 12:
                            _context12.prev = 12;
                            _context12.t0 = _context12["catch"](0);
                            return _context12.abrupt("return", this.success({ res: "error", msg: "Có lỗi xảy ra" }));

                        case 15:
                        case "end":
                            return _context12.stop();
                    }
                }
            }, _callee12, this, [[0, 12]]);
        }));

        function uploadAction() {
            return _ref12.apply(this, arguments);
        }

        return uploadAction;
    }();

    _class.prototype.fileslistAction = function () {
        var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13() {
            var type, response, pa, pathDir, allimageext, allvideoext;
            return _regenerator2.default.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            type = this.post('type');
                            response = [];
                            pa = this.post('d');
                            pathDir = _path2.default.join(think.UPLOAD_PATH, pa);

                            console.log(pa);
                            allimageext = [".jpg", ".bmp", ".gif", ".png", ".jpeg"];
                            allvideoext = [".mp4"];

                            _fs2.default.readdirSync(pathDir).map(function (file) {
                                if (type == "image") {
                                    var ext = _path2.default.extname(file);
                                    if (allimageext.indexOf(ext) > -1) {
                                        var fileDir = _path2.default.join(pathDir, file);
                                        var info = _fs2.default.statSync(fileDir);
                                        if (info.isFile()) {
                                            var size = null;
                                            try {
                                                size = (0, _imageSize2.default)(fileDir);
                                            } catch (err) {
                                                size = {};
                                            }
                                            response.push({
                                                p: _path2.default.join(pa, file).replace(/\\/g, '/'),
                                                s: info.size,
                                                t: (info.mtime.getTime() / 1000).toFixed(0),
                                                w: size.width,
                                                h: size.height
                                            });
                                        }
                                    }
                                } else if (type == "video") {
                                    var ext = _path2.default.extname(file);
                                    if (allvideoext.indexOf(ext) > -1) {
                                        var fileDir = _path2.default.join(pathDir, file);
                                        var info = _fs2.default.statSync(fileDir);
                                        if (info.isFile()) {
                                            var size = null;
                                            try {
                                                size = (0, _imageSize2.default)(fileDir);
                                            } catch (err) {
                                                size = {};
                                            }
                                            response.push({
                                                p: _path2.default.join(pa, file).replace(/\\/g, '/'),
                                                s: info.size,
                                                t: (info.mtime.getTime() / 1000).toFixed(0),
                                                w: size.width,
                                                h: size.height
                                            });
                                        }
                                    }
                                }
                            });

                            return _context13.abrupt("return", this.success(response));

                        case 9:
                        case "end":
                            return _context13.stop();
                    }
                }
            }, _callee13, this);
        }));

        function fileslistAction() {
            return _ref13.apply(this, arguments);
        }

        return fileslistAction;
    }();

    _class.prototype.renameAction = function () {
        var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14() {
            var pa, name, dir, result;
            return _regenerator2.default.wrap(function _callee14$(_context14) {
                while (1) {
                    switch (_context14.prev = _context14.next) {
                        case 0:
                            pa = _path2.default.join(think.UPLOAD_PATH, this.post('f') || this.post('d'));
                            name = this.post('n');
                            _context14.prev = 2;
                            dir = this.post('d').split("/")[this.post('d').split("/").length - 1];
                            result = false;

                            console.log(dir);
                            if (_fs2.default.lstatSync(pa).isDirectory()) {
                                _fs2.default.readdirSync(pa + "/..").filter(function (file) {
                                    return _fs2.default.statSync(_path2.default.join(pa + "/..", file)).isDirectory();
                                }).forEach(function (file, index) {
                                    if (file == name && file != dir) {
                                        result = true;
                                    }
                                });
                            } else {
                                _fs2.default.readdirSync(pa + "/..").filter(function (file) {
                                    return _fs2.default.statSync(_path2.default.join(pa + "/..", file)).isFile();
                                }).forEach(function (file, index) {
                                    if (file == name && file != dir) {
                                        result = true;
                                    }
                                });
                            }

                            if (!result) {
                                _context14.next = 11;
                                break;
                            }

                            return _context14.abrupt("return", this.success({ res: "error", msg: "Tên đã tồn tại" }));

                        case 11:
                            _fs2.default.renameSync(pa, _path2.default.join(pa + "/..", name));

                        case 12:
                            return _context14.abrupt("return", this.success({ res: "ok", msg: "Success" }));

                        case 15:
                            _context14.prev = 15;
                            _context14.t0 = _context14["catch"](2);
                            return _context14.abrupt("return", this.success({ res: "error", msg: "Có lỗi xảy ra" }));

                        case 18:
                        case "end":
                            return _context14.stop();
                    }
                }
            }, _callee14, this, [[2, 15]]);
        }));

        function renameAction() {
            return _ref14.apply(this, arguments);
        }

        return renameAction;
    }();

    return _class;
}(_base2.default);
//function copyFile(src, dest) {

//    let readStream = fs.createReadStream(src);

//    readStream.once('error', (err) => {
//        console.log(err);
//    });

//    readStream.once('end', () => {
//        console.log('done copying');
//    });

//    readStream.pipe(fs.createWriteStream(dest));
//}


exports.default = _class;
var getDirectories = function getDirectories(srcpath, type, response) {

    var info = {
        p: srcpath.replace(/\\/g, '/'),
        f: 0,
        d: 0
    };
    response.push(info);
    var allimageext = [".jpg", ".bmp", ".gif", ".png", ".jpeg"];
    var allvideoext = [".mp4"];
    var serverRoot = think.UPLOAD_PATH + '/';
    // console.log(fs.existsSync(uploadPath))
    _fs2.default.readdirSync(serverRoot + srcpath).map(function (file) {
        var pathDir = _path2.default.join(srcpath, file);
        if (_fs2.default.statSync(serverRoot + pathDir).isDirectory()) {
            info.d++;
            getDirectories(pathDir, type, response);
        } else {
            var ext = _path2.default.extname(file);
            if (type == "image" && allimageext.indexOf(ext) > -1) {
                info.f++;
            } else if (type == "video" && allvideoext.indexOf(ext) > -1) {
                info.f++;
            }
        }
    });
};
//# sourceMappingURL=fileman.js.map