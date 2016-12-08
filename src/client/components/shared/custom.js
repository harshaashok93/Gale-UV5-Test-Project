$(document).ready(function(e){
    $('.react-autosuggest__input').removeAttr('placeholder');
    $('.search-box').find('form').append('<span class="close-btn"><i class="glyphicon glyphicon-remove-circle"></i></span>');
    $('.search-box span').on('click', function(){
        $(this).parent().find('form').removeClass('invisible');
        $(this).parent().find('form').addClass('visible');
        $('.news-letter-panel').fadeOut();
    });
    $('.close-btn').on('click',function(){
        $(this).parent('form').addClass('invisible');
    });

    var lc = localStorage.getItem('cookie');
    if(lc === "cookie"){
        $('.news-letter-panel').hide();
    }else{
        $('.news-letter-panel').show();
    }

    // ====================== Newsletter Functions =====================

    $('a.join-live-clean').on('click', function(e){
        e.preventDefault();
        $('.news-letter-panel form')[0].reset();
        $('.search-box form').removeClass('visible');
        $('.news-letter-panel').fadeIn();
        $('.news-letter-panel h3').show();
        $('.news-letter-panel .form-group').show();
        $('.news-letter-panel h4').hide()
    })

    $(document).ajaxComplete(function(event,request, settings){
        var statusCode = request.statusCode().status
        var success = (statusCode !== 404 || statusCode !== 500);
        $('.alert.alert-success').hide();
        $('.alert.alert-danger').hide();
        if(success){
            $('.news-letter-panel h3').hide();
            $('.alert.alert-success').show();
            $('.news-letter-panel .form-group').hide();
            setTimeout(function(){
                $('.news-letter-panel h4').hide()
            },10)
        }else{
            $('.news-letter-panel h3').show();
            $('.alert.alert-danger').show();
            $('.news-letter-panel .form-group').show();
            $('.news-letter-panel h4').hide()
        }
    });

    $('.news-letter-panel div.close').on('click', function(){
        $('.alert.alert-success').hide();
        $('.news-letter-panel').fadeOut();
        localStorage.setItem('cookie','cookie');
        $('.news-letter-panel form')[0].reset();
    })

    // ====================== Contact us Form thank you message ====================

    $(".contact-form-panel").bind("DOMNodeInserted", function() {
        var success = $('.alert-success').length
        if(success > 0){
            $('.fade-away').hide();
            setTimeout(function(){
                $('.thank-you-wrap').fadeIn()
            },10)
        }
    });

    $(window).on('load',function(){
        $('.contact-form-panel .form-group').removeClass('has-error has-danger');
        $('.contact-form-panel .form-group .help-block').html('');
    })

    //======================= Hamburger Menu functionality =========================

    $("a.hamburger-icon").on('click',function(e){
        e.preventDefault();
        $(".nav-menu").stop(true,true).slideToggle(300);
    });

//=========================== Search menu Functionality ==============================

    $("a.mobile-search-icon").on('click',function(e){
        e.preventDefault();
        $(".search-box").stop(true,true).slideToggle(300);
    });

//=========================== Menu Close button Functionality ====================================

    $("a.hamburger-icon").click(function(e){
        e.preventDefault();
        if ($("a.mobile-search-icon img").attr("src") === "/static/img/mobile-close-icon.png") {
            $("a.mobile-search-icon").click();
        }
        if($("a.hamburger-icon img").attr("src").toLowerCase().search('hamburger') !== -1){
            $("a.hamburger-icon img").attr("src", "/static/img/mobile-close-icon.png");
        }else{
            $("a.hamburger-icon img").attr("src", "/media/original_images/HamburgerMenu_DarkGreen2x.png");
        }
    });

//=========================== Quick search Close button Functionality =============================

    $("a.mobile-search-icon").click(function(e){
        e.preventDefault();
        if ($("a.hamburger-icon img").attr("src") === "/static/img/mobile-close-icon.png") {
            $("a.hamburger-icon").click()
        }
        if($("a.mobile-search-icon img").attr("src").toLowerCase().search('magnifier') !== -1){
             $("a.mobile-search-icon img").attr("src", "/static/img/mobile-close-icon.png");
        }else{
            $("a.mobile-search-icon img").attr("src", "/media/original_images/Search_Magnifier_DarkGreen2x.png");
        }
    });
});



