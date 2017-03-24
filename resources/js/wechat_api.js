(function(Framework7, $$) {

	var url = "http://192.168.1.101:8080/api_service/core/";

	var URL_getBookList = url + "getBookList";
    var URL_getUserinfo = url + "getUserinfo";

	var request = function(data, url, success) {
		return $$.ajax({
			method: 'POST',
			data:data,
			url: url,
			success: success,
			error: function(xhr, status) {
                WeChat.hideIndicator();
                WeChat.addNotification({
					title: '提示',
					message: '连接服务器失败'
				});
			}
		})
	}


	wechat_api = {
        getBookList: function(data,success){
			return request(data,URL_getBookList, success)
		},
        getUserinfo: function(data,success){
            return request(data,URL_getUserinfo, success)
        }
	};
	window.WeChat_Api = wechat_api
}(Framework7, Dom7))