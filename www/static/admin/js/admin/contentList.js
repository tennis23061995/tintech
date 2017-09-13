/**
 * Created by livi on 16/4/19.
 */
    //文章搜索
        $("#search_article").on('click',function(){
            var searchTxt=$("#searchText").val();
            window.location.href="/admin/content/index?page=1&pagesize=10&search="+searchTxt;
        })
        $("#markselect").on('change',function(){
            var filter=$(this).val();
            window.location.href="/admin/content/index?page=1&pagesize=10&type="+filter;
        })
        $('.delete').bind('click', function () {
            var delId = $(this).attr("del-id");
            var delids = [];
            delids.push(delId);
            var r = confirm("Bạn chắc chắn muốn xóa không？");
            if (r) {
                $.ajax({
                    url: '/admin/content/delsome',
                    data: {delarr: delids, __CSRF__: G_csrf},
                    type: 'POST',
                    success: function (json) {
                        if (json.errno === 0) {
                            alert("Xóa thành công!");
                            window.location.href = "/admin/content";
                        }else{
                            alert(json.errmsg)
                        }
                    }
                })
            } else {
            }
        })
        var delsome = function () {
            var delids = [];
            $.each($('input[type="checkbox"]', 'tbody'), function (i, item) {
                if ($(item).is(':checked')) {
                    delids.push($(this).val());
                }
            })
            var r = confirm("Bạn chắc chắn muốn xóa không？");
            if (r) {
                $.ajax({
                    url: '/admin/content/delsome',
                    data: {delarr: delids, __CSRF__: G_csrf},
                    type: 'POST',
                    success: function (json) {
                        if (json.errno === 0) {
                            alert("Xóa thành công!");
                            window.location.href = "/admin/content";
                        }else{
                            alert(json.errmsg)
                        }
                    }
                })
            } else {
                return false
            }
        }

        //发布文章
        $(".published").on('click',function(){
          var aid=$(this).attr('pub-id');
          var status=parseInt($(this).attr("data-publish"));
          alert(status);
          var newData={
            id:aid,
            ispublished:status,
            __CSRF__:G_csrf
          }
            $.ajax({
                url:'/admin/content/updatestatus',
                data:newData,
                type:'POST',
                success:function(json){
                  if(json.errno===0){
                      alert("Cập nhật trạng thái thành công！");
                      window.location.href='/admin/content/index';
                  }else{
                      alert(json.errmsg)
                  }
                }
            })
        })
        //回车触发提交表单
        $(document).keyup(function(event){
          if(event.keyCode ==13){
            $("#search_article").trigger("click");
          }
        });
