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
                jsonp:"cb",
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
//---------------轮播图-----------------
    var index = 0;
    var timer;
    var liArr = $(".slider-fade>li");

//触摸显示箭头导航
    $(".jd-slider").on("mouseover",function () {
        $(".jd-slider>div").show();
        clearInterval(timer);
    });
    $(".jd-slider").on("mouseout",function () {
        $(".jd-slider>div").hide();
        timer = setInterval(autoSilder,3000);
    });

    //点击左右导航切换图片
    $(".jd-slider .slider-fade-nav .prev").on("click",function () {
        index--;
        if( index < 0 ){
            index=liArr.length-1;
        }
        $(".slider-fade-index li").eq(index).addClass("active").siblings().removeClass("active");
        $(".slider-fade li").hide().eq(index).fadeIn(1000).siblings().fadeOut(1000);
    });
    $(" .jd-slider .slider-fade-nav .next").on("click",function () {
       autoSilder();
    });

    //点击原点索引换图
    $(".slider-fade-index li").on("mouseenter",function () {
        index = $(this).index();
        $(".slider-fade-index li").eq(index).addClass("active").siblings().removeClass("active");
        $(".slider-fade li").eq(index).stop().fadeIn(300).siblings().stop().fadeOut(300);
    })


    //使用定时器之前先关闭
    clearInterval(timer);
    //自动轮播
    timer = setInterval(autoSilder,1500);
        //切换图片函数
        function autoSilder() {
            index++;
            if(index == liArr.length){
                index = 0;
            }
            $(".slider-fade-index li").eq(index).addClass("active").siblings().removeClass("active");
            $(".slider-fade>li").eq(index).fadeIn(300).siblings().fadeOut(300);
        }
//---------------------------轮播图end----------------------
//-----------------------轮播图底下轮播图-------------------
var ulW = $(".today-r ul").width();
var liIndex = 0;
var timers;
    //鼠标触碰暂停轮播，离开自动轮播
$(".today").on("mouseenter",function () {
    $(".today>.slider-fade-nav").show();
    clearInterval(timers);
});
$(".today").on("mouseleave",function () {
        $(".today>.slider-fade-nav").hide();
    timers = setInterval(function () {autoPlay()},3000);
});
    //点击箭头导航手动切图
    $(".today>.slider-fade-nav .prev").on("click",function () {
        liIndex--;
        if(liIndex<0){
            liIndex = 2;
            $(".today-r").css({marginLeft:-ulW*3})
        }
        $(".today-r").animate({marginLeft:-ulW*liIndex})
    });
    $(".today>.slider-fade-nav .next").on("click",function () {
        autoPlay();
    });
    clearInterval(timers);
    //自动轮播
    timers = setInterval(function () {autoPlay()},3000);
    //轮播核心函数
    function autoPlay() {
            liIndex++;
            if(liIndex>3){
                liIndex=1;
                $(".today-r").css({marginLeft:0});
            }
            $(".today-r").animate({marginLeft:-ulW*liIndex})
    }


});

