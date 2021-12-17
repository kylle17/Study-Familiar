


function Study_view(){


    let $examples = document.getElementsByClassName('example');
    let user_input;



    function set_level1_level2_categorize(level1_level2_categorize){
        let $level1_level2_categorize = document.getElementById('level1_level2_categorize');
        $level1_level2_categorize.textContent = level1_level2_categorize;

        // PC일 경우 크기 조절
        if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
            let defualt_height = 120;
            let variable_height = $level1_level2_categorize.value.match(/\n/g).length * 40;
            $level1_level2_categorize.style.height = defualt_height + variable_height + 'px';
        }
        // 모바일인 경우 크기 조절
        if(navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
            let defualt_height = 50;
            let variable_height = $level1_level2_categorize.value.match(/\n/g).length * 20;
            $level1_level2_categorize.style.height = defualt_height + variable_height + 'px';
        }
    }




    function set_question(question){

        let $question = document.getElementById('question');
        $question.textContent = question;

        // PC일 경우 크기 조절
        if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
            let defualt_height = 120;
            let variable_height = $question.value.match(/\n/g).length * 40 ;
            $question.style.height = defualt_height + variable_height +'px';
        }
        // 모바일인 경우 크기 조절
        if(navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
            let defualt_height = 90;
            let variable_height = $question.value.match(/\n/g).length * 20 ;
            $question.style.height = defualt_height + variable_height + 'px';
        }
    }




    function set_examples(examples , resolve){
        set_data_into_$examples(examples);
        addEvent_to_$examples(resolve);
        set_$examples_size();
    }




    function set_data_into_$examples(examples){
        let random_number = Math.floor( $examples.length * Math.random() );

        let tempIndex = random_number;
        $examples[tempIndex].textContent = examples[0];

        tempIndex = ( tempIndex < $examples.length - 1 )? tempIndex + 1 : 0 ;
        $examples[tempIndex].textContent = examples[1];

        tempIndex = ( tempIndex < $examples.length - 1 )? tempIndex + 1 : 0 ;
        $examples[tempIndex].textContent = examples[2];
    }




    function addEvent_to_$examples(resolve){

        for(let i=0 ; i<$examples.length ; i++  ){
            $examples[i].addEventListener( 'click' , get_user_input );
            $examples[i].disabled = false;
        };

        function get_user_input(event){
            this.style.background = 'powderblue';
            user_input = this.textContent;
            add_next_bnt();
            removeEvent_to_$examples();
        }

        function add_next_bnt(){
            let next_bnt = document.createElement('div');
            next_bnt.id = 'next';
            next_bnt.textContent = "▶";
            let $target = document.getElementById('example2');
            $target.nextSibling.nextSibling.after(next_bnt);
            let $next = document.getElementById('next');
            $next.addEventListener('click' , function(){
                $next_remove();
                $examples_design_reset();
            });
        }

        function removeEvent_to_$examples(){
            for(let i=0 ; i<$examples.length ; i++  ){
                $examples[i].removeEventListener( 'click' , get_user_input );
                $examples[i].disabled = true;
            };
        };

        function $next_remove(){
            let $next = document.getElementById('next');
            $next.remove();
        }

        function $examples_design_reset(){
            for(let i=0 ; i<$examples.length ; i++  ){
                $examples[i].style.background = '#F2F2F2';
            }
            console.log('$examples_design_reset 시작');
            resolve(1);
        };

    };




    function set_$examples_size(){
        for(let i=0 ; i<$examples.length ; i++){
          // PC일 경우 크기 조절
          if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
              let example_enter_count = get_example_enter_count($examples[i]);
              let defualt_height = 70;
              let variable_height = example_enter_count * 20 ;
              $examples[i].style.height = defualt_height + variable_height + 'px';
          }
          // 모바일인 경우 크기 조절
          if(navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
              let example_enter_count = get_example_enter_count($examples[i]);
              let defualt_height = 60;
              let variable_height = example_enter_count * 20 ;
              $examples[i].style.height = defualt_height + variable_height + 'px';
          }
        }
    }




    function get_example_enter_count(example){
        let result = 0;
        let example_match_arr = example.value.match(/\n/g);
        if( example_match_arr !== undefined && example_match_arr !== null ) result = example_match_arr.length;
        return result;
    }




    function get_user_input(){
        return user_input;
    }

















    return {
        set_level1_level2_categorize : set_level1_level2_categorize ,
        set_question : set_question ,
        set_examples : set_examples ,
        get_user_input : get_user_input ,
    }







}