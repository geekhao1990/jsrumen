window.onload=function(){
	var func;		
	var oResult=document.getElementById('disabledInput');
	var	oArticle=document.getElementsByTagName('article')[0];
	var	oNumBtn=getByClass(oArticle,'btn-success');
	var oFuncBtn=getByClass(oArticle,'btn-warning');
	var oCountBtn=getByClass(oArticle,'btn-danger')[2];	//有待斟酌
	var oHiddenInput=document.getElementById('hiddenInput');//隐藏域
	var last;
	var flag=false;//符号func
	var key=false;
	var sum= 0, num;
	var o={
		'onelevel':0,
		'twolevel':0
		};
	//console.log(oNumBtn[0].value)
	//如果是数字就连接字符串
	//一旦不是数字就记下第一个值num1=input.value
	//input.value+=this.value,继续连接数字成字符串
	//点=、+、-等运算符时，num2=input.value,然后计算并将result

	bind(oNumBtn,'getNumber');
	bind(oFuncBtn,'getFunc');

	oCountBtn.onclick=function(){
		getCalc();
	}

	function getByClass(oParent,sClass){
		var aEle=oParent.getElementsByTagName('*');
		var aResult=[];
		var re=new RegExp('\\b'+sClass+'\\b', 'i');

		for(var i=0;i<aEle.length;i++){
			 if(re.test(aEle[i].className)){
				aResult.push(aEle[i])
			}
		}
		return aResult;
	}

	function bind(dom,func){
		var length=dom.length;
		for(var i=0;i<length;i++){
			(function(){
				var p=i;
				dom[i].onclick=function(){
					switch(func){
						case 'getNumber':
							getNumber(p);
							break

						case 'getFunc':
							getFunc(p);
							break
					}
				}
			})();
		}
	}

	function getInput(value){
		/*获取输入 确保正确的输入
		//数字和func运算符+-* /
		//输入func之后才可以输入数字
		//如果输入的是+-* / AND 最后一个字符是+-* /就去掉最后一位再加
		//var last=(oHiddenInput.value).substring(oHiddenInput.value.length,oHiddenInput.value.length-1);
		// 		 k=(oHiddenInput.value).substring(0,oHiddenInput.value.length-1),
		//if()
		//if(value==*+。。。 && last ==*+-。。。){重复输入符号
		// 		oHiddenInput.value = k + value;
		//	}
		//else {
		//1+
		// 		oHiddenInput.value += value;
		//	}
		//
		*/
		oHiddenInput.value += value;
		if(arguments.callee.caller==getNumber){
			if(eval(oResult.value) ==sum || key ){
				//key是输入乘号等，可以重新输入数字的控制器
				oResult.value=value;
			}
			else {
				oResult.value+=value;
			}

		}

	}

	function getNumber(p){
		//var value=oResult.value;
		var value=oNumBtn[p].value;
		getInput(value);
	}

	function getFunc(p){
		//如果连续输入第二个运算符+-*/
		//	oHiddenInput.value=(oHiddenInput.value).substring(0,oHiddenInput.value.length-1);
		/**
		 *
		 *
		 */
		var last=(oHiddenInput.value).substring(oHiddenInput.value.length,oHiddenInput.value.length-1);//待删除
		num = undefined;//重置num
		key=true;

		switch(last){//待删除
			case '+':case '-':
			oHiddenInput.value=(oHiddenInput.value).substring(0,oHiddenInput.value.length-1);
			o['onelevel']--;
			break;
			case '*':case '/':
			oHiddenInput.value=(oHiddenInput.value).substring(0,oHiddenInput.value.length-1);
			o['twolevel']--;
			break;

			default:break;
		}

		if(arguments.callee.caller!=getCalc) {
			func = oFuncBtn[p].value;
			switch (func) {
				case 'plus':
					o['onelevel']++;
					value = '+';
					getInput(value);
					break;

				case 'subtract':
					o['onelevel']++;
					value = '-';
					getInput(value);
					break;

				case 'mul':
					o['twolevel']++;
					value = '*';
					getInput(value);
					break;

				case 'divsion':
					o['twolevel']++;
					value = '/';
					getInput(value);
					break;
			}
		}
		console.log("o[onelevel]:"+o['onelevel']);
		console.log("o[twolevel]:"+o['twolevel']);

		for(var i in o){
			//1*2+3*4 此时有bug,判断方法有问题
			if(o[i]==2){
				o[i]--;
				getCalc();
			}
		}
	}
	function getPer(){
		if(num==undefined){
			num=oResult.value/100;
		}
		getInput('%');
	}
	function getCalc(){
		var k=(oHiddenInput.value).substring(0,oHiddenInput.value.length-1),
		f=(oHiddenInput.value).substring(oHiddenInput.value.length-1,oHiddenInput.value.length);

		console.log('num:'+num);
		if(arguments.callee.caller==oCountBtn.onclick) {
			if(f=='+' || f=='-' || f=='*' || f=='/'){
				//oResult.value=oHiddenInput.value=eval(oHiddenInput.value);

				if (num == undefined) {
					num = eval(oResult.value);
				}
				switch (func) {
					case 'plus':
						sum = sum + num;
						break;

					case 'subtract':
						sum = sum - num;
						break;

					case 'mul':
						sum = sum * num;
						break;

					case 'divsion':
						sum = sum / num;
						break;
				}
				oResult.value = oHiddenInput.value = sum;
			}
			else{
				oResult.value= oHiddenInput.value = eval(oHiddenInput.value);
			}
		}

		if(getCalc.caller==oCountBtn.onclick){
			getFunc();
		}
		oResult.value=sum;
		if(f=='+' || f=='-' || f=='*' || f=='/'){
			oHiddenInput.value=sum+f;
			switch(f){
				case '+':
				case '-':
					o={
						'onelevel':1,
						'twolevel':0
					};
					sum = eval(k);
				break;

				case '*':
				case '/':
					o={
						'onelevel':0,
						'twolevel':1
					};
					sum = eval(k);
				break;

				default:
					sum = eval(oHiddenInput.value);
					break;
			}

		}
		else{
			oHiddenInput.value=sum;
			o={
				'onelevel':0,
				'twolevel':0
			};
		}

	}

}