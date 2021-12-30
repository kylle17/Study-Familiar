



function studyController(){


    let study = new Study();
    let study_view = Study_view();



    study_process();
    function study_process(){
        function getData() {
          return new Promise(function(resolve, reject) {
              if(knowledges_length_check()){
                set_level1_level2_categorize();
                suggest_question();
                suggest_examples(resolve);
              }
          });
        }
        getData().then(function(data) {
            get_user_input();
            check_answer();
            question_type_switch_check();
            if( is_not_all_pass() ){ study_process() };
        });

    }




    function knowledges_length_check(){
        if(study.knowledges_length_check()){
            return true;
        }else{
            alert("문항수가 부족합니다. ");
            open(location, '_self').close();
            return false;
        }
    }






    function set_level1_level2_categorize(){
        let level1_level2_categorize = study.get_level1_level2_categorize();
        study_view.set_level1_level2_categorize(level1_level2_categorize);
    }




    function suggest_question(){
        let question = study.get_question();
        study_view.set_question(question);
    }




    function suggest_examples(resolve){
        let examples = study.get_examples();
        study_view.set_examples(examples , resolve);
        study_view.set_answer(study.get_answer());
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




    function is_not_all_pass(){
        if( study.is_all_pass() ){
            study.pass_record();
            alert("축하합니다. \n 모든 문제를 맞췄습니다.");
            open(location, '_self').close();
            return false;
        } else{
            return true;
        }
    }












}
