

window.addEventListener('load', function(){


    let $menu_area = document.getElementById('menu_area');
    let $previous_button_area = document.getElementById('previous_button_area');
    let level1;
    let level2;
    let categorize_group;
    let previous_step ;


    make_level1_tag();
    addEvent_level1_tag();



    let $copy_study_menu = document.getElementById('copy_study_menu');
    $copy_study_menu.addEventListener('click',function(){
        if( !confirm('목록가져오기를 실행하시겠습니까? ') ) return;
        sync_ajax_call( "copy_study_menu?" , "post" , {} );
        alert('목록을 모두 가져왔습니다. ');
        window.location.reload(); // 화면 새로고침
    });



    let $record_reset = document.getElementById('record_reset');
    $record_reset.addEventListener('click',function(){
        if( !confirm('공부기록을 모두 초기화 하시겠습니까? ') ) return;
        sync_ajax_call( "record_reset" , "put" , {} );
        alert('공부기록을 모두 초기화 했습니다. ');
        window.location.reload(); // 화면 새로고침
    });





    $("#jqxgrid_categorize_group").on('rowclick', function (event){
        let level1 = jqxgrid_level1.get_selected_row().level1;
        let level2 = jqxgrid_level2.get_selected_row().level2;
        let categorize_group = jqxgrid_categorize_group.get_selected_row().categorize_group;
        window.open(encodeURI("solve_a_question?level1="+level1+"&level2="+level2+"&categorize_group="+categorize_group));
    });




    function make_level1_tag(){
        let level1_items = sync_ajax_call( "no_study_level1" , "get" , {} );
        level1_items.forEach(function(item){
            let level1_tag = document.createElement('textarea');
            level1_tag.value = item.level1;
            level1_tag.setAttribute( 'class' , 'menu') ;
            $menu_area.append(level1_tag);
        });
    }




    function addEvent_level1_tag(){
        let $level1_tags = document.getElementsByClassName('menu');
        for(let i=0 ; i<$level1_tags.length ; i++ ){
            let $level1_tag = $level1_tags[i];
            $level1_tag.addEventListener('click',function(event){
                level1 = event.target.value;
                previous_step = 'level1';
                $menu_area.textContent = '';
                make_level2_tag();
                addEvent_level2_tag();
                make_previous_button();
                addEvent_previous_button();
            });
        }
    }




    function make_level2_tag(){
        let level2_items = sync_ajax_call( "no_study_level2?level1="+level1 , "get" , {} );
        level2_items.forEach(function(item){
            let level2_tag = document.createElement('textarea');
            level2_tag.value = item.level2;
            level2_tag.setAttribute( 'class' , 'menu') ;
            $menu_area.append(level2_tag);
        });
    }




    function addEvent_level2_tag(){
        let $level2_tags = document.getElementsByClassName('menu');
        for(let i=0 ; i<$level2_tags.length ; i++ ){
            let $level2_tag = $level2_tags[i];
            $level2_tag.addEventListener('click',function(event){
                level2 = event.target.value;
                previous_step = 'level2';
                $menu_area.textContent = '';
                make_categorize_group_tag();
                addEvent_categorize_group_tag();
            });
        }
    }




    function make_previous_button(){
        let previous_button = document.createElement('input');
        previous_button.setAttribute( 'type' , 'button') ;
        previous_button.value = '◀';
        previous_button.setAttribute( 'id' , 'previous_bnt') ;
        $previous_button_area.append(previous_button);
    }




    function addEvent_previous_button(){
        let $previous_button = document.getElementById('previous_bnt');
        $previous_button.addEventListener('click',function(event){
            $menu_area.textContent = '';
            if( previous_step === 'level1' ){
                $previous_button_area.textContent = '';
                make_level1_tag();
                addEvent_level1_tag();
            }
            if( previous_step === 'level2' ){
                previous_step = 'level1';
                make_level2_tag();
                addEvent_level2_tag();
            }

        });
    }




    function make_categorize_group_tag(){
        let categorize_group_items = sync_ajax_call( encodeURI("no_study_categorize_group?"+"level1="+level1+"&level2="+level2) , "get" , {} );
        categorize_group_items.forEach(function(item){
            let categorize_group_tag = document.createElement('textarea');
            categorize_group_tag.value = item.categorize_group;
            categorize_group_tag.setAttribute( 'class' , 'menu') ;
            $menu_area.append(categorize_group_tag);
        });
    }




    function addEvent_categorize_group_tag(){
        let categorize_group_tags = document.getElementsByClassName('menu');
        for(let i=0 ; i<categorize_group_tags.length ; i++ ){
            let categorize_group_tag = categorize_group_tags[i];
            categorize_group_tag.addEventListener('click',function(event){
                categorize_group = event.target.value;
                window.open(encodeURI("solve_a_question?level1="+level1+"&level2="+level2+"&categorize_group="+categorize_group));
            });
        }
    }





});