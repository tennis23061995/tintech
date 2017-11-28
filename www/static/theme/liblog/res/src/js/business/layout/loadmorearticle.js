var result=true;
$("body").on("click",".btn-loadmore", function (e) {
  e.preventDefault();
  var newData={
      reject:$(".btn-loadmore").attr("data-reject"),
      datais:$(".btn-loadmore").attr("data-is"),
      isid:$(".btn-loadmore").attr("data-isid"),
      __CSRF__:G_csrf
  }
  if(result)
  {
  $.post("/home/index/getarticle",newData, function (data) {
    console.log(data);
    result=false;
    if(data.errno==0)
    {
    var lstarticle=data.data.articles;
    var adata=$(".btn-loadmore").attr("data-reject");
    if(lstarticle.length>0){
    for (var i = 0; i < lstarticle.length; i++) {
      adata=adata+",";
      var content='<div class="item"><div class="item-left"><a href="/'+lstarticle[i].itemurlrewrite+'-'+lstarticle[i].item+'/'+lstarticle[i].urlrewrite+'-'+lstarticle[i].id+'"><img src="/'+lstarticle[i].picurl+'" title="'+lstarticle[i].title+'"></a></div><div class="item-right"><p class="title"><a href="'+lstarticle[i].itemurlrewrite+'-'+lstarticle[i].item+'/'+lstarticle[i].urlrewrite+'-'+lstarticle[i].id+'">'+lstarticle[i].title+'</a></p><p class="summary">'+lstarticle[i].abstract+'</p><p class="category"><a style="color: #3498db;" href="/'+lstarticle[i].itemurlrewrite+'-'+lstarticle[i].item+'">'+lstarticle[i].itemname+'</a><span class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> <time class="timeago" datetime="'+getDate(lstarticle[i].createtime).toString('dd-MMM-yyyy')+'"></time></span></p></div><div class="clearfix"></div></div>';
      $(".topnews").append(content);
      adata+=lstarticle[i].id;
    }
    $('.timeago').timeago();
    $(".btn-loadmore").attr("data-reject",adata);
    result=true;
  }else {
    $(".btn-loadmore").html("Không còn bài viết nào nữa")
  }
  }
  });
}
});
Number.prototype.padLeft = function(base,chr){
   var  len = (String(base || 10).length - String(this).length)+1;
   return len > 0? new Array(len).join(chr || '0')+this : this;
}
function getDate(da)
{
var d=new Date(da);
  var date=[d.getFullYear(),(d.getMonth()+1).padLeft(),
                    d.getDate().padLeft()].join('-')+
                    ' ' +
                  [ d.getHours().padLeft(),
                    d.getMinutes().padLeft(),
                    d.getSeconds().padLeft()].join(':');
return date;
}
