(function(){
    var Common = {
        data: {},
        DataInitial: function() {
            var aPairs, aTmp;
            var queryString = new String(window.location.search);
            queryString = queryString.substr(1, queryString.length);
            aPairs = queryString.split("&");
            for (var i = 0; i < aPairs.length; i++) {
                aTmp = aPairs[i].split("=");
                this.data[aTmp[0]] = aTmp[1];
            }
        },
        GetValue: function(key) {
            return this.data[key];
        }
    }
    window.Common=Common
}())
