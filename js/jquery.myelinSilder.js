/*
* 	MyelinSlider v0.7
*  Mokgoon 2014.04.25
*  mokgoon@gmail.com
*  http://www.mokgoon.com
* 
*/

(function($){
	
	$.fn.myelinSlider = function(obj){
		
		
		function f() { 
		   var args = [].slice.call( arguments, 1, 3); //배열의 slice() 메서드를 빌려 쓴다. 
		   return args; 
		} 
		
		function Elems(){};												// 객체 생성
		var firstOnBoolean;												//	전역변수 생성
		var autoSlider;
		
		// 기본 정의
		var defaults = {
			mode : 'fade',
			item : 5,
			direction : 'down',
			auto : false,
			speed : 3000
		}
		
		var add = {
			type : obj.type,
			direction : obj.direction,
			auto : obj.auto,
			speed : obj.speed,
			dataImg : this.children().eq(0).children(),
			dataTxt : this.children().eq(1).children(),
		    dataImgLen : this.children().eq(0).children().length,
		    item : this.children().eq(1).children().length,
		    targetImg : this.children().eq(0).children().children(),
		    targetTxt : this.children().eq(1).children().children()
		}
		
		 var con = $.extend(defaults, add);
		
				
		// 슬라이드 이미지와, 텍스트의 갯수가 일치 하지않을때, 경고 창알림
		if(con.dataImgLen !== con.item) errorFunction('배너이미지와 텍스트의 개수가 일치하지 않습니다.');
		// 텍스트 첫번째에 on 클래스가 있는지 확인
		firstOnBoolean = $(con.dataTxt).eq(0).hasClass('on');
		// 없으면 추가해준다.
		if(!firstOnBoolean) $(con.dataTxt).eq(0).addClass('on');
		
		// 텍스트에 hover 이벤트가 발생시 실행
		$(con.dataTxt).hover(
			function() {
				con.auto = false;
				clearInterval(autoSlider);
				
				if($(con.dataTxt).hasClass('on')) $(con.dataTxt).removeClass('on');
				$(this).addClass('on');
				var tagetNm = $(this).children()[0].className;
				
				for(var i = 0; i < con.dataImgLen; i++){
					if(tagetNm == con.targetImg[i].id){
						$('#'+con.targetImg[i].id).show();
					}else{
						$('#'+con.targetImg[i].id).hide();
					}
				}
			}, function(){
				autoSlider = setInterval(mgSlider,con.speed);
			}
		);
		
		// auto 가 true일때
		if(con.auto){
			autoSlider = setInterval(mgSlider,con.speed);
		}
		
		function mgSlider(){
			for(var k = 0; k < con.item; k++){
				if(con.dataTxt.eq(k).hasClass('on')){
					con.dataTxt.eq(k).removeClass('on');
					$('#'+con.targetImg[k].id).hide();
					k++
					if(!con.dataTxt.eq(k).hasClass('on')){
						con.dataTxt.eq(k).addClass('on');
						if(k == con.item){
							$(con.dataTxt).eq(0).addClass('on'); 
							$('#'+con.targetImg[0].id).show();
						}else{
							// console.log($('#'+con.targetImg[k].id));
							$('#'+con.targetImg[k].id).show();
						}
					}
				}
			}
		}
		
		// console.error
		function errorFunction(msg){
			console.error(msg);
		};
	}
	
})(jQuery);