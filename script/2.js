window.onload=function(){
    //找到数组[“a“，”x“，”b“，”d“，”m“，”a“，”k，“m”，“p”，“j”，“a”]出现最多的字母并给出个数和每一个所在的顺序。
    var arr=["a","x","b","d","m","a","k","m","p","j","a"];
    function GetMore(arr){
        arr.sort(function(n1,n2){
            return n1-n2;
        });
    }
    console.log(GetMore(arr));

};