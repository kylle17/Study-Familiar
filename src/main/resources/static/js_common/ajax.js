

async function ajax_call( url , type , send_data , callback_function ){

	let result ;

	await $.ajax({
		type : type ,
		url : url,
		data : send_data,
		contentType: 'application/json', // 보내는 데이터의 종류
		dataType : "application/json", // 받는 데이터의 종류
		beforeSend: function(){
			// 조회 , 저장 , 삭제 버튼 잠그기
		},
		success : function ( data ){
			result = data;
			callback_function();
		},

		error: function(xhr, textStatus, errorThrown) {
			error_swal(xhr);
			return;
		}

    });
	return result;
};






function sync_ajax_call( url , type , send_data ){

	let result = null;

	$.ajax({
		type : type,
		url : url,
		data : send_data,
		contentType: 'application/json',
		dataType : "json",
		async : false,
		beforeSend: function(){
			// 조회 , 저장 , 삭제 버튼 잠그기
		},
		success : success_func,
		error: error_func
    });

	return result;


	function success_func(data){
		result = data;
	};

	function error_func( xhr, textStatus, errorThrown ){


	}


};



















