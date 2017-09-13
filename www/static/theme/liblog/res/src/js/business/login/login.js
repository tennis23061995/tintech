    //极验验证码
    $(function () {
        var handlerEmbed = function (captchaObj) {

            $("#dologin").click(function (e) {
                var validate = captchaObj.getValidate();
                if (!validate) {
                    $("#notice").addClass("show").removeClass("hide");
                    setTimeout(function () {
                        $("#notice").addClass("hide").removeClass("show");
                    }, 2000);
                    e.preventDefault();
                }
                if (!validate) {
                    $("#captcha").append('<small class="help-block alert alert-danger checkright">请先拖动验证码到相应位置！</small>')
                    setTimeout(function () {
                        $("#captcha").find(".alert-danger").remove();
                    }, 2000);
                    e.preventDefault();
                }
            });
            // 将验证码加到id为captcha的元素里
            captchaObj.appendTo("#captcha");
            captchaObj.onReady(function () {
                $("#wait")[0].className = "hide";
            });
            captchaObj.onSuccess(function () {
              var validate = captchaObj.getValidate();
              $("#challenge").val(validate.geetest_challenge);
              $("#seccode").val(validate.geetest_seccode);
              $("#validate").val(validate.geetest_validate);
            })
        };
        $.ajax({
            // 获取id，challenge，success（是否启用failback）
            url: "/home/register/geetest?t=" + (new Date()).getTime(), // 加随机数防止缓存
            data:{__CSRF__:G_csrf},
            type: "get",
            dataType: "json",
            success: function (data) {
                // 使用initGeetest接口
                // 参数1：配置参数
                // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
                initGeetest({
                    gt: data.gt,
                    challenge: data.challenge,
                    product: "float", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                    offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                }, handlerEmbed);
            }
        });
    })

    //提交登陆表单
    $("#dologin").click(function(){
            // 初始化
            reset();
            var form=$("#loginForm").validate({
              error:function(obj,error){//自定义错误提示
                showError(obj,error);
                obj.one('keyup',function(){
                  $(this).parents('.form-group').removeClass('has-error has-feedback').find('.errorinfo,.glyphicon-remove').addClass('hidden');
                });
              },
              submitBtn:{
                flag:true,
              }
            });
            if(form){
              //验证通过
              var newData={
                  email:$("#emaillg").val(),
                  password:$("#passwordlg").val(),
                  __CSRF__:$("#csrf").val()
              }
              //提交请求

                $.ajax({
                    url:'/home/login/dologin',
                    data:newData,
                    type:'POST',
                    success:function(json){
                        if(json.errno===0){
                          window.location.href=window.location.href;
                            //window.location.href="/personal/@"+json.uname
                        }else{
                            alert(json.errmsg);
                        }
                    }
                })

              //提交请求
            }
            return false
    })

    // 校验邮箱
    $("#emaillg").on('blur',function(){
      var _this=$(this);
          reset();
          _this.next(".isright").remove();
          var val=_this.val();
          console.log(val.length);
					if(val==null || val.length==0){
            showError(_this,'Hãy nhập!');
            return false
          }
    })
    // 重置
    function reset(){
      $(".register-item").removeClass("has-error");
      $('.alert-danger').remove();
    }
    function showError(obj,errmsg){
      var errorEl='<small class="help-block alert alert-danger checkright">'+errmsg+'</small>';
          obj.parents('.register-item').addClass('has-error').after(errorEl);
    }

    //回车触发提交表单
    $(document).keyup(function(event){
      if(event.keyCode ==13){
        $("#dologin").trigger("click");
      }
    });


    //login facebook
    window.fbAsyncInit = function () {
          FB.init({
              appId: '1239269852779405',
              status: true, // check login status
              cookie: true, // enable cookies to allow the server to access the session
              xfbml: true, // parse XFBML
              oauth: true // enable OAuth 2.0
          });
      };
      (function () {
          var e = document.createElement('script'); e.async = true;
          e.src = document.location.protocol +
          '//connect.facebook.net/en_US/all.js';
          document.getElementById('fb-root').appendChild(e);
      }());

      function loginByFacebook() {
          FB.login(function (response) {
              if (response.authResponse) {
                  FacebookLoggedIn(response);
              } else {
                  console.log('User cancelled login or did not fully authorize.');
              }
          }, { scope: 'user_birthday,user_about_me,user_hometown,user_location,email,publish_stream' });
      }

      function FacebookLoggedIn(response) {
          var loc = '/home/login/loginfacebook';
          if (loc.indexOf('?') > -1)
              window.location = loc + '&authprv=facebook&access_token=' + response.authResponse.accessToken+"&href="+window.location.href;
          else
              window.location = loc + '?authprv=facebook&access_token=' + response.authResponse.accessToken+"&href="+window.location.href;
      }


      var OAUTHURL = 'https://accounts.google.com/o/oauth2/auth?';
          var VALIDURL = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
          var SCOPE = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
          var CLIENTID = '4499088085-tpggeml5tn5ddfi9igkvar98l5aj2imp.apps.googleusercontent.com';
          var REDIRECT ='http://localhost:8361';
          var LOGOUT = 'http://accounts.google.com/Logout';
          var TYPE = 'token';
          var _url = OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
          var acToken;
          var tokenType;
          var expiresIn;
          var user;
          var loggedIn = false;
          function login()
          {

              var win = window.open(_url);
              var pollTimer = window.setInterval(function () {
                  try
                  {
                      console.log(win.document.URL);
                      if (win.document.URL.indexOf(REDIRECT) != -1)
                      {
                          window.clearInterval(pollTimer);
                          var url = win.document.URL;
                          acToken = gup(url, 'access_token');
                          tokenType = gup(url, 'token_type');
                          expiresIn = gup(url, 'expires_in');
                          win.close();
                          validateToken(acToken);
                      }
                  }
                  catch (e)
                  {

                  }
              }, 500);
          }
          function validateToken(token)
          {
            window.location="http://localhost:8361/home/login/logingoogle?access_token="+token+"&href="+window.location.href;
            // alert(token)
            //   $.ajax(
            //       {
            //       url: VALIDURL + token,
            //       data: null,
            //       success: function (responseText)
            //       {
            //           getUserInfo();
            //           loggedIn = true;
            //           $('#loginText').hide();
            //           $('#logoutText').show();
            //       },
            //       dataType: "jsonp"
            //   });
          }
          // function getUserInfo()
          // {
          //     $.ajax({
          //         url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + acToken,
          //         data: null,
          //         success: function (resp)
          //         {
          //             user = resp;
          //             console.log(user);
          //             $('#uName').text('Welcome ' + user.name);
          //             $('#imgHolder').attr('src', user.picture);
          //         },
          //         dataType: "jsonp"
          //     });
          // }
          //credits: http://www.netlobo.com/url_query_string_javascript.html

          function gup(url, name)
          {
              namename = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
              var regexS = "[\\#&]" + name + "=([^&#]*)";
              var regex = new RegExp(regexS);
              var results = regex.exec(url);
              if (results == null)
                  return "";
              else
                  return results[1];
          }
          function startLogoutPolling()
          {
              $('#loginText').show();
              $('#logoutText').hide();
              loggedIn = false;
              $('#uName').text('Welcome ');
              $('#imgHolder').attr('src', 'none.jpg');
          }
          function PopupCenter(url, title, w, h) {
              // Fixes dual-screen position                         Most browsers      Firefox
              var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
              var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

              var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
              var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

              var left = ((width / 2) - (w / 2)) + dualScreenLeft;
              var top = ((height / 2) - (h / 2)) + dualScreenTop;
              var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

              // Puts focus on the newWindow
              if (window.focus) {
                  newWindow.focus();
              }
          }
