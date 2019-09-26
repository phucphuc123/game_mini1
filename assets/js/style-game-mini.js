jQuery(function($){

	var time = ( Math.floor(Math.random() * 10) + 1 ) * 500;
	var right_pixel = 130;
	var pos_left = 1170 + 250;

	var text_gift = $('.wrap-game-mini-gift').html();

	var total = 0;
	var point_ok = 100;
	var point_not = 10;

	var ar_house = [];

	ar_house[0] = [200,270];
	ar_house[1] = [440,490];
	ar_house[2] = [745,795];
	ar_house[3] = [905,955];

	var start_begin = 0;

	// s
	var time_df = 15;
	var time_game = time_df + 1;

	var end_time = false;


	$(document).on('click', '.game-mini-gift:not(.down)', function(){


		//alert( $(this).position().left + ' ' +  $(this).position().top );
		//alert('f');

		var left_gift =  $(this).position().left;
		var right_gift = eval( $(this).position().left ) + 57;
			console.log('Left_gift: ' +  left_gift);

		var check_apply = 0;

		$(this).css({'left': left_gift + 'px', 'pointer-events': 'none' }).addClass('down');

		//game_down( $(this), 66 , 1000 );


		$('.game-point-status-ok').removeClass('jump').hide();
		$('.game-point-status-not').removeClass('jump').hide();

		for( var i = 0; i < ar_house.length; i++ ) {

			if (  (ar_house[i][0] <= left_gift && left_gift <= ar_house[i][1] ) || (ar_house[i][0] <= right_gift && right_gift <= ar_house[i][1] )    ){

				console.log('Số i apply: ' +  i);


				check_apply++;
				break;

			}

		}

		console.log('check_apply: ' +  check_apply);


		if ( check_apply  ) {
			total += eval(point_ok);
 
			$('.game-point-status-ok').show().addClass('jump');
	
		} else {
			// if (  total > 0 || total < 0 ) {
			// total -= eval(point_not);
			// } else {
			// 	total = -10;
			// }

			total -= eval(point_not);

			$('.game-point-status-not').show().addClass('jump');
		}

		$('.game-point-1 span').html( total );

	});





	function add_gift( time, time_games ){

		if ( end_time == true ) return;

		setTimeout(function(){

			var time_new = ( ( Math.floor(Math.random() * 10) + 1 ) * 500 );

			console.log( 'time_new: ' + time_new );

			$('.div-wrap-game-mini').append( text_gift );
			
			add_gift( time_new );

		}, time );


	}



	function result_mess( total ){
		var mess = "";
		if ( total <= 0 ) {
			mess = "Oh Nooooooo !";

		}
		else if ( total < 500 ){
			mess = "Good job";
		}
		else if ( total < 1000 ){
			mess = "Congratulation !";
		}
		else {
			mess = "Professional !";
		}

		return mess;

	}

	function show_result(){
		$('.game-mini-overlay').show();

		$('.game-mini-result-mess').html( result_mess( total ) );
		$('.game-mini-result-points').html( total + ' ' + 'points' );



		$('.game-mini-result').show();

	}

	function hide_result(){
		$('.game-mini-overlay').hide();

		$('.game-mini-result-mess').html('');
		$('.game-mini-result-points').html('');


		$('.game-point-status-ok').removeClass('jump').hide();
		$('.game-point-status-not').removeClass('jump').hide();


		total = 0;
		time_game = time_df;

		$('.game-point-1 span').html( 0 );


		$('.game-time-1').html( time_game );

		$('.div-wrap-game-mini .game-mini-gift').remove();

		$('.game-mini-result').hide();

	}

	function Now_time_step(){

		var time_step = setInterval(function(){


			time_game = time_game - 1;
			
			$('.game-time-1').html( time_game );

			

			if ( time_game == 0 ) {

				end_time = true;
				clearInterval( time_step );

				show_result();

			}

		},1000);

		add_gift(  ( ( Math.floor(Math.random() * 10) + 1 ) * 500 )  );

	}

	

	$('.game-mini-result-begin').click(function(){
		hide_result();
		end_time = false;
		Now_time_step();

	})

	


	$('.div-wrap-game-mini-begin').click(function(){
		$(this).hide();
		$('.div-wrap-game-mini').show();
		Now_time_step();
	})

	//	add_gift(  ( ( Math.floor(Math.random() * 10) + 1 ) * 500 ) , time_game  );

	


})

