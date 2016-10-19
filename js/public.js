
$(function(){
    //手机分辨率处理，设置在不同分辨率下不同的rem对应值
    (function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                    docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
            };
            recalc();

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
    
//因为在手机端放大页面的话，顶部固定的导航条在某些浏览器下会同步放大，遮挡页面，因此设置在移动端时不将导航条固定在顶部同时取消第二块的margin-top
    (function(){
        if($(window).width()<760){
            $('nav').removeClass('navbar-fixed-top');
            $('nav+div').css({'margin-top':'0'})
        }
    })()

})