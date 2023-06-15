

function studyController(){

    let study = new Study();
    let study_view = Study_view();


    while(true){
        get_user_input();
        check_answer();
        question_type_switch_check();

        if( study.is_all_pass() ){
            study.pass_record();
            alert("축하합니다. \n 모든 문제를 맞췄습니다.");
            open(location, '_self').close();
            break;
        }
    }


    function set_level1_level2_categorize(){
        let level1_level2_categorize = study.get_level1_level2_categorize();
        study_view.set_level1_level2_categorize(level1_level2_categorize);
    }

    function get_user_input(){
        let user_input = study_view.get_user_input();
        study.set_user_input(user_input);
    }

    function check_answer(){
        study.correct_check();
    }

    function question_type_switch_check(){
        study.question_type_switch_check();
    }













}
