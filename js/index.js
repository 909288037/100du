$(window).ready(function () {
    //点击关闭横幅广告栏
    $(".close").on("click",function () {
        $(".top-ba").hide();

    });

//    搜索栏实时搜索
//    默认获取焦点
    $(".search>input").focus();
        //判断搜索栏内容
        var nowValue ;
        var myData;
        //监听input值，实时更新
        $(".search>input").bind('input propertychange', function () {
            nowValue = $.trim(this.value);
            console.log(nowValue);
            if(nowValue != ""){
                $(".search-nav").show();
            }else {
                $(".search-nav").hide();
            }
            // console.log(nowValue);
            $.ajax({
                url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
                data:{wd:nowValue},
                dataType:"jsonp",
                // jsonp:"cb",
                success:function(data){
                    $(".search-nav li").remove();
                    myData = data.s;
                    // console.log(myData);
                    for (var i = 0; i < myData.length; i++) {
                        if(myData[i] == undefined){
                            return ;
                        }
                        $(".search-nav").append("<li>"+myData[i]+"</li>")
                    }
                }


            })
            $(".search-style").on("click",function () {
                window.open('https://www.baidu.com/s?wd='+nowValue)
            })
            $(".search-nav").on("click","li",function () {
                window.open('https://www.baidu.com/s?wd='+this.innerHTML);

                // console.log(this.innerHTML);
            })
        });

})

