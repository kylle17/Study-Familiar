

function make_jqxgrid_knowledge() {

    return module_jqxgrid( "jqxgrid_knowledge" , settings() , columns() , source() );

    function settings(){
        return {
            /* 디자인 */
            theme: 'office', // 테마
            width: '1790',	// 넓이
            height: '100%',	// 높이

            /* 기능 */
            editable: true, // cell 데이터 수정가능

            selectionmode: 'multiplecellsextended' ,
            altrows: true,
        };
    }

    function columns(){
        return [
            { text: '대분류', datafield: 'level1', width: 200, align: 'center', cellsalign: 'left' },
            { text: '중분류', datafield: 'level2', width: 400, align: 'center', cellsalign: 'left' },
            { text: '정렬', datafield: 'order_num', width: 40, align: 'center', cellsalign: 'right' },
            { text: '그룹', datafield: 'categorize_group', width: 100, align: 'center', cellsalign: 'left' },
            { text: '문제유형', datafield: 'categorize', width: 110, align: 'center', cellsalign: 'center' },
            { text: '질문', datafield: 'question', width: 400, align: 'center', cellsalign: 'left'  },
            { text: '답', datafield: 'answer', width: 450, align: 'center', cellsalign: 'left' },
       ];
    }

    function source(){
        return {
            localdata: [],
            datatype: "array"
        };
    }




    let $reset_bnt = document.getElementById('reset');
    let $select_bnt = document.getElementById('select');
    let $insert_bnt = document.getElementById('insert');
    let $delete_bnt = document.getElementById('delete');

    $reset_bnt.addEventListener('click' , function(){
        jqxgrid_knowledge.reset();
    });

    $select_bnt.addEventListener('click' , function(){
        let send_data = {};
        let receive_data = sync_ajax_call( "knowledge" , "get" , send_data );
        jqxgrid_knowledge.set_data(receive_data);
    });

    $insert_bnt.addEventListener('click' , function(){
        let send_data = jqxgrid_knowledge.get_data_all();
        send_data.forEach(function(element,index){
            console.log(element);
            console.log(index);
        });
        //let receive_data = sync_ajax_call( "knowledge" , "post" , JSON.stringify(send_data) );
    });

















}