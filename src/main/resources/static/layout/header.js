

window.addEventListener('load', function(){



    let $index_bnt = document.getElementById('index_bnt');
    $index_bnt.addEventListener('click',function(){
        var link = '/';
        location.href = link;
    });


    let $knowledge_manage_bnt = document.getElementById('knowledge_manage_bnt');
    $knowledge_manage_bnt.addEventListener('click',function(){
        let password = prompt('비밀번호를 입력하세요.');
        var link = 'knowledge_manage';
        location.href = link+"?password="+password;
    });




    let $solve_a_question_main_bnt = document.getElementById('solve_a_question_main_bnt');
    $solve_a_question_main_bnt.addEventListener('click',function(){
        let password = prompt('비밀번호를 입력하세요.');
        var link = 'solve_a_question_main';
        location.href = link+"?password="+password;
    });




});