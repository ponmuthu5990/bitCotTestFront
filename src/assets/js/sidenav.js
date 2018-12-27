$(".btn-back").click(function(e) {
    e.preventDefault();
    $(".sidebar-wrapper").toggleClass("active");
});

$(document).ready(function(e){
    $(".img-check").click(function(){
        $(this).toggleClass("check");
    });
});

