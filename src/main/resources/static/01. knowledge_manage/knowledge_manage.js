

window.addEventListener('load', function(){


    let jqxgrid_level1 = make_jqxgrid_level1();
    let jqxgrid_level2 = make_jqxgrid_level2();
    let jqxgrid_categorize_group = make_jqxgrid_categorize_group();
    let jqxgrid_knowledge = make_jqxgrid_knowledge();

    let current_selected_row_indexes = {};

    let receive_data_level1 ;
    let receive_data_level2 ;
    let receive_data_categorize_group ;
    let receive_data_knowledge ;


    let $id = document.getElementById('id');
    let $level1 = document.getElementById('level1');
    let $level2 = document.getElementById('level2');
    let $order_num = document.getElementById('order_num');
    let $categorize_group = make_selectTag('categorize_group');
    let $categorize = make_selectTag('categorize');
    let $question = document.getElementById('question');
    let $answer = document.getElementById('answer');




    data_into_selectTag();
    selectTag_addEvent();
    current_selected_row_indexes = {
         jqxgrid_level1 : 0 ,
         jqxgrid_level2 : 0 ,
         jqxgrid_categorize_group : 0 ,
    };
    re_select_all_grid();





    $("#jqxgrid_level1").on('rowclick', function (event){
        current_selected_row_indexes.jqxgrid_level1 = jqxgrid_level1.get_selected_row().boundindex;

        select_level2();
        jqxgrid_level2.select_row(current_selected_row_indexes.jqxgrid_level2);

        select_categorize_group();
        jqxgrid_categorize_group.select_row(current_selected_row_indexes.jqxgrid_categorize_group);

        select_knowledges();
    });





        let $level1_insert_bnt = document.getElementById("level1_insert_bnt");
        $level1_insert_bnt.addEventListener('click',function(){

            if( !confirm('정말 저장하시겠습니까? ') ) return;

            let send_data = [];
            let before_data = receive_data_level1;
            let after_data = jqxgrid_level1.get_data_all();


            before_data.forEach(function(before_data_element , index){
                let after_data_element = after_data[index];
                if( !(before_data_element.level1 === after_data_element.level1 ) ){
                    let json_obj = { before_level1 : before_data_element.level1 ,
                                     after_level1 : after_data_element.level1    };
                    send_data.push(json_obj);
                }
            });

            let receive_data = sync_ajax_call( "level1" , "patch" , JSON.stringify(send_data) );

            detail_reset();
            re_select_all_grid();
            alert('저장이 완료되었습니다.');

        });




    $("#jqxgrid_level2").on('rowclick', function (event){

        current_selected_row_indexes.jqxgrid_level2 = jqxgrid_level2.get_selected_row().boundindex;

        select_categorize_group();

        jqxgrid_categorize_group.select_row(current_selected_row_indexes.jqxgrid_categorize_group);
        select_knowledges();
    });





    let $level2_insert_bnt = document.getElementById("level2_insert_bnt");
    $level2_insert_bnt.addEventListener('click',function(){

        if( !confirm('정말 저장하시겠습니까? ') ) return;

        let send_data = [];
        let level1 = jqxgrid_level1.get_selected_row().level1;
        let before_data = receive_data_level2;
        let after_data = jqxgrid_level2.get_data_all();


        before_data.forEach(function(before_data_element , index){
            let after_data_element = after_data[index];
            if( !(before_data_element.level2 === after_data_element.level2) ){
                let json_obj = { level1 : level1 ,
                                 before_level2 : before_data_element.level2 ,
                                 after_level2 : after_data_element.level2    };
                send_data.push(json_obj);
            }
        });

        let receive_data = sync_ajax_call( "level2" , "patch" , JSON.stringify(send_data) );

        detail_reset();
        re_select_all_grid();
        alert('저장이 완료되었습니다.');

    });




    $("#jqxgrid_categorize_group").on('rowclick', function (event){
        current_selected_row_indexes.jqxgrid_categorize_group = jqxgrid_categorize_group.get_selected_row().boundindex;

        select_knowledges();
    });





    $("#jqxgrid_knowledge").on('rowclick', function (event){
        var row_data = jqxgrid_knowledge.get_selected_row();
        $id.value = row_data.id;
        $level1.value = row_data.level1;
        $level2.value = row_data.level2;
        $order_num.value = row_data.order_num;
        $categorize_group.select_selectTag(row_data.categorize_group);
        fill_categorize_selectTag();
        $categorize.select_selectTag(row_data.categorize);
        $question.value = row_data.question;
        $answer.value = row_data.answer;
    });





    let $knowledge_insert_bnt = document.getElementById("knowledge_insert_bnt");
    $knowledge_insert_bnt.addEventListener('click',function(){

        if( !confirm('정말 저장하시겠습니까? ') ) return;

        let send_data = jqxgrid_knowledge.get_data_all();
        send_data = empty_row_remove(send_data);
        let receive_data = sync_ajax_call( "knowledges" , "post" , JSON.stringify(send_data) );
        detail_reset();
        re_select_all_grid();
        alert('저장이 완료되었습니다.');

    });




    let $knowledge_delete_bnt = document.getElementById("knowledge_delete_bnt");
    $knowledge_delete_bnt.addEventListener('click',function(){

        if( !confirm('정말 삭제하시겠습니까? ') ) return;

        let send_data = [];
        let = selected_rows = jqxgrid_knowledge.get_selected_rows();
        console.log( selected_rows );
        selected_rows.forEach( selected_row => send_data.push(selected_row.id) );

        console.log( typeof send_data[0] );
        console.log( send_data );

        let receive_data = sync_ajax_call( "knowledges" , "delete" , JSON.stringify(send_data) );

        detail_reset();
        re_select_all_grid();
        alert('저장이 완료되었습니다.');

    });





    let $add_row_bnt = document.getElementById("add_row");
    $add_row_bnt.addEventListener('click',function(){
        jqxgrid_knowledge.add_row();
    });



    let $row_up_bnt = document.getElementById("row_up");
    $row_up_bnt.addEventListener('click',function(){
        jqxgrid_knowledge.up_row();
    });





    let $row_down_bnt = document.getElementById("row_down");
    $row_down_bnt.addEventListener('click',function(){
        jqxgrid_knowledge.down_row();
    });






    let $detail_reset_bnt = document.getElementById("detail_reset_bnt");
    $detail_reset_bnt.addEventListener('click',function(){
        detail_reset();
    });





    let $detail_insert_bnt = document.getElementById("detail_insert_bnt");
    $detail_insert_bnt.addEventListener('click',function(){

        if( !confirm('정말 저장하시겠습니까? ') ) return;

        let send_data = {
             id :  $id.value ,
             level1 :  $level1.value ,
             level2 :  $level2.value ,
             order_num :  $order_num.value ,
             categorize_group :  $categorize_group.get_selected_value() ,
             categorize :  $categorize.get_selected_value() ,
             question :   enter_change_for_saving_DB($question.value) ,
             answer :  $answer.value ,
        }
        let receive_data = sync_ajax_call( "knowledge" , "post" , JSON.stringify(send_data) );
        detail_reset();
        re_select_all_grid();
        alert('저장이 완료되었습니다.');

    });






    let $detail_delete_bnt = document.getElementById("detail_delete_bnt");
    $detail_delete_bnt.addEventListener('click',function(){
        if( !confirm('정말 삭제하시겠습니까? ') ) return;
        let send_data = $id.value ;
        sync_ajax_call( "knowledge" , "delete" , JSON.stringify(send_data) );
        detail_reset();
        re_select_all_grid();
        alert('삭제가 완료되었습니다.');
    });





    function data_into_selectTag(){
        let categorize_group_data = sync_ajax_call( "common?categorize=categorize_group" , "get" , {} );
        $categorize_group.fill_selectTag(categorize_group_data);
        fill_categorize_selectTag();
    };




    function selectTag_addEvent(){
        let $categorize_group_selectTag = document.getElementById('categorize_group');
        $categorize_group_selectTag.addEventListener('click',function(element){
            fill_categorize_selectTag();
        });
    };




    function fill_categorize_selectTag(){
        let send_data = $categorize_group.get_selected_value();
        let categorize_data = sync_ajax_call( encodeURI("common?categorize="+send_data) , "get" , {} );
        $categorize.fill_selectTag(categorize_data);
    }





    function select_level1(){
        receive_data_level1 = sync_ajax_call( "level1" , "get" , {} );
        let receive_data = add_empty_row(receive_data_level1);
        jqxgrid_level1.set_data(receive_data);
    }





    function select_level2(){
        let level1 = jqxgrid_level1.get_selected_row().level1;
        receive_data_level2 = sync_ajax_call( "level2?level1="+level1 , "get" , {} );
        let receive_data = add_empty_row(receive_data_level2);
        jqxgrid_level2.set_data(receive_data);
    }





    function select_categorize_group(){
        let level1 = jqxgrid_level1.get_selected_row().level1;
        let level2 = jqxgrid_level2.get_selected_row().level2;
        receive_data_categorize_group = sync_ajax_call( encodeURI("categorize_group?"+"level1="+level1+"&level2="+level2) , "get" , {} );
        let receive_data = add_empty_row(receive_data_categorize_group);
        jqxgrid_categorize_group.set_data(receive_data);
    }




    function select_knowledges(){
        let level1 = jqxgrid_level1.get_selected_row().level1;
        let level2 = jqxgrid_level2.get_selected_row().level2;
        let categorize_group = jqxgrid_categorize_group.get_selected_row().categorize_group;
        let receive_data_knowledges = sync_ajax_call( encodeURI("knowledge?"+"level1="+level1+"&level2="+level2+"&categorize_group="+categorize_group) , "get" , {} );
        let receive_data = add_empty_row(receive_data_knowledges);
        jqxgrid_knowledge.set_data(receive_data);
    }






    function re_select_all_grid(){
        select_level1();

        jqxgrid_level1.select_row(current_selected_row_indexes.jqxgrid_level1);
        select_level2();

        jqxgrid_level2.select_row(current_selected_row_indexes.jqxgrid_level2);
        select_categorize_group();

        jqxgrid_categorize_group.select_row(current_selected_row_indexes.jqxgrid_categorize_group);
        select_knowledges();
    }





    function add_empty_row(receive_data){
        for(let i=0 ; i<10 ; i++){
            receive_data.push({});
        }
        return receive_data;
    };





    function empty_row_remove(send_data){
        for(let i=0 ; i<send_data.length ; i++){
            let element = send_data[i];
            if( !element.level1 || !element.level2 ){
                send_data.splice( i , 1 );
                i--;
            }
        };
        return send_data;
    };



    function enter_change_for_saving_DB( value ){
        value.replace("\r\n","<br>")
        return value;
    }










    function detail_reset(){
        $id.value = '';
        $order_num.value = '';
        $question.value = '';
        $answer.value = '';
    }








});