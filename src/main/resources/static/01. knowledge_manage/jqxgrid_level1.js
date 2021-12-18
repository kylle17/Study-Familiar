

function make_jqxgrid_level1() {

    return module_jqxgrid( "jqxgrid_level1" , settings() , columns() , source() );

    function settings(){
        return {
            /* 디자인 */
            theme: 'office', // 테마
            width: '360px',	// 넓이
            height: '320',	// 높이

            /* 기능 */
            editable: true, // cell 데이터 수정가능
            selectionmode: 'singlecell' ,
            altrows: true,
        };
    }

    function columns(){
        return [
            { text: '대분류', datafield: 'level1', width: 340, align: 'center', cellsalign: 'left' },
       ];
    }

    function source(){
        return {
            localdata: [],
            datatype: "array"
        };
    }






















}