


function Study(){

    let knowledges ;
    let question_index ;
    let question ;
    let answer ;

    let study_steps ;
    let current_step ;
    let user_input;

    let level1 = document.getElementById('receive_level1').value;
    let level2 = document.getElementById('receive_level2').value;
    let categorize_group = document.getElementById('receive_categorize_group').value;


    (function (){
        knowledges = make_knowledges();

        study_steps = make_study_steps();
        current_step = study_steps.get_current_step();
    })();



    function make_knowledges(){

        let receive_data = sync_ajax_call( encodeURI("knowledges?"+"level1="+level1+"&level2="+level2+"&categorize_group="+categorize_group) , "get" , {} );

        let knowledges = [];
        receive_data.forEach(function(element){
            let knowledgeDTO = new KnowledgeDTO();
            knowledgeDTO.question = element.question;
            knowledgeDTO.answer = element.answer;
            knowledgeDTO.categorize = element.categorize;
            knowledges.push(knowledgeDTO);
        });
        return knowledges;
    };





    function knowledges_length_check(){
        if( knowledges.length > 2 ){
            return true;
        }else{
            return false;
        }
    }





    function get_level1_level2_categorize(){
        return " >   "+level1+"\n        >   "+level2;
    }





    function get_question(){
        if( current_step.suggest_type === 'order' ) {
            return make_order_number_question();
        }else{
            return make_random_question();
        }
    }




    function make_order_number_question(){
        for(let i=0 ; i<knowledges.length ; i++ ){
            let knowledgeDTO = knowledges[i];
            if( knowledgeDTO["is_corrected_"+current_step.name] ) continue;
            question = knowledgeDTO.categorize+"\n\n"+knowledgeDTO[current_step.question_type];
            question_index = i;
            break;
        }
        return question;
    }





    function make_random_question(){
        while(true){
            let random_number =  Math.floor(knowledges.length * Math.random());
            let knowledgeDTO = knowledges[random_number];
            if( knowledgeDTO["is_corrected_"+current_step.name] ) continue;
            question = knowledgeDTO.categorize+"\n\n"+knowledgeDTO[current_step.question_type];
            question_index = random_number;
            break;
        }
        return question;
    }








    function get_examples(){
        let examples = [];
        let knowledgeDTO = knowledges[question_index];
        answer = knowledgeDTO.categorize+"\n"+knowledgeDTO[current_step.answer_type];
        examples.push( answer );
        while(true){
            let random_number =  Math.floor(knowledges.length * Math.random());
            let knowledgeDTO = knowledges[random_number];
            let example = knowledgeDTO.categorize+"\n"+knowledgeDTO[current_step.answer_type];
            if( answer === example ) continue;
            if( examples.length >= 2 && examples[1] === example ) continue;
            examples.push( example );
            if( examples.length >= 3 ) break;
        }
        return examples;
    }





    function set_user_input(receive_user_input){
        user_input = receive_user_input;
    }





    function correct_check(){
        if( answer === user_input ) {
            let knowledgeDTO = knowledges[question_index];
            knowledgeDTO["is_corrected_"+current_step.name] = true;
        }
    }





    function get_answer(){
        return answer;
    }






    function question_type_switch_check(){
        let is_question_all_pass = true;
        knowledges.forEach(function(knowledgeDTO){
            if( !knowledgeDTO["is_corrected_"+current_step.name] ) is_question_all_pass = false;
        });
        if( is_question_all_pass ){
            study_steps.next_step();
            current_step = study_steps.get_current_step();
        }
    }





    function is_all_pass(){
        if( study_steps.is_all_pass() ) return true;
        return false;
    }





    function pass_record(){
        sync_ajax_call( encodeURI("pass_record?"+"level1="+level1+"&level2="+level2+"&categorize_group="+categorize_group) , "patch" , {} );
    }








    return {
        knowledges_length_check : knowledges_length_check ,
        get_level1_level2_categorize : get_level1_level2_categorize ,
        get_question : get_question ,
        get_examples : get_examples ,
        set_user_input : set_user_input ,
        correct_check : correct_check ,
        get_answer : get_answer ,
        question_type_switch_check : question_type_switch_check ,
        is_all_pass : is_all_pass ,
        pass_record : pass_record ,
    };



}