$(function() {

	$('.logo-litera').each(function() {
		var ths = $(this);
		ths.html(ths.html().replace('B', '<span>B</span>'));
	});

	$('.search').click(function(){
		$('.search-field').stop().slideToggle();
		$('.search-field input[type=text]').focus();
	});

	$(document).keyup(function(e){
		if(e.keyCode == 27){
			$('.search-field').slideUp();
		}
		
	}).click(function(){
		$('.search-field').slideUp();
	});
	$('.search-wrap').click(function(e) {
		e.stopPropagation();
	});


	$('.top-line').after('<div class="mobile-menu d-lg-none">');
	$('.top-menu').clone().appendTo('.mobile-menu');
	$('.mobile-menu-button').click(function() {
		$('.mobile-menu').stop().slideToggle();
	});

	$('.col-item').hover(function(){
		ths = $(this);
		lnk = ths.closest('.col-item').find('h4 a');
		lnk.addClass('hover');
	}, function(){
		lnk.removeClass('hover');
	});

	$("body").prognroll({
		height: 3,
		color: "#ec1c1c",
		custom: false
	});

	$('.main-menu li').removeClass('active');
	var path = window.location.pathname;
	$('.main-menu li a').each(function() {
		var href = $(this).attr('href');
		if(path.slice(1).substring(0, href.length) === href) {
			$(this).parent('li').addClass('active');
		}
	});
	//логика кнопки вверх!
	let btnUp = $('.btn-up');
	$(window).on('scroll',() => {
		if ($(this).scrollTop() >= 500) {
			btnUp.fadeIn();
		}
		else {
			btnUp.fadeOut();
		}
	})

	btnUp.on('click', (e) => {
		e.preventDefault();
		$('html').animate({scrollTop: 0}, 1000);
	})

	//логика форматировщика кода
	$('.sql-code-formatter').each(function() {
		var codeText = $(this);
		var newText;
		var commentText;

		//commentText = codeText.html().replace(/s/);
		//добавляем перевод строки после ; 
		//newText = codeText.html().replace(/;/g, ';<br>') // между / / указываем какой символ искать, g - указывает чтобы нужно менять все найденные символы, не только первый
		
		//добавляем цвет комментариев после --
		newText = codeText.html().replace(/--.*/g, '<span style="color: green">$&</span>') //$& - совпавшая подстрока, --.* - ищем все символы, после -- до конца строки

		//подстветка для служебных слов
		newText = newText.replace(/select|from|by|group|level|order|on|where|and|alter|drop|set|true|false|update|delete|insert|level|create|grant|sysdba|sys|user|session|tablespace|identified|table/g, '<span style="color: #006395">$&</span>') //$& - совпавшая подстрока

		//#006395 цвет для служебных слов
		//#006300 цвет для цифр
		codeText.html(newText); 



	});

});

