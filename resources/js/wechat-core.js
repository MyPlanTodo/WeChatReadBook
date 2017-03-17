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


}(Framework7, Dom7, Template7))