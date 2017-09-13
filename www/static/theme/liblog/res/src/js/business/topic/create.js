/**
 * Created by livi on 16/4/19.
 */

    // var editor = new wangEditor('editor');
    //   editor.config.menus = [
    //     'bold',
    //     'underline',
    //     'italic',
    //     'fontsize',
    //     'strikethrough',
    //     'unorderlist',
    //     'orderlist',
    //     'img',
    //     'link',
    //     'forecolor',
    //     'bgcolor',
    //     'location',
    //     'table',
    //     'emotion',
    //     'insertcode',
    //     'eraser',
    //     'fullscreen'
    //   ];
    // editor.config.uploadParams = {
    //     __CSRF__:G_csrf
    // };
    // editor.config.emotions = {
    //     'default': {
    //         title: '默认',
    //         data: '/static/theme/default/res/emotions.data'
    //     }
    // };
    // editor.config.uploadImgFileName = 'img';
    // editor.config.uploadImgUrl = '/topic/create/uploadeditor';
    // console.log(G_csrf);
    // // 表情
    // editor.create();
    var roxyFileman = '/admin/fileman/index';

    CKEDITOR.replace('editor', {
        language: 'en',
        filebrowserBrowseUrl: roxyFileman + '?type=video',
        filebrowserImageBrowseUrl: roxyFileman + '?type=image',
        removeDialogTabs: 'link:upload;image:upload'
    });
    $("#savetopic").click(function(){
        var html = CKEDITOR.instances['editor'].getData();
        var content = $.trim(html);
        var text = $(html).text();
        var title=$("#topicTitle").val();
        var topicitem=$("#tab-value").val();
        $(".topic-item-error").remove();
        $(".topic-error").remove();
        $(".reply-error").remove();
        if(topicitem==null || topicitem==="")
        {
          $("#tab-value").after('<span class="topic-item-error" style="color:red">Vui lòng chọn danh mục!</span>');
        }
        else if ($.trim(title).length==0) {
          $("#topicTitle").after('<span class="topic-error" style="color:red">Vui lòng nhập chủ đề!</span>');
        }
        // else if($.trim(text)===""){
        //   $("#savetopic").after('<span class="reply-error">Mô tả không thể để trống!</span>');
        //   return false;
        // }
        else{
            var newData={
                title:title,
                urlrewrite:slugify(title),
                text:text,
                content:content,
                item:$("#tab-value").val(),
                author:$("#uname").val(),
                createtime:new Date(),
                updateauthor:$("#uname").val(),
                updatetime:new Date(),
                updatepic:$("#upic").val(),
                __CSRF__:G_csrf
            }
            $.ajax({
                url:'/topic/create/doadd',
                data:newData,
                type:'POST',
                success:function(json){
                    if(json.errno===0){
                        window.location.href="/chu-de"
                    }else{
                        alert(json.errmsg)
                    }
                }
            })
      }
    })

    $("#updatetopic").click(function(){
        var html = CKEDITOR.instances['editor'].getData();
        var content = $.trim(html);
        var text = $(html).text();
        var title=$("#topicTitle").val();
        var topicitem=$("#tab-value").val();
        $(".topic-item-error").remove();
        $(".topic-error").remove();
        $(".reply-error").remove();
        if(topicitem==null || topicitem==="")
        {
          $("#tab-value").after('<span class="topic-item-error" style="color:red">Vui lòng chọn danh mục!</span>');
        }
        else if ($.trim(title).length==0) {
          $("#topicTitle").after('<span class="topic-error" style="color:red">Vui lòng nhập chủ đề!</span>');
        }
        // else if($.trim(text)===""){
        //   $("#updatetopic").after('<span class="reply-error">Mô tả không thể để trống!</span>');
        //   return false;
        // }
        else{
        var newData={
            id:$("#tid").val(),
            title:title,
            urlrewrite:slugify(title),
            content:content,
            item:$("#tab-value").val(),
            author:$("#uname").val(),
            createtime:new Date(),
            updateauthor:$("#uname").val(),
            updatetime:new Date(),
            updatepic:$("#upic").val(),
            __CSRF__:G_csrf
        }
        $.ajax({
            url:'/topic/create/doadd',
            data:newData,
            type:'POST',
            success:function(json){
              debugger
                if(json.errno===0){
                    window.location.href="/chu-de"
                }else{
                    alert(json.errmsg)
                }
            }
        })
      }
    })
    $(".user_small_avatar").on("mouseover",function(){
      var author=$(this).attr("data-author");
      alert(author);
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
