$(document).ready(function() {
	var search_watermark = $('label[for="search"]'),
		search = $('#search'),
		time = 1000,
		nav_clicked,
		accordion_clicked,
		skip_button = $(".skip"),
		continue_button = $('#continue'),
		portfolio = $('#portfolio'),
		INDEX_REGEX = /\d+/,
		rsvp_watermark = $('label[for="rsvp"]'),
		rsvp = $('#rsvp');
	// Test placeholder support
	$.support.placeholder = false;
	_test = document.createElement('input');
	if('placeholder' in _test) $.support.placeholder = true;
	
	// Provide placeholder compatibility code
	if(!$.support.placeholder) { 
			var active = document.activeElement;
			$(':text').focus(function () {
				if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
					$(this).val('').removeClass('hasPlaceholder');
				}
			}).blur(function () {
				if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
					$(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
				}
			});
			$(':text').blur();
			$(active).focus();
			$('form').submit(function () {
				$(this).find('.hasPlaceholder').each(function() { $(this).val(''); });
			});
	}
	
	// Set up displays that only work with jQuery running
	if (search.val() == '') {search_watermark.show(); }
	$('.arrow, .grey-arrow').addClass('right');
	$('.subnav').slideUp(time);
	continue_button.hide();
	$('.extras').hide();
	if (rsvp.val() == '') {rsvp_watermark.show(); }
	
	
	// Hide the Search watermark on keypress
	$('#search').keypress(function(event){
		// 13 is the enter key
		if (event.keyCode == 13)
			$(this).after('SEARCHING....');
		else
			search_watermark.fadeOut(time);	
	}).blur(function(){
		// Show the Search watermark if filed is empty
		if ($(this).val() == '')
			search_watermark.fadeIn(time);
	});
	
	// Hide the RSVP watermark on keypress
	$('#rsvp').keypress(function(event){
		// 13 is the enter key
		if (event.keyCode == 13) {
            $('#invitation').submit();
		} else
			rsvp_watermark.fadeOut(time);	
	}).blur(function(){
		// Show the Search watermark if filed is empty
		if ($(this).val() == '')
			rsvp_watermark.fadeIn(time);
	});
	
	skip_button.mousedown(function(e){
		// disable default behavior
		e.preventDefault();
		
		$(this).find("div").addClass("active");
	}).mouseup(function(){
		$(this).find("div").removeClass("active");	
	});
	
	// Switches the skip button to a continue button when the user inputs data
	$("form#portfolio input").focus(portfolioRowFocus);
	
	// Navigation animation
	$('nav a:not(.subnav a)').click(function(e){
		// disable default behavior
		e.preventDefault();
		
		// close expanded subsection
		if (nav_clicked) {
			$(nav_clicked).find('div').addClass('right')
							          .removeClass('down');
			$(nav_clicked).next('.subnav').slideUp(time);
		}
		if (nav_clicked == this) {
			nav_clicked = undefined;
		} else {
			nav_clicked = this;	
			$(this).find('div').addClass('down')
							   .removeClass('right');
			$(this).next('.subnav').slideDown(time);
		}
	}).hover(function(){
		$(this).find('div').addClass('active');
	}, function(){
		$(this).find('div').removeClass('active');
	});
	
	/*$('nav li:not(.subnav li)').hoverIntent(function(){
		$(this).find('div').addClass('down active')
		                   .removeClass('right');
		$(this).parent().next('.subnav').slideDown(time);
		$(this).parent().parent().mouseleave(function() {
			$(this).find('div').addClass('right')
			                   .removeClass('down active');
			$(this).find('.subnav').slideUp(time);
		});
	}, function(){ // exit function
		$(this).find('div').removeClass('active');
	});*/
	
	// Accordion animation
	$('.accordion a:not(.subnav a)').click(function(e){
		// disable default behavior
		e.preventDefault();
		
		// close expanded subsection
		if (accordion_clicked) {
			$(accordion_clicked).find('div').addClass('right')
							                .removeClass('down');
			$(accordion_clicked).parent().find('.subnav').slideUp(time);
			$(accordion_clicked).find('li').removeClass('active');
		}
		if (accordion_clicked == this) {
			accordion_clicked = undefined;
		} else { // expand subsection
			accordion_clicked = this;	
			$(this).find('div').addClass('down')
							   .removeClass('right');
			$(this).parent().find('.subnav').slideDown(time);
			$(this).find('li').addClass('active');
		}
	}).hover(function(){
		$(this).find('div').addClass('active');
	}, function(){
		$(this).find('div').removeClass('active');
	});
	
	$.get('../res/zipcode_select.html', function(data) {
    	$('.zip-chzn').html(data);
	});
	
	// Adds date picker to date fields
	/*$('.date').each(function(index, element) {
        element.DatePicker({
			format:'m/d/Y',
			date: element.val(),
			current: element.val(),
			starts: 1,
			position: 'r',
			onBeforeShow: function(){
				element.DatePickerSetDate(element.val(), true);
			},
			onChange: function(formated, dates){
				element.val(formated);
				element.DatePickerHide();
			}
		});
    });*/
	
	// Adds Chosen widget to the Zip Code selection field
	/*$(".zip-chzn").chosen({no_results_text: "No matching ZIP code found."}).change(
				  function() {
					// can't select nothing, so hides the error
					var id = $(this).attr('id');
					id = '#' + id;
					portfolio.validate().element(id);
					$(id).valid();
	});
	
	// Adds Chosen widget to the Terms selection field
	$(".terms-chzn").chosen({no_results_text: "No matching terms found."}).change(
				  function() {
					// can't select nothing, so hides the error
					var id = $(this).attr('id');
					id = '#' + id;
					portfolio.validate().element(id);
					$(id).valid();
	});
	
	// Adds Chosen widget to the Property Type selection field
	$(".prop-type-chzn").chosen({no_results_text: "No matching type found."}).change(
				  function() {
					// can't select nothing, so hides the error
					var id = $(this).attr('id');
					id = '#' + id;
					portfolio.validate().element(id);
					$(id).valid();
	});
	
	// Adds Chosen widget to the Equivalent Type selection field
	$(".cash-type-chzn").chosen({no_results_text: "No matching type found."}).change(
				  function() {
					// can't select nothing, so hides the error
					var id = $(this).attr('id');
					id = '#' + id;
					portfolio.validate().element(id);
					$(id).valid();
	});*/
	
	// Set up color flash on input with a maxlength
	$("input[maxlength]").bind('keyup.betatrek.maxlength', function() {
		var $this = $(this),
			$max = $this.attr('maxlength'),
			$color = $this.css('background');
		if ($this.val().length >= $max) {
			// TODO: implement flash
			/*$this.animate({background: "#ff7777"}, 'fast')
				 .animate({background: $color}, 'fast');*/
		}
	});
	
	// Dynamic password reset modification of the login moal window
	$('#password_reset').click(function(evt) {
		evt.preventDefault();
		
		$('#login_password').prop('disabled', true).hide('fast');
		$('#space_after_login_password').hide('fast');
		$('#password_reset').hide('fast');
		$('#space_after_password_reset').hide('fast');
		login_title = $('#login_title').text();
		$('#login_title').text('Request Password Reset');
		$('#password_reset_request').val(true);
		$('#login_close').bind('click.betatrek.temporary', function() {
			$('#login_password').prop('disabled', false).show('fast');
			$('#space_after_login_password').show('fast');
			$('#password_reset').show('fast');
			$('#space_after_password_reset').show('fast');
			$('#login_title').text(login_title);
			$('#password_reset_request').val(false);
			$(this).unbind('click.betatrek.temporary');
		})
	});
	
	// modal login window
	bindModalToLink($('#login_button'), $('#login'), $('body'), function() {
		// Copy the email address entered in the "begin here" form
		$('#login_email').val($('#signup_email').val());
	});
	
	// modal create account window
	bindModalToLink($('#begin_account_creation'), $('#creation'), $('body'), function() {
		// Copy the email address and password entered in the "begin here" form
		$('#creation_email').val($('#signup_email').val());
		$('#creation_password').val($('#signup_password').val());
	});
	
	// auto scroll to make sign up box visible on sign up page
	if ($('body').hasClass('signUpPage')) {
		scrollToElement($('#signup'));
	}

	// Function for binding a modal window to open when an object is pressed
	function bindModalToLink($link, $modal, $body, $initializer) {
		$link.click(function(evt) {
            evt.preventDefault();

			if ($initializer) { $initializer(); }
            $modal.addClass('intermediate');
            setTimeout(function() {
                $modal.addClass('active');
            }, 50);

            //$modal.find('input').first().focus();
            $modal.find('.close').click(function(evt) {
                evt.preventDefault();
                close();
            });

            $modal.find('form').submit(function(evt) {
                close();
            });

            $body.keyup(function(evt) {
                if(evt.keyCode === 27) { // ESC key
                    close();
                }
            });
			
        });

		function close() {
            $modal.addClass('minimise')
            $modal.removeClass('active');
            setTimeout(function() {
                $modal.removeClass('intermediate minimise');
            }, 550);
            $body.unbind('keyup');
            $modal.find('.close').unbind('click');
        }
	}
	
	// Function for adding a duplicate row to a subsection of the portfolio form, with incremented
	// ids
	function portfolioRowFocus() {
		skip_button.hide();
		continue_button.show();
		
		// Adds a new row to the form when last row of a section is entered
		var parent = $(this).parent();
		if (parent.hasClass('last_row')) { 
			var row = parent.clone(),
			    children = row.children()
				index = parseInt(children.first().attr('for').match(INDEX_REGEX)) + 1,
				new_id;
			children.each(function() {
				if ($(this).is('label')) {
                	$(this).attr('for', $(this).attr('for').replace(INDEX_REGEX, index));
				} else {
					new_id = $(this).attr('id').replace(INDEX_REGEX, index);
					$(this).attr('id', new_id).focus(portfolioRowFocus);;
				}
            });
			//parent.append("and");
			parent.removeClass('last_row'); 
			row.addClass('last_row');
			parent.after(row);
		}
	}
	
	function scrollToElement($element) {
		// makes the element visible above the fold
		var win_height = $(window).height(),
			fold       = win_height,
			element_height = $element.height(),
			element_bottom = element_height + $element.offset().top;
		if (fold <= element_bottom) {
			$('html, body').animate({
				scrollTop: element_bottom - fold + 25 
			}, 2500);
		}
		// interrupt animation on scroll or click
		var stopScrollAnimation = function() {$('html, body').stop();},
		    lastScrollTop = 0;
		$(window).click(stopScrollAnimation).scroll(function(){
		   	var st = $(this).scrollTop();
			// if user changes scroll direction stop scroll animation
		   	if (st < lastScrollTop){
		    	stopScrollAnimation();
		   	}
		   	lastScrollTop = st;
		});
	}
});
