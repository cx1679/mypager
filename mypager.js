/***
<div class="pager clear" id="pager" style="padding-left:40px;" 

显示页码：page="<s:property value="#request.classpage.page"/>" 
总页数：pagecount="<s:property value="#request.classpage.pagecount"/>" 
总记录数：allcount="<s:property value="#request.classpage.allcount"/>" 
提交方式 form、ajax：type=""
翻页提交的form action：action="doclist.action<s:if test="#request.column != null">?colid=<s:property value="#request.column.colid" /></s:if>"
 >
</div>
***/
function MyPagerInitAndLoad(){
  
  pagerInit();

       //页码点击
	   $(".page-number.link:not(.pgCurrent)").click(function(){
	      GoToPage($(this).html());
	   });
	   //指定页数跳转
	   $("#enter").click(function(){
	      GoToPage($("#page").val());
	   });
	   //首页点击   
	   $(".pgNext.link.first:not(.first-empty)").click(function(){
	      GoToPage(1);
	   });
	   //上一页点击    
	   $(".pgNext.link.pre:not(.pre-empty)").click(function(){
	      GoToPage(Number($("#pager").attr("page")) - Number(1));
	   });
	   //下一页点击 
	   $(".pgNext.link.next:not(.next-empty)").click(function(){
	      GoToPage(Number($("#pager").attr("page")) + Number(1));
	   }); 
}
$("document").ready(function(){
       if($("#pager").attr("type") == "form"){
          //初始化翻页代码
          MyPagerInitAndLoad();
       }
});

function pagerInit(){
	   if($("#pager").length > 0){
	      var npage = $("#pager").attr("page");
	      var pagecount = $("#pager").attr("pagecount");
	      if(Number(pagecount) > 1){//总页数大于1，否则不需要显示翻页样式
	      var str = "";
	      //（1）先添加任何情况下都一样的代码
	      if($("#pager").attr("type") == "form"){
	         str += '<form id="pager_form" action="' + $("#pager").attr("action") + '" method="post" >';
	      }
	         str += '<ul><li class="recordCount">总数目:' + $("#pager").attr("allcount") + '</li>';
	         //（2）首页、上一页 判断当前页面的位置
	         if(Number(npage) > 1){
	            str += '<li class="pgNext link first">首页</li>';
	            str += '<li class="pgNext link pre">上一页</li>';
	         }else {
	            str += '<li class="pgNext link first first-empty">首页</li>';
	            str += '<li class="pgNext link pre pre-empty">上一页</li>';
	         }
	         //（3）中间的页码、....、最后一页 分两种情况总页数在 11以内 和大于11的
	         if(Number(pagecount) <= Number(11)){
	         //总页数11 以内
	            for(var i = 1; i <= pagecount; i++){
	               if(i == npage){
	                  str += '<li class="page-number link pgCurrent">' + i + '</li>';
	               }else str += '<li class="page-number link">' + i + '</li>';
	            }
	         }else {
	         //总页数大于11的 最小12
	           //先添加前半部分 分两种情况：1、当前页码<5  2、当前页码>=5
	           if(Number(npage) < Number(5)){
	           //当前页码<5，先添加前9页
	              for(var i = 1; i <= 9; i++){
	               if(i == npage){
	                  str += '<li class="page-number link pgCurrent">' + i + '</li>';
	               }else str += '<li class="page-number link">' + i + '</li>';
	              }
	              //添加 ...和最后一页
	              str += '<li class="text">...</li>';
                  str += '<li class="page-number link page-number-last">'+ pagecount +'</li>';
	           }else {
	              //当前页码>=5
	              //分两种情况：1、npage+4<pagecount  2、npage+4>=pagecount
	              if(Number(npage)+5 < Number(pagecount)){
	              // 1、npage+4<pagecount
	                for(var i = (Number(npage)-4); i <= (Number(npage)+3); i++){
		               if(i == npage){
		                  str += '<li class="page-number link pgCurrent">' + i + '</li>';
		               }else str += '<li class="page-number link">' + i + '</li>';
	                }
	                //添加 ...和最后一页
	                str += '<li class="text">...</li>';
                    str += '<li class="page-number link page-number-last">'+ pagecount +'</li>';
	              }else {
	              // 2、npage+4>=pagecount
	                 for(var i = (Number(pagecount)-9); i <= Number(pagecount); i++){
		               if(i == npage){
		                  str += '<li class="page-number link pgCurrent">' + i + '</li>';
		               }else str += '<li class="page-number link">' + i + '</li>';
	                }
	              }
	           }
	         }
	         //（4）下一页、尾页 判断当前页面位置
	         if(Number(npage) < Number(pagecount)){
	            str += '<li class="pgNext link next">下一页</li>';
	            //str += '<li class="pgNext link first">尾页</li>';
	         }else {
	            str += '<li class="pgNext link next next-empty">下一页</li>';
	            //str += '<li class="pgNext link first first-empty">尾页</li>';
	         }
	         //（5）跳转
	         str += '<li class="text quickPager" style="margin-right:0px;">';
	         str += '<span style="float:left;">第</span>';
	         str += '<div id="chatpage">';
	         str += '<input value="'+ npage +'" name="page" class="pagenum fl" id="page" style="float:left">';
	         str += '<a href="javascript:void(0)" class="enter" id="enter">跳转</a>';
	         str += '</div>';
	         str += '<span class="fl" >&nbsp;/'+ pagecount +'&nbsp;页</span>';
	         str += '</li>';
	         
	         //结束标签
	         str += "</ul>";
	         if($("#pager").attr("type") == "form"){
	            str += "</form>";
	         }
	         $("#pager").html(str);
	      }
	   } else {alert("空");}
	}
	
	//跳转到指定页数的函数
	function GoToPage(page){
	   //先判断要跳转的页数为数字
	   if(parseInt(page)!=page){
	      alert("请输入数字！");
	   }else{
	      //判断数字>0且<pagecount
	      if(Number(page) > 0 && Number(page) <= Number($("#pager").attr("pagecount")) ){
	         if($("#pager").attr("type") == "form"){
	            $("#page").attr("value",page);
	            $("#pager_form").submit();
	         }
	         if($("#pager").attr("type") == "ajax"){
	            eval($("#pager").attr("action")+"("+ page +")");
	         }
	      }else alert("请输入1至"+$("#pager").attr("pagecount")+"的页码值！");
	   }
	}
	
	
	 
