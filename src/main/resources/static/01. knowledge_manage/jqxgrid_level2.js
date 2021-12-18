

function make_jqxgrid_level2() {

    return module_jqxgrid( "jqxgrid_level2" , settings() , columns() , source() );

    function settings(){
        return {
            /* 디자인 */
            theme: 'office', // 테마
            width: '470px',	// 넓이
            height: '320',	// 높이

            /* 기능 */
            editable: true, // cell 데이터 수정가능
            selectionmode: 'singlerow' ,
            altrows: true,
        };
    }

    function columns(){
        return [
            { text: '중분류', datafield: 'level2', width: 450, align: 'center', cellsalign: 'left' },
       ];
    }

    function source(){
        return {
            localdata: [],
            datatype: "array"
        };
    }






















} ;