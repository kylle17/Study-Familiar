
function module_jqxgrid( grid_name , settings , columns , source ){


    let $jqxgrid = $("#"+grid_name);
    let local_settings ;
    let local_columns ;
    let local_source ;
    let local_dataAdapter ;
    let click_func = function(){};
    let selected_row ;


    (function(){
        local_settings = settings;
        local_columns = columns;
        local_source = source;
        local_source.localdata = add_empty_row(local_source.localdata);
        local_dataAdapter = new $.jqx.dataAdapter(local_source);

        local_settings.columns = local_columns;
        local_settings.source = local_dataAdapter;

        $jqxgrid.jqxGrid( local_settings );
    })();


    let reset = function(){
        let data = add_empty_row([]);
        local_source.localdata = data;
        local_dataAdapter.dataBind();
//        $jqxgrid.jqxGrid('clear');
        $jqxgrid.jqxGrid('clearselection');
    }


    let set_data = function(data){
        local_source.localdata = data;
        local_dataAdapter.dataBind();
    }


    let get_data_all = function(){
        return $jqxgrid.jqxGrid('getrows');
    }


    $jqxgrid.on('rowclick', function (event){
        let rowindex = event.args.rowindex;
        selected_row = $jqxgrid.jqxGrid('getrowdata', rowindex );
    });
    let get_selected_row = function(){
        return selected_row;
    }


    let get_selected_rows = function(){
        let selected_rows = get_selected_rows_with_rowindexes();
        if( selected_rows.length < 1 ) selected_rows = get_selected_rows_with_cells();
        return selected_rows;
    }


    let addClickEvent = function(receive_click_func){
        this.click_func = receive_click_func;
    }




    function get_selected_rows_with_rowindexes(){
        let selected_rows = [];
        let selected_row_indexes = $jqxgrid.jqxGrid('getselectedrowindexes');
        selected_row_indexes.forEach(function(selected_row_indexe){
            selected_row = $jqxgrid.jqxGrid('getrowdata', selected_row_indexe );
            selected_rows.push(selected_row);
        });
        return selected_rows;
    }




    function get_selected_rows_with_cells(){
        let selected_rows = [];
        let selected_cells = $jqxgrid.jqxGrid('getselectedcells');
        selected_cells.forEach(function(selected_cell){
            let selected_row_index = selected_cell.rowindex ;
            selected_row = $jqxgrid.jqxGrid('getrowdata', selected_row_index );
            selected_rows.push(selected_row);
        });
        return selected_rows;
    }





    function add_row(){
        let rows =  $jqxgrid.jqxGrid('getrows');
        let selected_cell = $jqxgrid.jqxGrid('getselectedcell');
        let selected_row_index = selected_cell.rowindex;
        let selected_row_data = $jqxgrid.jqxGrid('getrowdata', selected_row_index );

        let new_row = JSON.parse(JSON.stringify(selected_row_data));
        new_row.id = "";
        new_row.question = "";
        new_row.answer = "";
        rows.splice(  selected_row_index , 0 ,  new_row );
        set_data(rows);

        $jqxgrid.jqxGrid('clearselection');
        $jqxgrid.jqxGrid('selectcell', selected_row_index , selected_cell.datafield );
    }




    function up_row(){
        let rows =  $jqxgrid.jqxGrid('getrows');
        let selected_cell = $jqxgrid.jqxGrid('getselectedcell');
        let selected_row_index = selected_cell.rowindex;
        let selected_row_data = $jqxgrid.jqxGrid('getrowdata', selected_row_index );
        rows.splice(  selected_row_index-1 , 0 ,  selected_row_data );
        rows.splice(  selected_row_index+1 , 1 );
        set_data(rows);
        $jqxgrid.jqxGrid('clearselection');
        $jqxgrid.jqxGrid('selectcell', selected_row_index-1 , selected_cell.datafield );
    }



     function down_row(){
         let rows =  $jqxgrid.jqxGrid('getrows');
         let selected_cell = $jqxgrid.jqxGrid('getselectedcell');
         let selected_row_index = selected_cell.rowindex;
         let selected_row_data = $jqxgrid.jqxGrid('getrowdata', selected_row_index );
         rows.splice(  selected_row_index+2 , 0 ,  selected_row_data );
         rows.splice(  selected_row_index , 1 );
         set_data(rows);
         $jqxgrid.jqxGrid('clearselection');
         $jqxgrid.jqxGrid('selectcell', selected_row_index+1 , selected_cell.datafield );
     }




     function select_row( index ){
        // row 클릭
        $jqxgrid.jqxGrid('selectrow', index );
        selected_row = $jqxgrid.jqxGrid('getrowdata', index );
        // cell 클릭
        let datafield = local_columns[local_columns.length-1].datafield;
        $jqxgrid.jqxGrid('selectcell', index , datafield );
     }






    function add_empty_row(receive_data){
        for(let i=0 ; i<15 ; i++){
            receive_data.push({});
        }
        return receive_data;
    };



    return {
        reset : reset ,
        set_data : set_data ,
        get_data_all : get_data_all ,
        get_selected_row : get_selected_row ,
        get_selected_rows : get_selected_rows ,
        add_row : add_row ,
        up_row : up_row  ,
        down_row : down_row  ,
        select_row : select_row ,
    };
}