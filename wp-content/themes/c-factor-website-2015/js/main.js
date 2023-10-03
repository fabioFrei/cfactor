////////2015/////////
//                 //
//  ██████ █████   //
//    ██   ███     //
//    ██   ██      //
//                 //
////////ZH/CH////////

+function($) {

  // debulked onresize handler
  function on_resize(c, t) {
    onresize = function() {
      clearTimeout(t);
      t = setTimeout(c, 100);
    }
    return c;
  }


  $.extend($.easing, {
    easeOutExpo: function (x, t, b, c, d) {
      return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    }
  });

  $(function() {

    var $el,
        PHONE_TABLET_BREAKPOINT = 768;


    // customer logos
    // ____________________________________________________________

    var $imagesToggle;
    if (($imagesToggle = $('[data-js-images-show]')).length) {
      $imagesToggle.on('click', function(e) {
        e.preventDefault();
        $($(this).data('js-images-show')).children().addClass('in');
        $(this).hide();
      });
    }


    // fancybox
    // ____________________________________________________________

    function initFancybox($this, fbViewport) {

      var thnls = {
        width: (fbViewport == 'phone' ? 100 : 140),
        height: (fbViewport == 'phone' ? 66 : 95)
      }

      $this.fancybox({
        padding: 0,
        maxWidth: 780,
        maxHeight: 438,
        helpers: {
          overlay: {
            css: {
              'background': 'rgba(26,23,27,.95)'
            }
          },
          title: {
            type: 'outside'
          },
          thumbs : {
            width: thnls.width,
            height : thnls.height
          }
        }
      });
    }


    // svg injector
    // ____________________________________________________________

    SVGInjector($('[data-svg]'));


    // main nav
    // ____________________________________________________________

    $('[data-js-navtrigger-target]').on('click', function() {
      var $target = $($(this).data('js-navtrigger-target'));

      $(this).toggleClass('active');

      // delay the toggle of the .in class to prevent the .navwrapper from displaying immediatly
      var delay = $target.hasClass('in') ? 0 : 500;
      setTimeout(function() {
        $target.toggleClass('in');
      }, delay);

      // lock main to prevent scrolling when nav is open
      $('body').toggleClass('fixed');
      // turn siteheader transparent
      $('[data-js-siteheader]').toggleClass('transparent');
    });


    // fullpage
    // ____________________________________________________________

    if (($el = $('[data-js-fullpage]')).length) {

      var $fullpageSection = $('[data-js-fullpage-section]');

      $el.fullpage({
        sectionSelector: '[data-js-fullpage-section]',
        scrollingSpeed: 600,
        responsiveWidth: 768,
        verticalCentered: false,
        onLeave: function(index, nextIndex, direction) {

          // on last slide, show the footer
          if (nextIndex === $fullpageSection.length) {
            $('[data-js-sitefooter]').addClass('in');
          } else {
            $('[data-js-sitefooter]').removeClass('in');
          }

          index--;
          nextIndex--;

          if (direction == 'down') {
            $fullpageSection.eq(index).addClass('out');
          } else {
            index--;
            $fullpageSection.eq(index).removeClass('out');
          }

        }
      });

      $('[data-js-scrolldown]').on('click', function() {
        $.fn.fullpage.moveSectionDown();
      });
    }


    // roadmap
    // ____________________________________________________________

    var $roadmap;
    if (($roadmap = $('[data-js-roadmap]')).length) {
      $(window).on('scroll', function(){
        $roadmap.children().each(function(){
          if (($(this).offset().top <= $(window).scrollTop() + $(window).height()*.7) && $(this).hasClass('out')) {
            $(this).removeClass('out').addClass('in');
          }
        });
      });
    }


    // contactNav
    // ____________________________________________________________

    var $contactNav;
    if (($contactNav = $('[data-js-contact-nav-trigger]')).length) {
      $contactNav.on('click', function(){
        $($(this).data('js-contact-nav-trigger')).toggleClass('in');
        $('[data-js-siteheader]').toggleClass('opaque');
      });
    }


    // manual scrolldown on detail pages
    // ____________________________________________________________

    var $scrolldown;
    if (($scrolldown = $('[data-js-scrolldown-man]')).length) {
      $scrolldown.on('click', function() {
        $('html,body').animate({
          // the 78 correspond to the siteheader-height
          scrollTop: $('[data-js-teaser-cover]').height() - 78
        }, 1700, 'easeOutExpo');
      });
    }


    // set initial position of twin-title in topics
    var $twinTitle = $('[data-js-twin-title]');
    if ($twinTitle.length) {
      $twinTitle.each(function() {
        $(this).data('index', $(this).index());
      });
    }


    // resize
    // ____________________________________________________________

    on_resize(function() {
      var teaser_height = $(window).width() >= PHONE_TABLET_BREAKPOINT ? $(window).height() : 'auto';
      var fancyboxViewport = $(window).width() >= PHONE_TABLET_BREAKPOINT ? 'desktop' : 'phone';

      // teaser
      if (($el = $('[data-js-teaser-cover]')).length) {
        $('[data-js-teaser-cover]')
          .height(teaser_height)
          .width($(window).width());
      }

      // move topic twins on mobile to always show
      // the title twin in first position
      $twinTitle = $('[data-js-twin-title]');
      if ($(window).width() < PHONE_TABLET_BREAKPOINT) {
        $twinTitle.each(function() {
          $(this).insertBefore($(this).prev());
        });
      } else {
        $twinTitle.each(function() {
          if ($(this).data('index') == 1) {
            $(this).insertAfter($(this).next());
          }
        });
      }

      // fancybox
      if (($el = $('[data-js-gallery]')).length) {
        initFancybox($el, fancyboxViewport);
      }

    })();

    $( document ).ready( function () {
        $('.collapse_button').click(function(){
            $($(this).data('target')).slideToggle('fast');
            $(this).children().toggle();
        });
        showRandom();

        $(".headlessForm").each(function(){
          $(this).validate({
            
            submitHandler: function(form) {
              console.log(form);
              form.submit();
            } 
          });
        })
        $("#gform_1").validate({
          rules: { 
            input_1: "required",
            input_3: "required",
            input_2: "required email"
          },
          submitHandler: function(form) {
            console.log(form);
            form.submit();
        }        
      });
      $('.gform_button').click(function() {
        var form = $(this).parents('form');
        if (form.valid())
          form.submit();
      });


      jQuery.extend(jQuery.validator.messages, {
        required: "Dieses Feld ist erforderlich.",
        email: "Bitte geben Sie eine gültige E-Mail-Adresse ein."
      });
    });
  });

  // Show random  related
  // ____________________________________________________________
  
  function showRandom() {
      $(".related").each(function(){
        $items = $(this).find('.related__preview');
        $(shuffle($items).slice(0, 3)).addClass("selected");
      })
   }

  function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

}(jQuery);

!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=1)}({1:function(e,t,r){e.exports=r("Qzdy")},Qzdy:function(e,t){var r;r=location.href,document.getElementsByName("__DATA")[0].value=JSON.stringify({referer:r})}});