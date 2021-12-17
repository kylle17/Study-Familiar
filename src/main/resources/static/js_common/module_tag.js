


function make_selectTag( selectTag_id ){

    let $selectTag = document.getElementById(selectTag_id);



    function fill_selectTag( data_arr ){
        $selectTag.options.length = 0;
        data_arr.forEach(function(element){
            let $option = document.createElement("option");
            $option.value = element;
            $option.textContent = element;
            $selectTag.append($option)
        });
    }


    function select_selectTag( data ){
        for(let i=0 ; i<$selectTag.length ; i++){
            let $option = $selectTag.options[i]
            if( $option.value === data ) $option.selected = true;
        }
    }


    function get_selected_value(){
        return $selectTag.options[$selectTag.selectedIndex].value;
    }


    return {
        fill_selectTag : fill_selectTag ,
        select_selectTag : select_selectTag ,
        get_selected_value : get_selected_value ,
    }



}