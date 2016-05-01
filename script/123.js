/**
 * Created by hao on 2016/1/21.
 */
window.onload=function(){
    var func;
    var oResult=document.getElementById('disabledInput');
    var	oArticle=document.getElementsByTagName('article')[0];
    var	oNumBtn=getByClass(oArticle,'btn-success');
    var oFuncBtn=getByClass(oArticle,'btn-warning');
    var oCountBtn=getByClass(oArticle,'btn-danger')[2];	//有待斟酌
    var changeNumBtn=getByClass(oArticle,'btn-primary');
    var oClearBtn=document.getElementById('clearZero');
    var oDelBtn=document.getElementById('del');
    var oHiddenInput=document.getElementById('hiddenInput');//隐藏域
    var last;
    var key=false;
    var lock=false;
    var sum= 0, num;
    var change;
    var o={
        'onelevel':0,
        'twolevel':0
    };
    //绑定事件
    bind(oNumBtn,'getNumber');
    bind(oFuncBtn,'getFunc');

    bind(changeNumBtn,'getChange');

    oCountBtn.onclick=function(){
        getCalc();
    };

    oClearBtn.onclick=function(){
        clearZero();
    };

    oDelBtn.onclick= function () {
        del();
    };
    /**
     * bind绑定函数
     * @param dom ---dom array
     * @param type ---确保dom array绑定到相对应的事件的key
     */
    function bind(dom,type){
        var length=dom.length;
        for(var i=0;i<length;i++){
            (function(){
                var p=i;
                dom[i].onclick=function(){
                    switch(type){
                        case 'getNumber':
                            getNumber(p);
                            break;

                        case 'getFunc':
                            getFunc(p);
                            break;

                        case 'getChange':
                            getChange(p);
                            break;

                    }
                }
            })();
        }
    }

    /**
     * 函数getNumber
     * 点击数字时获取数字并调用getInput
     ** @param p button上索引
     */
    function getNumber(p){
        var value=oNumBtn[p].value;
        getInput(value);
    }

    /**
     * 函数 getInput
     * 获取输入 确保正确的输入显示隐藏域和计算框中,数字和func运算符+-* /,输入func之后或者计算完成后才可以输入数字
     * 如果输入的是+-* / AND 最后一个字符是+-* /就去掉最后一位再加
     * @param value 是输入的字符
     */
    function getInput(value){
        var last=(oHiddenInput.value).substring(oHiddenInput.value.length,oHiddenInput.value.length-1);
        var k = (oHiddenInput.value).substring(0,oHiddenInput.value.length-1);

        if(arguments.callee.caller==getNumber){
            if(value =='.' && oResult.value.indexOf('.')!=-1){
                return false;
            }
            else{
                if((oResult.value== '0' || key )&& value !='.'){
                    //key是输入乘号等，可以重新输入数字的控制器
                    oResult.value = value;
                    oHiddenInput.value += value;
                    key=false;
                }
                else {
                    if(lock){
                        sum = oHiddenInput.value = oResult.value = eval(value);
                    }
                    else{
                        oResult.value += value;
                        oHiddenInput.value += value;
                    }

                }
            }
        }
        if(arguments.callee.caller==getFunc){
            /*if((value=='+' || value=='-' || value=='*' || value=='/')&&(last=='+' || last=='-' || last=='*' || last=='/')){
                oHiddenInput.value = k + value;
                sum=eval(k);
            }
            else {
                if(value=='+' || value=='-' || value=='*' || value=='/')
                {
                    oHiddenInput.value += value;
                }
                else{
                    oHiddenInput.value = value;
                }
                sum=eval(oHiddenInput.value);
            }
            */
            if(value=='+' || value=='-' || value=='*' || value=='/'){
                if(last=='+' || last=='-' || last=='*' || last=='/'){
                    oHiddenInput.value =  (oHiddenInput.value).substring(0,oHiddenInput.value.length-1) + value;
                }
                else{
                    oHiddenInput.value += value;
                    sum=eval((oHiddenInput.value).substring(0,oHiddenInput.value.length-1));
                }
            }
        }
        if(arguments.callee.caller==getChange){
            switch (value) {
                case '%':
                    oResult.value=oResult.value/100;
                    break;

                case 'sin':
                    oResult.value=Math.sin(oResult.value);
                    break;

                case 'cos':
                    oResult.value=Math.cos(oResult.value);
                    break;

                case 'tan':
                    oResult.value=Math.tan(oResult.value);
                    break;

                case 'asina':
                    oResult.value=Math.asin(oResult.value);
                    break;

                case 'acos':
                    oResult.value=Math.acos(oResult.value);
                    break;

                case 'atan':
                    oResult.value=Math.atan(oResult.value);
                    break;

                case '+/-':
                    if((oResult.value).substring(0,1)=='-'){
                        oResult.value=(oResult.value).substring(1);
                    }
                    else{
                        oResult.value='-'+oResult.value;
                    }
                    break;

                case 'sqrt':
                    oResult.value=Math.sqrt(oResult.value);
                    break;

                case '1/x':
                    oResult.value= 1/oResult.value;
                    break;
            }

            if(sum==0 || lock){
                //
                oHiddenInput.value = oResult.value;
            }
            else{
                oHiddenInput.value = sum+func+oResult.value;
            }
        }
    }

    /**
     * 函数 getfunc
     * 重置可输入数字的key，重置num。保持o={'onelevel':1，'twolevel':0}一二级运算符正常运转，等于2就自动计算
     * @param p button上索引
     */
    function getFunc(p){
        last=(oHiddenInput.value).substring(oHiddenInput.value.length,oHiddenInput.value.length-1);//待删除
        num = undefined;//重置num
        key=true;
        func = oFuncBtn[p].value;
        var value;

        switch (func) {
            case '+':
                o['onelevel']++;
                value = '+';
                getInput(value);
                break;

            case '-':
                o['onelevel']++;
                value = '-';
                getInput(value);
                break;

            case '*':
                o['twolevel']++;
                value = '*';
                getInput(value);
                break;

            case '/':
                o['twolevel']++;
                value = '/';
                getInput(value);
                break;
        }
        for(var i in o){
            if(o[i]==2){
                o[i]--;
                getCalc();
            }
        }
    }

    /**
     * getCalc
     *
     *
     */
    function getCalc(){
        var k=(oHiddenInput.value).substring(0,oHiddenInput.value.length-1);
            last=(oHiddenInput.value).substring(oHiddenInput.value.length-1,oHiddenInput.value.length);
            console.log('num:'+num);
        if(arguments.callee.caller==getFunc) {
            oHiddenInput.value = eval(k) + last;
            switch (last) {
                case '+':
                case '-':
                    o = {
                        'onelevel': 1,
                        'twolevel': 0
                    };
                    oResult.value=sum = eval(k);
                    break;
                case '*':
                case '/':
                    o = {
                        'onelevel': 0,
                        'twolevel': 1
                    };
                    oResult.value=sum = eval(k);
                    break;
                default:
                    oResult.value=sum = eval(oHiddenInput.value);
                    break;
            }
            key=false;
            lock=true;
        }
        if(arguments.callee.caller==oCountBtn.onclick) {
            if (num == undefined) {
                num = eval(oResult.value);
            }
            switch (func) {
                case '+':
                    sum = sum + num;
                    break;

                case '-':
                    sum = sum - num;
                    break;

                case '*':
                    sum = sum * num;
                    break;

                case '/':
                    sum = sum / num;
                    break;
            }
            //sum->
            oResult.value=oHiddenInput.value=sum;
            o={
                'onelevel':0,
                'twolevel':0
            };
            key=false;
            lock=true;
        }

    }

    /**
     *
     * 清零函数
     */
    function clearZero(){
        window.location.reload();
    }

    function del(){
        //计算之后不能用,
        if(lock){
            return false;
        }
        else{
            oHiddenInput.value=(oHiddenInput.value).substring(0,oHiddenInput.value.length-1)==''?'':(oHiddenInput.value).substring(0,oHiddenInput.value.length-1);
            oResult.value=(oHiddenInput.value)==''?0:oHiddenInput.value;
        }
    }

    /**
     * 输入改变数字的符号 比如sina cos +/- sqrt
     * @param p p是索引
     */
    function getChange(p){
        change = changeNumBtn[p].value;
        getInput(change)
    }
    /**
     * 函数 getbyclass
     * @param oParent 目标的父极dom
     * @param sClass 目标classname
     * @returns {Array} 找到的class符合的dom array
     */
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

};