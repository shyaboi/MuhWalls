console.log("js is working")
$(function() {
    $('.lazy').Lazy({
        // your configuration goes here
        scrollDirection: 'vertical',
        chainable:true,
        effect: 'fadeIn', 
        effectTime: 300,
        visibleOnly: true,
        onError: function(element) {
            console.log('error loading ' + element.data('src'));
        }
    });
});