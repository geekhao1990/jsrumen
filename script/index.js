window.onload=function(){
	
	var oName=document.getElementById('studentName');
	var oScroe=document.getElementById('studentScroe');
	var oBtn=document.getElementById('btn');
	var oTab=document.getElementsByTagName('table')[0];
	var oTbody=oTab.getElementsByTagName('tbody')[0];

	oBtn.onclick=function(){
		if(oName.value=='' || oScroe.value=='' || oScroe.value>100 ||oScroe.value<0 ){
			alert("输入不合法");
		}
		else{
			if(oScroe.value<=100 && oScroe.value>=0){
					var level=Math.floor(oScroe.value/10);
					if(level==10){
						level=1;
					}
					else{
						level=10-level;
					}
					var oTr=document.createElement('tr');
					var oTh=document.createElement('th');
					oTh.innerHTML= oTbody.rows.length+1;
					oTr.appendChild(oTh);
					
					var oTd=document.createElement('td');
					oTd.innerHTML= oName.value;
					oTr.appendChild(oTd);
					
					var oTd=document.createElement('td');
					oTd.innerHTML= oScroe.value;
					oTr.appendChild(oTd);

					var oTd=document.createElement('td');
					oTd.innerHTML= level+"等生";
					oTr.appendChild(oTd);
					
					oTbody.appendChild(oTr);
			}
			oName.value='';
			oScroe.value='';
		}
	}










}