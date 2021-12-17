

function make_jqxgrid_level1() {

    return module_jqxgrid( "jqxgrid_level1" , settings() , columns() , source() );

    function settings(){
        return {
            /* 디자인 */
            theme: 'office', // 테마
            width: '100%',	// 넓이
            height : 100 ,

            /* 기능 */

            selectionmode: 'singlerow' ,
            altrows: true,
        };
    }

    function columns(){
        return [
            { text: '대분류', datafield: 'level1', width: 250, cellheight : 100 , align: 'center', cellsalign: 'left' },
       ];
    }

    function source(){
        return {
            localdata: [],
            datatype: "array"
        };
    }






















}