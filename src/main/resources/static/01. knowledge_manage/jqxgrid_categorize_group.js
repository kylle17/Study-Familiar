

function make_jqxgrid_categorize_group() {

    return module_jqxgrid( "jqxgrid_categorize_group" , settings() , columns() , source() );

    function settings(){
        return {
            /* 디자인 */
            theme: 'office', // 테마
            width: '170px',	// 넓이
            height: '320',	// 높이

            /* 기능 */

            selectionmode: 'singlerow' ,
            altrows: true,
        };
    }

    function columns(){
        return [
            { text: '그룹', datafield: 'categorize_group', width: 150, align: 'center', cellsalign: 'left' },
       ];
    }

    function source(){
        return {
            localdata: [],
            datatype: "array"
        };
    }






















} ;