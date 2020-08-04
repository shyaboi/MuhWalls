console.log("js is working")
$(function() {
    $('.lazy').Lazy({
        // your configuration goes here
        scrollDirection: 'vertical',
        effect: 'fadeIn', 
        effectTime: 300,
        chainable:true,
        visibleOnly: true,
        onError: function(element) {
            console.log('error loading ' + element.data('src'));
        }
    });
});

var scrollPosition

$(window).on('scroll', function() {
  scrollPosition= $(this).scrollTop()
   console.log(scrollPosition) 
   return scrollPosition
});

$(function() {
    $(window).unload(function() {
       localStorage.setItem("scrollPosition", scrollPosition);
    });
    if(localStorage.scrollPosition) {
       $(scrollPosition).scrollTop(localStorage.getItem("scrollPosition"));
    }
 });

 $(document).ready(function(){
    $(this).scrollTop(localStorage.getItem("scrollPosition"));
});
