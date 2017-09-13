/**
 * Created by livi on 16/4/20.
 */
$(function(){
    $("#savetag").click(function(){
        var newData={
            id:$("#tid").val(),
            tagname:$(".tagname").val(),
            urlrewrite: slugify($(".tagname").val()),
            __CSRF__:G_csrf
        }
        $.ajax({
            url:'/admin/tag/save',
            data:newData,
            type:'POST',
            success:function(json){
                if(json.errno===0){
                  if(json.data.tagexist)
                  {
                    alert("Từ khóa đã tồn tại");
                  }
                  else {
                    alert("Lưu thành công!");
                    window.location.href="/admin/tag/index"
                  }
                }else{
                    alert(json.errmsg)
                }
            }
        })
    })

    $('.delete').bind('click', function () {
        var delId = $(this).attr("del-id");
        var delids=[];
        delids.push(delId);
        var r = confirm("Bạn chắc chắc muốn xóa không？");
        if (r) {
            $.ajax({
                url: '/admin/tag/delsome',
                data: {delarr:delids,__CSRF__: G_csrf},
                type: 'POST',
                success: function (json) {
                    if (json.errno === 0) {
                        alert("Xóa thành công！");
                        window.location.href = "/admin/tag/index";
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
    var delsome=function(){
        var delids=[];
        $.each($('input[type="checkbox"]','tbody'),function(i,item){
            if($(item).is(':checked')){
                delids.push($(this).val());
            }
        })
        var r = confirm("Bạn chắc chắc muốn xóa không？");
        if (r) {
            $.ajax({
                url: '/admin/tag/delsome',
                data: {delarr:delids,__CSRF__: G_csrf},
                type: 'POST',
                success: function (json) {
                    if (json.errno === 0) {
                        alert("Xóa thành công！");
                        window.location.href = "/admin/tag/index";
                    }else{
                        alert(json.errmsg)
                    }
                }
            })
        } else {
            return false
        }
    }

    //显示/隐藏标签
    $(".isappear").on('click',function(){
      var tid=$(this).attr('tag-id');
      var tagVal=$(this).attr('tag-val');
      var newData={
        id:tid,
        appear:tagVal,
        __CSRF__:G_csrf
      }
        $.ajax({
            url:'/admin/tag/save',
            data:newData,
            type:'POST',
            success:function(json){
              if(json.errno===0){
                  alert("Cập nhật trang thái thành công！");
                  window.location.href='/admin/tag/index';
              }else{
                  alert(json.errmsg)
              }
            }
        })
    })
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
