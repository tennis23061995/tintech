$(function(){
    $("#savetag").click(function () {
        var newData={
            appid:$(".appid").val(),
            appkey:$(".appkey").val(),
            appcode: $(".appcode").val(),
            allowcomment:$('input[name=allowcomment]:checked').val(),
            __CSRF__:G_csrf
        }
        $.ajax({
            url:'/admin/system/commentedit',
            data:newData,
            type:'POST',
            success:function(json){
                if(json.errno===0){
                    alert("Lưu thành công！");
                    window.location.href="/admin/system/setcomment"
                }
            }
        })
    })

})
