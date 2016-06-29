/*!GruntStream - 0.0.1-2016-06-29 */
function getBeforeDate(date, n) {
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
}
/*去除数组中重复的对象*/
function uniqueArray(arr) {
	var unique = {};
	arr.forEach(function(gpa) {
		unique[JSON.stringify(gpa)] = gpa;
	});
	arr = Object.keys(unique).map(function(u) {
		return JSON.parse(u);
	});
	return arr;
}		
