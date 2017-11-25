var $image = $("body").find("img[data-src]");
if($image.length>0){
for(var i=0;i<$image.length;i++)
{
	$image.eq(i).attr("src", $image.eq(i).attr("data-src"));
}
}
