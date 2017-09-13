/**
 * Created by livi on 16/4/19.
 */

    // var editor = new wangEditor('editor');
    //     editor.config.menus = [
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
    //  ];
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
    // // 表情
    // editor.create();

    var roxyFileman = '/admin/fileman/index';

    CKEDITOR.replace('editor', {
        language: 'en',
        filebrowserBrowseUrl: roxyFileman + '?type=video',
        filebrowserImageBrowseUrl: roxyFileman + '?type=image',
        removeDialogTabs: 'link:upload;image:upload'
    });
    var oneclick=true;
    //添加回复
    $("body").on("click","#savetopic",function(){
        var html = CKEDITOR.instances['editor'].getData();
        // var content = $.trim(html);
        var text =  $(html).text();
        if($.trim(text)===""){
          $(".reply-error").remove();
          $("#savetopic").after('<span class="reply-error">Trả lời không để trống!</span>');
          return false;
        }else{
          $(".reply-error").remove();
          var newData={
              tid:$("#tid").val(),
              title:$("#replytitle").val(),
              comment:text,
              oldcomment:html,
              pic:$("#replypic").val(),
              author:$("#replyauthor").val(),
              nickname:$("#replynickname").val(),
              createtime:new Date(),
              __CSRF__:G_csrf
          }
          if(oneclick)
          {
          oneclick=false;
          $.ajax({
              url:'/home/index/savereply',
              data:newData,
              type:'POST',
              success:function(json){
                  if(json.errno===0){
                    oneclick=true;
                       window.location.reload(true);
                  }else{
                      alert(json.errmsg)
                  }
              }
          })
        }
        }
    })
    // 回复操作
  $(".reply_item").delegate('.reply2_btn','click',function(){
    if($(".reply-region").has("#saveedittopic"))
    {
      $("#saveedittopic").attr("id","savetopic");
    }
    var rname=$(this).attr("rname");
    var rnickname=$(this).attr("rnickname");
    var reply=$(this).parents(".reply_item").find(".markdown-text").html();
    console.log(reply)
    var html='<a href="/personal/@'+rname+'" target="_blank">@'+rnickname+'</a> '+reply;
    CKEDITOR.instances['editor'].setData(html);
    var offsetTop=$("#createreply").offset().top;
    $("html,body").animate({
        scrollTop: offsetTop
    })
  })
  $(".reply_item").delegate('.edit2_btn','click',function(){
    if($(".reply-region").has("#savetopic"))
    {
      $("#savetopic").attr("id","saveedittopic");
      $("#saveedittopic").attr("rid",$(this).attr("rid"));
    }
    var reply=$(this).parents(".reply_item").find(".markdown-text").html();
    CKEDITOR.instances['editor'].setData(reply);
    var offsetTop=$("#createreply").offset().top;
    $("html,body").animate({
        scrollTop: offsetTop
    })
  })
  // like操作
  // $(".replylist").delegate('.reply_item','mouseover',function(){
  //   $(this).find(".fa-thumbs-o-up").removeClass("invisible");
  // })
  // $(".replylist").delegate('.reply_item','mouseout',function(){
  //   $(this).find(".fa-thumbs-o-up").addClass("invisible");
  // })

  // 顶一下
  $(".replylist").delegate('.fa-thumbs-o-up','click',function(){
    var _this=$(this);
    var newData={
      id:$(this).attr("rid"),
      likers:$(this).attr("login"),
      // likers:'bill',
      __CSRF__:G_csrf
    }
    $.ajax({
        url:'/home/index/postlike',
        data:newData,
        type:'POST',
        success:function(json){
            if(json.errno===0){
              var el=_this.parent().find(".likeCount");
              if(json.data.likeCount===0){
                _this.removeClass("haslike");
                el.html("");
              }else{
                el.html(json.data.likeCount);
                _this.addClass("haslike");
              }
                // window.location.href="/topic/item/"+$("#tid").val();
            }else{
                alert(json.errmsg)
            }
        }
    })
  })

  // 删除回复
  $(".replylist").delegate('.fa-trash','click',function(){
    var _this=$(this);
    var newData={
      id:$(this).attr("rid"),
      tid:$(this).attr("tid"),
      __CSRF__:G_csrf
    }
    var r = confirm("Bạn chắc chắn muốn xóa không？");
    if (r) {
      $.ajax({
          url:'/home/index/removereply',
          data:newData,
          type:'POST',
          success:function(json){
              if(json.errno===0){
                  _this.parents(".reply_item").remove();
                  var number=parseInt($(".replylist .col_fade").text().replace(/[^0-9\.]/g, ''))-1;
                  if(number=="0"){
                    $(".replylist .col_fade").parent().remove();
                  }
                  else {
                    $(".replylist .col_fade").text(number+" bình luận");
                  }
              }else{
                  alert(json.errmsg)
              }
          }
      })
    }
  })

  // 删除主题
  $("#removeItem").on('click',function(){
    var _this=$(this);
    var newData={
      id:$(this).attr("rid"),
      __CSRF__:G_csrf
    }
    var r = confirm("确定删除？");
    if (r) {
      $.ajax({
          url:'/topic/create/removeitem',
          data:newData,
          type:'POST',
          success:function(json){
            debugger
              if(json.errno===0){
                  window.location.href="/topic";
              }else{
                  alert(json.errmsg)
              }
          }
      })
    }
  })

//编辑回复提交
  $("body").on("click","#saveedittopic",function(){
    var html = CKEDITOR.instances['editor'].getData();;
    var text =  $(html).text();
    var newtext =  $(html).text();
    var newData={
      id:$(this).attr("rid"),
      tid:$("#tid").val(),
      title:$("#replytitle").val(),
      comment:newtext,
      oldcomment:html,
      pic:$("#replypic").val(),
      author:$("#replyauthor").val(),
      nickname:$("#replynickname").val(),
      createtime:new Date(),
      __CSRF__:G_csrf
    }
    // alert(text);
    if($.trim(text)===""){
      $(".reply-error").remove();
      $("#saveedittopic").after('<span class="reply-error">Trả lời không để trống!</span>');
      return false;
    }else{
      $.ajax({
          url:'/home/index/savereply',
          data:newData,
          type:'POST',
          success:function(json){
            debugger
              if(json.errno===0){
                   window.location.reload(true);
              }else{
                  alert(json.errmsg)
                  window.location.href="/topic";
              }
          }
      })
    }
  })
