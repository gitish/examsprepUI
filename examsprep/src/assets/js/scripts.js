/*!
    * Start Bootstrap - Freelancer v6.0.3 (https://startbootstrap.com/themes/freelancer)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-freelancer/blob/master/LICENSE)
    */
    (function($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 71)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });

    // Scroll to top button appear
    $(document).scroll(function() {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 80
    });

    // Collapse Navbar
    var navbarCollapse = function() {
      var top = ($('.content-nav').offset() || { "top": NaN }).top;
      if (isNaN(top)) {
        $("#mainNav").removeClass("navbar-shrink");
      }
      else
      {
        if ($("#mainNav").offset().top > 100) {
          $("#mainNav").addClass("navbar-shrink");
        } else {
          $("#mainNav").removeClass("navbar-shrink");
        }
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    // Floating label headings for the contact form
    $(function() {
      $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
      }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
      }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
    });

    $("#page-top").on("click",".nav-item.mx-0.mx-lg-1",function(){
      $("#navbarResponsive").collapse("hide");
    });

    $("#mainDiv").on("click","#btnSubmitQuestions",function(){
      var data="";
      var total=$(this).data("value");
      var count=0;
      for(var i=1;i<=total;i++){
          if(data!=""){
              data=data+",";
          }
          var optName='q'+i;
          var radioValue = $("input[name='"+optName+"']:checked"). val()
          data=data+optName+":"+radioValue;
          if(radioValue!=undefined){
              count++;
          }
      }
      console.log(data);
      if(data==""){
          alert("Your answer is empty. You may have to start the exam!! \n Click Start Exam button!!");
          $(".overlay").hide();
          return;
      }
      if(count==0){
          alert("you have not selected any answer!! Please select at least one :)");
          $(".overlay").hide();
          return;
      }

      var formData={"name":$("#txtName").val(),"mobile":$("#txtMobile").val(),"answers" : data};
      $.ajax({
          url : '/question/submitResult/'+$("#hdnSession").val(),
          type: "POST",
          contentType: "application/json",
          data : JSON.stringify(formData),
          success : function(result) {
              alert("YOUR ANSWER SUBMITTED!!");
              $('#divClients').html("YOUR ANSWER SUBMITTED!!");
              $("#dvSubmitExam").hide();
              $(".overlay").hide();
          }
      });
    });


  })(jQuery); // End of use strict
