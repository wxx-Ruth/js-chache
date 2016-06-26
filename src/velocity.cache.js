var cache = Object.create(null);
var size = 0;//统计缓存个数
module.exports = {
	get: get,
	set: set,
	del: del,
	clear: clear
};
// 获取缓存
function get(key) {
	  var data = cache[key];
	  if(data){
	  	if(!isNaN(data.expire) && data.expire >= Date.now()){
	  		return data.value;
	  	}else{
	  		size --;
	  		cache[key] = null;
	  	}
	  }
	  return null;
}
// 设置缓存
function set(key,value,time) {
	var cacheInfo = cache[key];
	if(cacheInfo){
		clearTimeout(cacheInfo.timeout);
	}else{
		size ++;
	}
	var expire = time + Date.now();
	var record = {
		value: value,
		expire: expire
	}
	// 设置定时器清除缓存
	if(!isNaN(expire)){
		record.timeout = setTimeout(function(){
			del(key);
		},time);
	}
	cache[key] = record;
}
// 清除缓存
function del(key) {
	 var canDelete = true,
	 	cacheInfo = cache[key];
	 if(cacheInfo){
	 	clearTimeout(cacheInfo.timeout);
	 	if(!isNaN(cacheInfo.expire) && cacheInfo.expire < Date.now()){
	 		canDelete = false;
	 	}else{
	 		canDelete = true;
	 	}
	 	if(canDelete){
	 		size --;
	 		cache[key] = null;
	 	}
	 }
}
// 清空缓存
function clear(argument) {
	 for(var key in cache){
	 	var cacheInfo = cache[key];
	 	if(cacheInfo){
	 		clearTimeout(cacheInfo.timeout);
	 	}
	 	size = 0;
	 	cache = Object.create(null);
	 }
}

