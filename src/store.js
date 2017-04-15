const STORAGE_KEY = 'todos-vuejs'
export default {
	fetch(){
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
	},
	save(items){
       window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
	},
	delete(){
		var getlocalData=JSON.parse(window.localStorage.getItem(STORAGE_KEY));
		var dellocalData=getlocalData.splice(1,1);
		var dellocalDataStr=JSON.stringify(getlocalData);
		var localDataStr=JSON.stringify(getlocalData);
		window.localStorage.setItem(STORAGE_KEY,localDataStr)
		return window,localStorage.getItem(STORAGE_KEY)
	}
}