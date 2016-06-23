define(function(require, exports, module) {
	/*require 引入需要的模块如jquery等
	var $ = require('./jquery');*/
	/*exports可以把方法或属性暴露给外部*/
	exports.name = 'util';
	module.exports = {
		/*
		 * get方式请求数据。返回的JSON要符合规范。
		 * 引号不能去掉。完整写法：{"key","value"}
		 */
		GetJson: function(url, datas, callback) {
			$.ajax({
				url: url,
				type: "GET",
				data: "_=" + (new Date()).getTime() + (datas == null || datas == "" ? "" : ("&" + datas)),
				cache: false,
				dataType: "json",
				beforeSend: function(xhr) {
					xhr.overrideMimeType("text/plain; charset=utf-8");
				},
				success: function(json) {
					callback("success", json);
				},
				error: function(e) {
					callback("error", {
						"flag": false,
						"errmsg": "Call service failed！"
					});
				}
			});
		},
		/*
		 * post方式提交数据，适用于大数据提交。返回的JSON要符合规范。
		 * 引号不能去掉。完整写法：{"key" , "value"}
		 */
		PostJson: function(url, datas, callback) {
			$.ajax({
				url: url,
				type: "POST",
				data: "_=" + (new Date()).getTime() + (datas == null || datas == "" ? "" : ("&" + datas)),
				cache: false,
				dataType: "json",
				beforeSend: function(xhr) {
					xhr.overrideMimeType("text/plain; charset=utf-8");
				},
				success: function(json) {
					callback("success", json);
				},
				error: function(e) {
					callback("error", {
						"flag": false,
						"errmsg": "Call service failed！"
					});
				}
			});
		},
		/*hanglebars模板数据填充*/
		handlebarsAppendToHtml: function(tpl_id, div_id, date) {
			var _temp = Handlebars.compile($("#" + tpl_id).html());
			$('#' + div_id).html(_temp(date));
		},
		/*获取某个时间的前n天日期*/
		getBeforeDate: function(date, n) {
			var year = date.getFullYear();
			var mon = date.getMonth() + 1;
			var day = date.getDate();
			if (day <= n) {
				if (mon > 1) {
					mon = mon - 1;
				} else {
					year = year - 1;
					mon = 12;
				}
			}
			date.setDate(date.getDate() - n);
			year = date.getFullYear();
			mon = date.getMonth() + 1;
			day = date.getDate();
			return year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
		},
		/*去除数组中重复的对象*/
		uniqueArray: function(arr) {
			var unique = {};
			arr.forEach(function(gpa) {
				unique[JSON.stringify(gpa)] = gpa
			});
			arr = Object.keys(unique).map(function(u) {
				return JSON.parse(u)
			});
			return arr;
		},
		/*获取url参数*/
		getUrlParameter: function(strname) {
			var url = decodeURI(window.document.location.href);
			var index = url.indexOf("?");
			if (index < 0) {
				return null;
			}
			var parameters = url.substr(index + 1);
			var arr = parameters.split("&");
			for (var i = 0; i < arrTmp.length; i++) {
				var arr = arr[i].split("=");
				if (arr[0].toUpperCase() == strname.toUpperCase())
					return arr[1];
			}
			return null;

		}
	}
});