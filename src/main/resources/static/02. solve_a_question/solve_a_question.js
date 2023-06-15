
window.addEventListener('load', function(){

    // studyController();

    let $study = {
        me:document.querySelector('body'),
        level1 : document.getElementById('receive_level1') ,
        level2 : document.getElementById('receive_level2') ,
        categorize_group : document.getElementById('receive_categorize_group') ,
        question: document.getElementById('question') ,
        answer : document.getElementById('answer') ,
    };
    let studyStep = {
        step:[
            { id:1 , name:'step1' , suggestType:'order'} ,
            { id:2 , name:'step2' , suggestType:'random'}
        ] ,
        currentStepIndex:0 ,
        getCurrentStudyStep:function () {
            return this.step[this.currentStepIndex];
        } ,
        goNextStep:function () {
            this.currentStepIndex++;
        } ,
        isLastStep:function () {
            if( this.currentStepIndex === this.step.length-1 ) return true;
            return false;
        }
    };

    let knowledge = {
        knowledgeData: [
            { categorize:"" , question:"" , answer:"" }
        ] ,
        getQuestion : function(){
            let currentStudyStep = studyStep.getCurrentStudyStep();
            if( currentStudyStep.suggestType === 'order' ) return this.getOrderQuestion();
            if( currentStudyStep.suggestType === 'random') return this.getRandomQuestion();
        } ,
        orderQuestionIndex:-1 ,
        getOrderQuestion:function () {
            this.orderQuestionIndex++;
            return this.knowledgeData[this.orderQuestionIndex].question;
        } ,
        randomQuestionIndex:0 ,
        getRandomQuestion:function () {
            while(true){
                let random_number =  Math.floor(this.knowledgeData.length * Math.random());
                let isPassQuestion = this.knowledgeData[random_number][studyStep.getCurrentStudyStep().name+"CorrectYN"];
                if( !isPassQuestion ){
                    this.randomQuestionIndex = random_number;
                    return this.knowledgeData[random_number].question;
                }
            }
        } ,
        getAnswer : function () {
            let currentStudyStep = studyStep.getCurrentStudyStep();
            if( currentStudyStep.suggestType === 'order' ) return this.knowledgeData[this.orderQuestionIndex].answer;
            if( currentStudyStep.suggestType === 'random') return this.knowledgeData[this.randomQuestionIndex].answer;
        } ,
        setCorrect:function(){
            let currentStudyStep = studyStep.getCurrentStudyStep();
            if( currentStudyStep.suggestType === 'order' )
                this.knowledgeData[this.orderQuestionIndex][studyStep.getCurrentStudyStep().name+"CorrectYN"] = true;
            if( currentStudyStep.suggestType === 'random')
                this.knowledgeData[this.randomQuestionIndex][studyStep.getCurrentStudyStep().name+"CorrectYN"] = true;
        } ,
        isAllPass : function(){
            if( this.isLastStep() && this.isAllQuestionPass() ) return true;
            return false;
        } ,
        isLastStep : function(){
            if(studyStep.isLastStep()) return true;
            return false;
        } ,
        isAllQuestionPass : function () {
            console.log("isAllQuestionPass");
            let currentStudyStep = studyStep.getCurrentStudyStep();
            if( currentStudyStep.suggestType === 'order' )
                return this.knowledgeData.length-1 === this.orderQuestionIndex;
            if( currentStudyStep.suggestType === 'random')
                return this.knowledgeData.filter( data => data[studyStep.getCurrentStudyStep().name+"CorrectYN"] === false ).length === 0;
        } ,
    };


    knowledge.knowledgeData = makeKnowledgeData();
    suggestQuestion();
    addEvent_answerCheck();


    function makeKnowledgeData(){
        let uri = "knowledges?"+"level1="+$study.level1.value +"&level2="+$study.level2.value
            +"&categorize_group="+$study.categorize_group.value;
        let receive_data = sync_ajax_call( encodeURI(uri) , "get" , {});

        let knowledges = [];
        receive_data.forEach(function(element){
            let knowledge = {
                categorize : element.categorize ,
                question : element.question ,
                answer : element.answer ,
            };
            studyStep.step.forEach(function (step) {  knowledge[step.name+"CorrectYN"] = false; });
            knowledges.push(knowledge);
        });
        return knowledges;
    };
    function suggestQuestion() {
        if( knowledge.isAllQuestionPass() ) studyStep.goNextStep();
        let question = knowledge.getQuestion();
        $study.question.value = question;
    };
    function addEvent_answerCheck(){
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if ( !(evt.ctrlKey &&  evt.shiftKey && evt.keyCode == 13) ) return;
            if(answerCheck()){
                alert("정답입니다.");
                knowledge.setCorrect();
                if( knowledge.isAllPass() ) {
                    pass_record();
                    alert("축하합니다. \n 모든 문제를 맞췄습니다.");
                    open(location, '_self').close();
                    return;
                }else{
                    suggestQuestion();
                }
            }else{
                alert("오답입니다.");
            };
            $study.answer.value = "";
        };
    };
    function answerCheck() {
        let answer = knowledge.getAnswer().replace(/(\s*)/g, "").toUpperCase();
        let user_answer = $study.answer.value.replace(/(\s*)/g, "").toUpperCase();
        if( answer === user_answer ) {
            return true;
        }
        return false;
    };

    function pass_record(){
        let url = "pass_record?"+"level1="+$study.level1.value +"&level2="+$study.level2.value
            +"&categorize_group="+$study.categorize_group.value;
        sync_ajax_call( encodeURI(url) , "patch" , {} );
    }




});