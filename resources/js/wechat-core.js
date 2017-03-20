/**
 * Created by Petty on 2017/3/17.
 */
(function(Framework7, $$, T7) {

    window.WeChat = new Framework7({
        template7Pages: true,
        precompileTemplates: true,
        swipePanel: "left",
        activeState: true,
        //navbar和toolbar自动隐藏
        hideNavbarOnPageScroll: false,
        hideToolbarOnPageScroll: true,
        modalButtonOk: '确认',
        modalButtonCancel: '取消',
        modalTitle: '提示',
        pushState:true
    });

    /*
     * -->判断是否为QQ浏览器如果“是”则取消动画效果	ps:QQ浏览器简直可以称为国产最水浏览器，移动界的IE6
     * -->判断是否为QQ浏览器如果“是”则响应延时时间为0ms，如果为“否”，则设置300ms等待时间，防止出现切换页面动画效果卡顿(base64转码图片时的效能问题)
     * -->300ms 页面切换动画默认时间
     */
    var _timeOut = 300;
    var _flag = true;
    var _browserUserAgent = window.navigator.userAgent;
    console.log(_browserUserAgent);
    /*if(_browserUserAgent.indexOf("QQBrowser") != -1) {
     _flag = false;
     _timeOut = 0;
     }*/

    var mainView = WeChat.addView('.view-main', {
        animateNavBackIcon: true,
        //关闭页面切换动画，目标浏览器为高性能时可以开放
        animatePages: _flag,
        pushStateNoAnimation: _flag
    })

    var mySwiper = WeChat.swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        speed: 400,
        autoplay: 6000
    });

    $$(document).on("click", ".card", function() {
        var modal = WeChat.modal({
            afterText:  '<div class="card card-header-pic wx_popup_card popup_header_pic">'
            +'<div style="background-image:url(resources/img/book/book_3.jpeg)" valign="bottom" class="card-header color-white no-border"></div>'
            +'<div class="card-content">'
            +'<div class="card-content-inner">噫吁嚱，危乎高哉！蜀道之难，难于上青天！蚕丛及鱼凫，开国何茫然！尔来四万八千岁，不与秦塞通人烟。西当太白有鸟道，可以横绝峨眉巅。地崩山摧壮士死，然后天梯石栈相钩连。上有六龙回日之高标，下有冲波逆折之回川。黄鹤之飞尚不得过，猿猱欲度愁攀援。青泥何盘盘，百步九折萦岩峦。扪参历井仰胁息，以手抚膺坐长叹。'
            +'问君西游何时还？畏途巉岩不可攀。但见悲鸟号古木，雄飞雌从绕林间。又闻子规啼夜月，愁空山。蜀道之难，难于上青天，使人听此凋朱颜！连峰去天不盈尺，枯松倒挂倚绝壁。飞湍瀑流争喧豗，砯崖转石万壑雷。其险也如此，嗟尔远道之人胡为乎来哉！'
+'剑阁峥嵘而崔嵬，一夫当关，万夫莫开。所守或匪亲，化为狼与豺。朝避猛虎，夕避长蛇；磨牙吮血，杀人如麻。锦城虽云乐，不如早还家。蜀道之难，难于上青天，侧身西望长咨嗟！</div>'
        +'</div>'
        +'</div>',
            buttons: [
                {
                    text: '👍'
                },
                {
                    text: '查看更多',
                    bold: true,
                    onClick: function () {
                        WeChat.alert('Thanks! I know you like it!')
                    }
                },
                {
                    text: '❌',
                    bold: true,
                    onClick: function () {
                        WeChat.alert('Thanks! I know you like it!')
                    }
                }
            ]
        })
    });

}(Framework7, Dom7, Template7))