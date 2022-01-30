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


	
	$('img').hover(function() {
		if(this.width*100/this.naturalWidth<80){
			// навели мышь на элемент
			$('img').css('cursor', 'pointer');

		}

	})
	//если картинку можно увеличить, сменим курсор на указатель
	$('img').hover(function() {
		// //если картинка меньше более чем на 80% от оригинала, то тогда откроем ее при клике
		if(this.width*100/this.naturalWidth<80 ) {
			//alert(this.naturalHeight*100/window.innerHeight)
			$('img').css('cursor', 'pointer');
		}
		else {
			$('img').css('cursor', '');
		}
	 
	});

	//логика кнопки увеличения картинки

	$('img').click(function(event) {
		var i_path = $(this).attr('src');
		//alert(this.naturalWidth + 'x' + this.naturalHeight); // здесь работает
		//alert( window.innerWidth )
		var sizeWidthDiff = this.width*100/this.naturalWidth //процент отличия ширины сжатой картинки от оригинала
		
		
		//если картинка меньше более чем на 80% от оригинала И высота оригинала меньше текущего окна, то тогда откроем ее при клике
		if (sizeWidthDiff<80 ) {

			var openWidth //ширина картинки после нажатия

			//если после клика ширина картинки будет занимать не более 95% ширины экрана, то ок
			if (this.naturalWidth*100/window.innerWidth<95 ) {
				openWidth = this.naturalWidth
			}
			//иначе ширина будет 80% от ширины окна
			else {

				openWidth = window.innerWidth*90/100
			}


			$('body').append('<div id="overlay"></div><div id="full-img"><img width="'+openWidth+'" src="'+i_path+'">');
			$('#full-img').css({
			 left: ($(document).width() - $('#full-img').outerWidth())/2,
			 // top: ($(document).height() - $('#full-img').outerHeight())/2 upd: 24.10.2016
					top: ($(window).height() - $('#full-img').outerHeight())/2
		   	});
			$('#overlay, #full-img').fadeIn('fast');
		} 

	  });
	  
	  $('body').on('click', '#close-popup, #overlay,#full-img', function(event) {
		event.preventDefault();
		$('#overlay, #full-img').fadeOut('fast', function() {
		  $('#close-popup, #full-img, #overlay').remove();
		});
	  });
	//логика форматировщика кода
	$('.sql-code-formatter').each(function() {
		var codeText = $(this);
		var newText;

		//commentText = codeText.html().replace(/s/);
		//добавляем перевод строки после ; 
		//newText = codeText.html().replace(/;/g, ';<br>') // между / / указываем какой символ искать, g - указывает чтобы нужно менять все найденные символы, не только первый


		//newText = newText.replace(/--.*|\/\*.*\*\//g, '<span class="sql-code-formatter-comments">$&</span>') //$& - совпавшая подстрока, --.* - ищем все символы, после -- до конца строки

		newText = codeText.html().replace(/--.*|\/\*.*\*\//g, '<span class="sql-code-formatter-comments">$&</span>') //$1 - первый символ не меняем это будет скобка, запятая или пробел, гланое чтобы не ' т.к. это начало строки, а у нее цвет другой, $2 - само число, его уже меняем


		//подсветку цифр
		newText = newText.replace(/([^\d'\w])(\d+(?!([^<]+<\/)|<\/)|\d+(?=[^<]+<[^\/]+>))/g, '$1<span class="sql-code-formatter-num">$2</span>') //$& - совпавшая подстрока, --.* - ищем все символы, после -- до конца строки

		//newText = codeText.html().replace(/([^\d'\w])([0-9]+)/g, '$1<span class="sql-code-formatter-num">$2</span>') //$1 - первый символ не меняем это будет скобка, запятая или пробел, гланое чтобы не ' т.к. это начало строки, а у нее цвет другой, $2 - само число, его уже меняем


		//подстветка для служебных слов
		keyWord = ['select','from','join','in','or','group','level','order','where','alter','as','end','char','on','and','by','create','to','any','set','sys','user','timestamp','if','for','into','in','index','drop','true','false','update','delete','insert','level','grant','connect','sysdba','global','temporary','replace','session','view','with','default','varchar2','foreign key','string','add', 'constraint','union all','sysdate','like','primary key','declare','rollback','join','execute','interval','between','day','second','begin','loop', 'then','else','commit','exit','when','pragma','number','date','value','tablespace','ex0ecute','serveroutput','references','identity','procedure','partition','desc','over','not','identified','table']

		for (x=0; x<keyWord.length; x++) {
			pattern = "([^A-z]|^)" + keyWord[x] + "(?![A-z])"
	        //pattern =  keyWord[x]

			
			newText = newText.replace(new RegExp(pattern, 'g'), '<span class="sql-code-formatter-keyword">$&</span>')
		}

		//подстветка varchar2
		newText = newText.replace(/'.*'/g, '<span class="sql-code-formatter-varchar">$&</span>') //$& - совпавшая подстрока
		
		
		//VIP replace для end в самом конце
		//newText = newText.replace(/(end)(;)/g, '<span style="color: #006395">$1</span>$2') //$& - совпавшая подстрока


		//добавляем цвет комментариев после 
		//newText = newText.replace(/--.*|\/\*.*\*\//g, '<span class="sql-code-formatter-comments">$&</span>') //$& - совпавшая подстрока, --.* - ищем все символы, после -- до конца строки

		//костыль для удаления лишних тегов спан где комментарии 
		//newText = newText.replace(/(^ *-+.+)( <.+>)(.+)(<.+>)/g, '$1 $3') //$2 и $4 - это лишние теги их удаляем


		//#006395 цвет для служебных слов
		//#006300 цвет для цифр
		codeText.html(newText); 



	});

});

