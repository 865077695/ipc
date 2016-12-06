$(function(){
    $('.quest a').hover(function(){
        var idx = $(this).index();
        var src = $(this).find('img').attr('src');
        newSrc = src.slice(0,-4)+'_hover.png';
        $(this).find('img').attr('src',newSrc);
    },function(){
        var idx = $(this).index();
        var src = $(this).find('img').attr('src');
        newSrc = src.slice(0,-10)+'.png';
        $(this).find('img').attr('src',newSrc);
    })
    //回车搜索
    $('#search').keydown(function(e){
        if(e.keyCode == 13){
        window.open('IPC_helpuser.html')
        }
    })
    //重新加载图形验证码
    $("#changeImg,._model").click(function(){
        $("#verif_img").attr('src','/kinzo-product/getCaptcha?t='+Math.random())
    });
    $('.feedback').on('click','#sendMessage',function(){
        var _name = $('#name').val();
        var _number = $('#phone').val();
        var _feed = $('#feed').val();
        var _verif_text=$('#verif_text').val();
        if( _name && _number && _feed && _verif_text ){
            var jsonStr = JSON.stringify({"guestName":_name,"contactDetails":_number,"captcha":_verif_text,"suggestion":_feed});
            $.ajax({
                contentType:"application/json;charset=UTF-8",
                type:"POST",
                url:"/kinzo-product/suggestion",
                data:jsonStr,
                dataType:"json",
                success:function(data){
                    if(data.statusCode == 200 && data.buzCode == 0){
                        alert('发送成功');
                        $('.error').html(' ');
                    }else if(data.statusCode == 200 && data.buzCode == 10){
                        $('.error').html('会话过期');
                    }else if(data.statusCode == 200 && data.buzCode == 40){
                        $('.error').html('验证码错误');
                    }else if(data.statusCode == 200 && data.buzCode == 20 ){
                        $('.error').html('名字过长')
                    }else if(data.statusCode == 200 && data.buzCode == 21 ){
                        $('.error').html('联系方式格式错误')
                    }else if(data.statusCode == 200 && data.buzCode == 22 ){
                        $('.error').html('建议内容超出最大长度')
                    }else if(data.statusCode == 200 && data.buzCode == 30){
                        $('.error').html('名字不能为空');
                    }else if(data.statusCode == 200 && data.buzCode == 31){
                        $('.error').html('联系方式不能为空');
                    }else if(data.statusCode == 200 && data.buzCode == 32){
                        $('.error').html('问题内容不能为空');
                    }
                }
            });
        }else{
            $('.error').html('内容不能为空');
        }
    })
})