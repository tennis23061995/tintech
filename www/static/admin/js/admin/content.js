/**
 * Created by livi on 16/4/19.
 */
$('.add-img-btn2 input[type="file"]').on('change', function () {
    var $this = $(this);
    var addimgBtn = $this.parent();

    if ($this.val()) {
        $this.upload({
            url: '/admin/content/uploadfile',
            data: { __CSRF__: G_csrf },
            success: function (result) {
                if (result) {
                    $("#editor").html(result.articlehtml);
                    var ainfo = result.ainfo || {};
                    $(".title").val(ainfo.title);
                    $(".author").val(ainfo.author);
                    $(".keywords").val(ainfo.keywords);
                    $(".abstract").val(encodeHTMLContent(ainfo.abstract));

                    var pic = ainfo.thumbnail;
                    var totop = ainfo.totop;
                    var torecom = ainfo.torecom;
                    var topicrecom = ainfo.topicrecom;

                    function tocheck(el, item) {
                        if (item === 1) {
                            $(el).attr("checked", true);
                        }
                    }
                    function encodeHTMLContent(str) {
                        if (str) {
                            return str.replace(/&quot;/g, '"').replace(/&#39;/g, "'s");
                        }
                    }
                    tocheck($("#totop"), totop);
                    tocheck($("#torecom"), torecom);
                    tocheck($("#topicrecom"), topicrecom);
                    if (result.errno >= 0) {
                        alert(result.errmsg)
                    }

                } else {
                    alert(result.errmsg)
                }
            },
            error: function (code, xhr, status, error) {
                console.log(error ? ('Tải lên không thành công: ' + error) : "Tải lên không thành công");
            }
        });
    }
});

//上传缩略图
$('.add-img-btn input[type="file"]').on('change', function () {
    var $this = $(this);
    var addimgBtn = $this.parent();

    if ($this.val()) {
        $this.upload({
            url: '/admin/content/upload',
            data: { __CSRF__: G_csrf },
            success: function (result) {
                if (result) {
                    $("#picUrl").val(result.path);
                    $('.show-img-upload .add-img-btn').css("background-image", 'url(/' + result.path + ')');
                } else {
                    console.log('Tải lên không thành công');
                }
            },
            error: function (code, xhr, status, error) {
                console.log(error ? ('Tải lên không thành công: ' + error) : "Tải lên không thành công");
            }
        });
    }
});

//预览/发布文章
$(function () {
    //预览文章
    $("#previewArticle").on('click', function () {
        var pid = $(this).attr("pid");
        if (pid === "") {
            dosubmit('/admin/content/doadd', 0, function (json) {
                if (json.errno === 0) {
                    $("#previewArticle").attr("pid", json.data.id);
                    $("#addArticle").attr("pid", json.data.id);
                    window.open("/preview/" + json.data.id, "_blank");
                }
            });
        } else {
            //更新文章状态
            dosubmit('/admin/content/doadd/', 0, function (json) {
                if (json.errno === 0) {
                    window.open("/preview/" + pid, "_blank");
                }
            })

        }
    })
    //发布文章
    $("#addArticle").on('click', function () {
        var pid = $(this).attr("pid");
        if (pid === "") {
            //直接发布
            dosubmit('/admin/content/doadd', 1, function (json) {
                if (json.errno === 0) {
                    if(json.data.titleexist){
                      alert("Bài viết tồn tại")
                    }
                    else{
                    alert("Lưu thành công!");
                    $("#previewArticle").attr("pid", json.data.id);
                    $("#addArticle").attr("pid", json.data.id);
                    window.location.href = '/admin/content';
                  }
                } else {
                    alert(json.errmsg)
                }
            })
        } else {
            //更新文章状态
            dosubmit('/admin/content/doadd/', 1, function (json) {
                if (json.errno === 0) {
                  if(json.data.titleexist){
                    alert("Bài viết tồn tại")
                  }
                  else{
                    alert("Lưu thành công!");
                    window.location.href = '/admin/content';
                  }
                } else {
                    alert(json.errmsg)
                }
            })
        }
    })
    //公用方法
    var dosubmit = function (httpUrl, ispublished, callback) {
        if (!$('#form-article-add').valid()) {
            return;
        }
        var totopVal = $("#totop").is(':checked') ? 1 : 0;
        var torecomVal = $("#torecom").is(':checked') ? 1 : 0;
        var topicrecomVal = $("#topicrecom").is(':checked') ? 1 : 0;
        var topicrecomVal = $("#topicrecom").is(':checked') ? 1 : 0;
        var allowcommentVal = $("#allowcomment").is(':checked') ? 1 : 0;
        var flag_aVal = $("#flag_a").is(':checked') ? 1 : 0;
        var html = CKEDITOR.instances['editor'].getData();
        var keywords=$("#keywords").val();
        keywords=keywords!=null?","+keywords.toString()+",":"";
        var content = $.trim(html);
        var newData = {
            id: $("#previewArticle").attr("pid"),
            title: $(".title").val(),
            urlrewrite: slugify($(".title").val()),
            abstract: $("#abstract").val(),
            content: content,
            picurl: $("#picUrl").val(),
            author: $("#author").val(),
            createtime: new Date(),
            totop: totopVal,
            torecom: torecomVal,
            topicrecom: topicrecomVal,
            flag_a: flag_aVal,
          //  tag: $("#tagselect").val(),
            item: $("#itemselect").val(),
            keywords: keywords,
            from: $(".from").val(),
            allowcomment: allowcommentVal,
            ispublished: ispublished,
            __CSRF__: G_csrf

        }
        $.ajax({
            url: httpUrl,
            data: newData,
            type: 'POST',
            success: callback
        })
    }
$("#btn-add-tags").on("click",function(){
  if($(".tags").val()=="")
  {
    alert("Từ khóa mới phải nhập");
    return;
  }
  var newData={
      tagname:$(".tags").val(),
      urlrewrite: slugify($(".tags").val()),
      __CSRF__:G_csrf
  }
  $.ajax({
      url:'/admin/tag/save',
      data:newData,
      type:'POST',
      success:function(json){
        console.log(json.data.data);
          if(json.errno===0){
            if(json.data.tagexist)
            {
              alert("Từ khóa đã tồn tại");
            }
            else {
              $("#keywords").append('<option value="'+json.data.data.id+'" selected>'+json.data.data.tagname+'</option>');
                alert("Thêm từ khóa thành công！");
            }
          }else{
              alert(json.errmsg)
          }
      }
  })
});
    $("#keywords").select2({
           minimumInputLength: 3,
           multiple: true,
           ajax: {
               type: "POST",
               url: '/admin/content/gettags',
               dataType: 'json',
               contentType: "application/json",
               delay: 250,
               data: function (params) {
                   return  JSON.stringify({
                       term: params.term,
                       __CSRF__: G_csrf
                   });
               },
               processResults: function (data) {
                   return {
                       results: $.map(data.data, function (item, i) {
                           return {
                               text: item.tagname,
                               id: item.id
                           }
                       })
                   };
               }
           },
       });


    //var editor = new wangEditor('editor');
    //editor.config.uploadParams = {
    //    __CSRF__:G_csrf
    //};
    //editor.config.emotions = {
    //    'default': {
    //        title: '默认',
    //        data: '/static/admin/emotions.data'
    //    }
    //};
    //editor.config.uploadImgFileName = 'thumb_img';
    //editor.config.uploadImgUrl = '/admin/content/uploadeditor';
    //// 表情
    //editor.create();
    var roxyFileman = '/admin/fileman/index';

    CKEDITOR.replace('editor', {
        language: 'en',
        filebrowserBrowseUrl: roxyFileman + '?type=video',
        filebrowserImageBrowseUrl: roxyFileman + '?type=image',
        removeDialogTabs: 'link:upload;image:upload'
    });

    $('.title').on('blur', function () {
        $('.urlrewrite').val(slugify($(this).val()));
    });
    var validator = $("#form-article-add").validate({
        rules: {
            'title': "required",
            'itemselect': "required"
        },
        messages: {
            'title': "Tiêu đề không được bỏ trống",
            'itemselect': "Danh mục không được bỏ trống"
        },
        onfocusout: false,
        invalidHandler: function (form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                validator.errorList[0].element.focus();
            }
        }
    });
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

})
