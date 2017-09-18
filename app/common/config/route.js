"use strict";

module.exports = [
// [':urlrewrite/:aid', "home/index/page"],
[/^admin\/content\/article\/(\d+)$/, "admin/content/article?id=:1"], [/^admin\/video\/video\/(\d+)$/, "admin/video/video?id=:1"], [/^admin\/tag\/item\/(\d+)$/, "admin/tag/item?id=:1"], [/^admin\/item\/index\/(\d+)$/, "admin/item/index?id=:1"], [/^admin\/item\/item\/(\d+)\/(\d+)$/, "admin/item/item?id=:1&pid=:2"], [/^admin\/role\/item\/(\d+)$/, "admin/role/item?id=:1"], [/^admin\/pertag\/item\/(\d+)$/, "admin/pertag/item?id=:1"], [/^admin\/role\/perlist\/(\d+)$/, "admin/role/perlist?id=:1"], [/^admin\/permission\/item\/(\d+)$/, "admin/permission/item?id=:1"], [/^admin\/menu\/item\/(\d+)$/, "admin/menu/item?id=:1"], [/^admin\/user\/item\/(\d+)$/, "admin/user/item?id=:1"], [/^xu-huong\/([a-z0-9]+(-[a-z0-9]+)*)+(\d+)*$/, "home/index/category?aurl=:1"], [/^admin\/taglist\/edit\/(\d+)$/, "admin/taglist/edit?id=:1"], [/^admin\/content$/, "admin/content/index"], [/^admin$/, "admin/index"], [/^admin\/index$/, "admin/index"], [/^video$/, "home/video/index"], [/^admin\/login$/, "home/admin/login"], [/^admin\/redirect$/, "home/admin/redirect"], [/^([a-z0-9]+(-[a-z0-9]+)*)+(\d+)*$/, "home/index/menu?curl=:1"], [/^([a-z0-9]+(-[a-z0-9]+)*)+(\d+)*\/([a-z0-9]+(-[a-z0-9]+)*)+(\d+)*$/, "home/index/page?curl=:1&aurl=:4"]];
//# sourceMappingURL=route.js.map