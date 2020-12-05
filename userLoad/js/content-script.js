
document.addEventListener('DOMContentLoaded', function()
{
    /*console.log('content被执行了！');
	
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL('js/inject.js');
    
    document.head.appendChild(temp);*/
	var ZHtemp='';
	var MMtemp='';
	var jsonData;
	var len;
	
	
	chrome.storage.sync.get('zhPass', function(result) {
		jsonData = JSON.parse(result.zhPass);
		len = jsonData.length;
		console.log(jsonData);
		var localUrl = window.location.href;
		if(localUrl == "https://www.2-class.com/"){
			function writeZH(){
				document.getElementById('account').setAttribute('value',ZHtemp);
				document.getElementById('account').value=ZHtemp;
				console.log(ZHtemp);
				
			}
			function writeMM(){
				console.log(MMtemp);
				document.getElementById('password').setAttribute('value',MMtemp);
				document.getElementById('password').value=MMtemp;	
			}
			for(var i=0; i<len;i++){
				
				if(!jsonData[i]['成绩'] || jsonData[i]['成绩'] == ' '){
					ZHtemp = jsonData[i]['账号'];
					//console.log("账号"+jsonData[i]['账号']);
					MMtemp = jsonData[i]['密码'];
					
					break;
					
				}
			}
			if(i== len){
				alert("所有学生已完成知识竞赛，请登录班主任或管理员账号查看！")
			}
			document.onclick = function(){
				if(event.srcElement.getAttribute('id') == 'account'){
					writeZH();
					
				}
				else if(event.srcElement.getAttribute('id') == 'password'){
					writeMM();
					
				}else if(event.srcElement.getAttribute('type') == 'submit'){
					for(var i=0; i<len;i++){
						if(jsonData[i]['账号'] == ZHtemp){
							jsonData[i]['成绩'] = '100';
							chrome.storage.sync.set({'zhPass': JSON.stringify(jsonData)}, function() {
							    console.log('data保存成功');
							});
							
						}
					}
					
				}
				
			}
		}
		
		
	});
	
	
});
