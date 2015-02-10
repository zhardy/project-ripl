$(".story_menu_button").hover(function(e) {
    $('.story_menu_pop').css({
        "left": e.pageX +1,
        "top": e.pageY + 1
    }).stop().show(100);
}, function() {
    $('.story_menu_pop').hide();
});