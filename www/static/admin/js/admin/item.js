/**
 * Created by livi on 16/4/20.
 */
$(function(){
    $("#saveitem").click(function(){
        var newData={
            id:$("#tid").val(),
            parentid:$("#parentid").val(),
            itemname:$(".itemname").val(),
            urlrewrite:slugify($(".itemname").val()),
            __CSRF__:G_csrf
        }
        $.ajax({
            url:'/admin/item/save',
            data:newData,
            type:'POST',
            success:function(json){
              console.log(json.data)
                if(json.errno===0){
                    alert("保存成功！");
                    window.location.href="/admin/item/index/"+parseInt(json.data.parentid)
                }else{
                    alert(json.errmsg)
                }
            }
        })
    })

    $('.delete').bind('click', function () {
        var delId = $(this).attr("del-id");
        var parentid= $(this).attr("data-parentid");
        var delids=[];
        delids.push(delId);
        var r = confirm("确定删除？");
        if (r) {
            $.ajax({
                url: '/admin/item/delsome',
                data: {delarr:delids,__CSRF__: G_csrf},
                type: 'POST',
                success: function (json) {
                    if (json.errno === 0) {
                        alert("删除成功！");
                        window.location.href = "/admin/item/index/"+parseInt(parentid);
                    }else{
                        alert(json.errmsg)
                    }
                }
            })
        } else {
        }
    })
})

    //批量删除
    var delsome=function(parentid=0){
        var delids=[];
        $.each($('input[type="checkbox"]','tbody'),function(i,item){
            if($(item).is(':checked')){
                delids.push($(this).val());
            }
        })
        var r = confirm("确定删除？");
        if (r) {
            $.ajax({
                url: '/admin/item/delsome',
                data: {delarr:delids,__CSRF__: G_csrf},
                type: 'POST',
                success: function (json) {
                    if (json.errno === 0) {
                        alert("删除成功！");
                        window.location.href = "/admin/item/index/"+parseInt(parentid);
                    }else{
                        alert(json.errmsg)
                    }
                }
            })
        } else {
            return false
        }
    }
    function slugify(str) {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }
