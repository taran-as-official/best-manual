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

		//commentText = codeText.html().replace(/s/);
		//добавляем перевод строки после ; 
		//newText = codeText.html().replace(/;/g, ';<br>') // между / / указываем какой символ искать, g - указывает чтобы нужно менять все найденные символы, не только первый


		//подсветку цифр
		newText = codeText.html().replace(/([^\d'])([0-9]+)/g, '$1<span style="color: #006300">$2</span>') //$1 - первый символ не меняем это будет скобка, запятая или пробел, гланое чтобы не ' т.к. это начало строки, а у нее цвет другой, $2 - само число, его уже меняем

		
		//подстветка для служебных слов
		newText = newText.replace(/'.*'|select|from| by |group|level| order | on |where| and |alter| as | any | to |index |drop|set|true|false|update|delete|insert|level|create |grant|connect|sysdba| sys | user|session|default|varchar2| char|foreign key| timestamp| into |string| add |constraint|union all|sysdate|primary key|declare| interval| day|second|begin|loop| for | in | if| end | then| else |commit| exit| when|number| date|value|tablespace|references|identity|generated|identified|table/g, '<span style="color: #006395;">$&</span>') //$& - совпавшая подстрока
		
		
		//VIP replace для end в самом конце
		newText = newText.replace(/(end)(;)/g, '<span style="color: #006395">$1</span>$2') //$& - совпавшая подстрока

		//добавляем цвет комментариев после --
		newText = newText.replace(/--.*|\/\*.*\*\//g, '<span style="color: red; font-style: italic">$&</span>') //$& - совпавшая подстрока, --.* - ищем все символы, после -- до конца строки

		//костыль для удаления лишних тегов спан где комментарии 
		newText = newText.replace(/(^ *-+.+)( <.+>)(.+)(<.+>)/g, '$1 $3') //$2 и $4 - это лишние теги их удаляем

		
		//#006395 цвет для служебных слов
		//#006300 цвет для цифр
		codeText.html(newText); 



	});

});

