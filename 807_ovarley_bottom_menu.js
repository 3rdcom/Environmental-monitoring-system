$(function(){
	// スクロールバーの横幅を取得
	//htmlの最後にオーバーフローをしたらスクロールするdivを設置
	$('body').append('<div class="ht_go_scrollbar" style="overflow:scroll;"></div>');
	//全面幅からdivを引いてスクロールバーの幅を取得
	var ht_go_scrollsize = window.innerWidth - $('.ht_go_scrollbar').prop('clientWidth');
	//divを非表示にする
	$('.ht_go_scrollbar').hide();
	//縦のスクロールバーを常に表示する
	//$('body').addClass('ht_go_scrollbar-y-on');
	//クリック判定フラグを０に設定
	var ht_go_click_flg = "0";
	//「.ht_go_modal-a」をクリックしたときの処理
	$(document).on("click",".ht_go_modal-a",function(){
		if(ht_go_click_flg == "0"){
			//bodyを固定（fixedにする）
			scrollpos = $(window).scrollTop();//現在表示位置
			$('body').addClass('ht_go_modal-fixed').css({'top': -scrollpos});
			//オーバーレイ用の要素を追加
			$('body').append('<div class="ht_go_modal-overlay"></div>');
			//オーバーレイをフェードイン
			$('.ht_go_modal-overlay').fadeIn('slow');
			//モーダルコンテンツのIDを取得
			var modal = '#' + $(this).attr('data-target');
			//モーダルコンテンツを囲む要素を追加
			$(modal).wrap('<div data-target="ht_go_menu-content" class="ht_go_modal-wrap ht_go_modal-a ht_go_modal-open"></div>');
			//モーダルコンテンツを囲む要素を表示
			$('.ht_go_modal-wrap').show();
			//モーダルコンテンツフェードイン
			$(modal).fadeIn('slow');
			//モーダルコンテンツをクリックした時はフェードアウトしない
			$(modal).click(function(e){
			    e.stopPropagation();
			});
			//スクロールバーの表示非表示
			//スクロースバーを全部非表示にする
			$('body').addClass('ht_go_nonscrollbar');
			//縦スクロールバー表示のクラスを削除
			$('body').removeClass('ht_go_scrollbar-y-on');
			//オーバーレイに縦スクロールバー表示
			$('.ht_go_modal-overlay').addClass('ht_go_scrollbar-y-on');
			//openとcloseを入れ替える
			$('.ht_go_modal-a').removeClass('ht_go_modal-open');
			$('.ht_go_modal-a').addClass('ht_go_modal-close');
			//クリック判定フラグを１に設定
			ht_go_click_flg = "1";
       }else if(ht_go_click_flg == "1"){
       		
			// モーダルコンテンツのIDを取得
			var modal = '#' + $(this).attr('data-target');
			// モーダルコンテンツとオーバーレイをフェードアウト
			$(modal).addClass('ht_go_nonscrollbar');
			$(modal).fadeOut('slow');
			$('.ht_go_modal-overlay').fadeOut('slow',function(){
			    // html、bodyの固定解除
			    $('body').removeClass('ht_go_modal-fixed').css({'top': 0});
			    // オーバーレイを削除
			    $('.ht_go_modal-overlay').remove();
			    // モーダルコンテンツを囲む要素を削除
			    $(modal).unwrap('<div data-target="ht_go_menu-content" class="ht_go_modal-wrap ht_go_modal-a ht_go_modal-open"></div>');
			    //表示位置調整
			    window.scrollTo( 0, scrollpos ) ;
			});
			//openとcloseを入れ替える
			$('.ht_go_modal-a').removeClass('ht_go_modal-close');
			$('.ht_go_modal-a').addClass('ht_go_modal-open');
			//スクロールバーの表示非表示
			$(modal).removeClass('ht_go_nonscrollbar');
			$('body').removeClass('ht_go_nonscrollbar');
			$('body').addClass('ht_go_scrollbar-y-on');
			//クリック判定フラグを初期化
			ht_go_click_flg = "0";
		}
    });
});