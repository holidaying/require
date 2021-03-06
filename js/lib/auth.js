define(['zepto','cookie','config'], function($,a) {

    function Auth() {
        w=window||w;
        w.openid = a.cookie(mpappid + '_openid');
        w.expires_in = {
            expires: 7
        };
        w.Authorize = function(o) {
            this.mpappid = o && o.mpappid || mpappid; //mpappid
            this.scope = "snsapi_base"; //scope
            this.redirect_uri = domain_url + "api/mp/auth/snsapi_base_common"; //redirect_uri
            this.callBackPage = o && o.callBackPage || ""; //授权之后的回调页面
            this.param = ""; //微信的参数
            this.refer = window.location.href;
        }
        Authorize.prototype.authorize = function(fn) {

            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.mpappid + "&redirect_uri=" + encodeURIComponent(this.redirect_uri) + "&response_type=code&scope=" + this.scope + "&state=11" + + "#wechat_redirect";
            if (fn) {
                fn();
            }
        };
        Authorize.prototype.checkIsAuthorize = function() {
            if (a.cookie(mpappid + '_openid')) {
                return true;
            } else {
                return false;
            }
        };
        Authorize.prototype.getQueryParam = function(name) {
            var currentSearch = decodeURIComponent(location.search.slice(1));
            if (currentSearch != '') {
                var paras = currentSearch.split('&');
                for (var i = 0, l = paras.length, items; i < l; i++) {
                    items = paras[i].split('=');
                    if (items[0] === name) {
                        return items[1];
                    }
                }
                return '';
            }
            return '';

        };
        Authorize.prototype.jumpToUrl = function() {
            if (this.callBackPage) {
                window.location.href = this.callBackPage;
            }
        }

        Authorize.prototype.getParam = function() {
            var jsonobj = {};
            var currentSearch = decodeURIComponent(location.search.slice(1)).split('&');

            for (var i = 0, l = currentSearch.length, items; i < l; i++) {
                items = currentSearch[i].split('=');
                jsonobj[items[0]] = items[1];
            }
            this.param = encodeURIComponent(JSON.stringify(jsonobj));
        }
        Authorize.prototype.init = function(fn) {
            this.getParam();
            var that = this;
            if (!openid) {
                openid = that.getQueryParam("openid");
                if (!openid) {
                    that.authorize(function() {});
                } else {
                    openid && a.cookie(mpappid + '_openid', openid, expires_in);
                    if (fn) {
                        setTimeout(function() {
                            fn();
                        }, 50);
                    }
                }
            } else {
                a.cookie(mpappid + '_openid', openid, expires_in);
                if (fn) {
                    setTimeout(function() {
                        fn();
                    }, 50);
                }
            }
        }
        new Authorize().init();
    }
    return{
        Auth:Auth
    }

})
