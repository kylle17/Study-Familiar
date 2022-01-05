


function make_study_steps(){


    let study_steps = [
        { name : 'order_num_step1'     , suggest_type : 'order'     , question_type : 'question'      , answer_type : 'answer'      } ,
        { name : 'order_num_step2'     , suggest_type : 'order'     , question_type : 'answer'    , answer_type : 'question'        } ,
//        { name : 'random_step1'        , suggest_type : 'random'     , question_type : 'answer'      , answer_type : 'question'     } ,
//        { name : 'random_step2'        , suggest_type : 'random'     , question_type : 'question'    , answer_type : 'answer'       } ,
    ];
    let current_step_index = 0;


    function get_current_step(){
        return study_steps[current_step_index];
    }


    function next_step(){
        current_step_index++;
    }


    function is_all_pass(){
        if( current_step_index === (study_steps.length) ) return true;
        return false;
    }


    return {
        get_current_step : get_current_step ,
        next_step : next_step ,
        is_all_pass : is_all_pass ,
    };


}