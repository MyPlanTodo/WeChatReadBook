/**
 * Created by Petty on 2017/3/17.
 */
(function (Framework7, $$, T7, api, base64, common) {

    window.WeChat = new Framework7({
        template7Pages: true,
        precompileTemplates: true,
        swipePanel: "left",
        activeState: true,
        //navbar和toolbar自动隐藏
        hideNavbarOnPageScroll: false,
        hideToolbarOnPageScroll: false,
        modalButtonOk: '确认',
        modalButtonCancel: '取消',
        modalTitle: '提示',
        pushState: true,
        //关闭自动初始化
        init: false
    });

    /*
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

    window.localStorage.clear();
    common.DataInitial();
    WeChat.showIndicator();
    var wx_id = common.GetValue("uid");
    var data = {
        "wx_id": common.GetValue("uid")
    }
    if (wx_id != undefined && wx_id != '') {
        window.localStorage.setItem("USER_OPENID", wx_id);
    }
    api.getUserinfo(data, function (data) {
        if (data != "Don't Find User") {
            var data = JSON.parse(data);
            window.localStorage.setItem("USER_XM", data.result.xm);
            window.localStorage.setItem("USER_SFZH", data.result.sfzhm);
            window.localStorage.setItem("USER_PHONE", data.result.sjhm);
            window.localStorage.setItem("USER_AREA", data.result.area1);
        } else {
            WeChat.alert("您还未完成实名制信息，请通过微信菜单 工会服务->绑定个人信息完善实名制信息。");
        }
        WeChat.hideIndicator();
    })

    function addLocalData(data) {
        if (data.result.length > 0) {
            for (i = 0; i < data.result.length; i++) {
                window.localStorage.setItem(data.result[i].tsm5, JSON.stringify(data.result[i]))
            }
        }
    }

    function initBookTabPage(tabName) {
        var _index = 2;
        var loading = false;
        var data = {
            "pageNo": 1,
            "tabName": tabName
        };
        api.getBookList(data, function (data) {
            var data = JSON.parse(data);
            addLocalData(data);
            if (data.result.length < 9) {

                var _temp = {};
                if (data.result.length % 2 == 0) {
                    data.result.push(_temp);
                }

                WeChat.detachInfiniteScroll($$('.infinite-scroll'));
                $$('.infinite-scroll-preloader').hide();
                loading = false;
            }
            $$(".page[data-page='index'] #" + tabName + " .row").html(
                T7.templates.BookListTemplate(data.result)
            )
        })
        //上拉加载更多
        var infContext = $$("#" + tabName + "");
        infContext.on('infinite', function () {
            if (loading) return;
            loading = true;
            var data = {
                "pageNo": _index,
                "tabName": tabName
            };
            api.getBookList(data, function (data) {
                var data = JSON.parse(data);
                var _temp = {};
                addLocalData(data);
                if (data.result.length == 0) {
                    // 加载完毕，则注销无限加载事件，以防不必要的加载
                    WeChat.detachInfiniteScroll($$("#" + tabName + " .infinite-scroll"));
                    // 删除加载提示符
                    $$("#" + tabName + " .infinite-scroll-preloader").hide();
                    loading = false;
                    return;
                } else {
                    if (data.result.length % 2 == 0) {
                        data.result.push(_temp);
                    }
                }
                $$(".page[data-page='index'] #" + tabName + " .row").append(
                    T7.templates.BookListTemplate(data.result)
                )
                _index = _index + 1;
                loading = false;
            })
        })
    }

    WeChat.onPageInit('index', function (page) {
        initBookTabPage("tab_politics");
    })

    WeChat.init();

    $$('.showTab_politics').on('click', function () {
        WeChat.showTab('#tab_politics');
    });

    //声明全局变量控制保证第一次加载后不再重复加载
    showTab_history = true;
    $$('.showTab_history').on('click', function () {
        WeChat.showTab('#tab_history');
        if (showTab_history) {
            initBookTabPage("tab_history");
            showTab_history = false;
        }
    });

    showTab_art = true;
    $$('.showTab_art').on('click', function () {
        WeChat.showTab('#tab_art');
        if (showTab_art) {
            initBookTabPage("tab_art");
            showTab_art = false;
        }
    });

    showTab_finance = true;
    $$('.showTab_finance').on('click', function () {
        WeChat.showTab('#tab_finance');
        if (showTab_finance) {
            initBookTabPage("tab_finance");
            showTab_finance = false;
        }
    });

    showTab_juvenile = true;
    $$('.showTab_juvenile').on('click', function () {
        WeChat.showTab('#tab_juvenile');
        if (showTab_juvenile) {
            initBookTabPage("tab_juvenile");
            showTab_juvenile = false;
        }
    });

    showTab_more = true;
    $$('.showTab_more').on('click', function () {
        WeChat.showTab('#tab_more');
        if (showTab_more) {
            initBookTabPage("tab_more");
            showTab_more = false;
        }
    });

    /*
     * 处理ios浏览器点击无效bug
     * 针对safari
     * 将点击事件添加到全局防止事件冒泡无效*/
    $$(document).on("click", "body", function () {
    })

    $$(document).on("click", ".page-content .card", function () {

        var card = $$(this);
        var data = JSON.parse(window.localStorage.getItem(card.find("input").val()));
        //resources/img/book/book_3.jpeg
        var modal = WeChat.modal({
            afterText: '<div class="card card-header-pic wx_popup_card popup_header_pic">'
            + '<div style="background-image:url(' + data.picture + ')" valign="bottom" class="card-header color-white no-border"></div>'
            + '<div class="card-content">'
            + '<div class="card-content-inner">' + data.context + '</div>'
            + '</div>'
            + '</div>',
            buttons: [
                {
                    text: '👍',
                    bold: true,
                    onClick: function () {
                        var wx_id = window.localStorage.getItem("USER_OPENID");
                        if (wx_id != null) {
                            var post_data = {
                                "tsm5": card.find("input").val(),
                                "openid":wx_id
                            };
                            api.updateBookInfo(post_data, function (data_temp) {
                                var data_temp = JSON.parse(data_temp);
                                if (data_temp.result==true) {
                                    var _html = "" + (Number($$("#like_num").html()) + Number(1)) + "";
                                    card.find("#like_num").html(_html);
                                    WeChat.alert("投票成功！");
                                } else {
                                    WeChat.alert("当日投票次数达到上限！");
                                }
                            });
                        } else {
                            WeChat.alert("您还未完成实名制信息，暂时无法进行投票操作，请通过微信菜单 工会服务->绑定个人信息完善实名制信息后再进行投票。");
                        }
                    }
                },
                {
                    text: '查看更多',
                    bold: true,
                    onClick: function () {
                        WeChat.alert("投票活动还未结束，结束后将开放该功能。");
                    }
                },
                {
                    text: '❌',
                    bold: true,
                    onClick: function () {

                    }
                }
            ]
        })
    });

}(Framework7, Dom7, Template7, WeChat_Api, Base64, Common))