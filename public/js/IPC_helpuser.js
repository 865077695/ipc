
$(function(){

var d;
    var $ipt = $('#search');
    // alert('asd');
    $.ajax({  
        type:"GET", 
        url:"./source/js/data.json", 
        dataType:"json", 
        success:function(data){
            // console.log(data)
            window.d = data;
            str = "";
            match(str,data);
            $ipt.keyup(function(){
                var value = $ipt.val();
                match(value,data);
            });
        },
        error:function (result) {
            alert("请求失败，请稍后重试");
        }
    });
    function match(str,data){
        val = pinyin.getFullChars(str).toLowerCase();
        var content = "";
        for(var _key in data){
           if(pinyin.getFullChars(_key).toLowerCase().indexOf(val)>=0){
                content += "<div class=\"que_list col-md-6\"><div class=\"question bor\">" +_key+"</div> <div class=\"answer\" _toogle=\"true\"> &nbsp;"+data[_key]+"</div> </div>"
            }
            $('#ul').html(content);
        }
        if(content == ''){
            $('#ul').html("<p class=\"text-center\" style=\"font-size:18px\">没有找到匹配的问题，请更换关键词后重新搜索</p>")
        }
    }    
    //placeholder兼容IE8
    $("#search").attr('placeholder','请输入您要搜索的关键字');
    $('#ul').delegate(".question",'click',function(event){
        var $answer = $(this).siblings('.answer');
        if($answer.attr('_toogle')==="true"){
            $(this).removeClass('bor');
            $answer.slideDown().attr('_toogle',"false");
        }else{
            $(this).addClass('bor');
            $answer.slideUp().attr('_toogle',"true");
        }
    })
})