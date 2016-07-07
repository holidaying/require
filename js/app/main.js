require.config({
	baseUrl:'./js/lib',
	paths:{
		zepto: 'zepto.min',
		config: 'config',
		cookie:'cookie',
		auth:'auth'
	},
	shim:{
		"cookie":{
			deps:['zepto'],
			exports:'$.fn'//这点很重要必须写成函数的对象名否则会出现很多问题
		}
	}
})

require(['zepto','auth'],function($,a)
{

a.Auth();
	// alert(a);
 //     var openid=a.cookie("333xfsdf","24234");
	// alert(Zepto.fn.cookie("333xfsdf"));
})
