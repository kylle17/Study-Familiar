
let currentLessonNum = 0;
let currentStepNum = 1;

const step = {
    // step0 : function (){
    //
    //     let currentLesson = shuffleObject(lesson[currentLessonNum]);
    //     let divisionStrArr = Object.keys(currentLesson);
    //
    //     /** 태그 생성 */
    //     //초기화
    //     document.body.innerHTML = "";
    //     // Lesson , Step Title
    //     makeTitle();
    //     // 구분 생성
    //     divisionStrArr.forEach((divisionStr)=>{
    //         let $ul = document.createElement("ul");
    //         let $divition = document.createElement("li");
    //         $divition.textContent = divisionStr;
    //         $divition.setAttribute("class","division");
    //         $ul.appendChild($divition);
    //         let items = shuffle(currentLesson[divisionStr]);
    //         items.forEach((item)=>{
    //             let $item = document.createElement("li");
    //             $item.textContent = item;
    //             $item.setAttribute("class","item");
    //             $ul.appendChild($item);
    //         });
    //         document.body.appendChild($ul);
    //     });
    //     // 다음 버튼
    //     makeNextBtn();
    //
    // } ,
    step1 : function (){

        let currentLesson = shuffleObject(lesson[currentLessonNum]);
        let divisionStrArr = Object.keys(currentLesson);

        /** 태그 생성 */
        document.body.innerHTML = "";
        // Lesson , Step Title
        makeTitle();
        // 구분 생성
        divisionStrArr.forEach((divisionStr)=>{
            let $ul = document.createElement("ul");
            let $li = document.createElement("li");
            $li.textContent = divisionStr;
            $li.setAttribute("class","division");
            $ul.appendChild($li);
            document.body.appendChild($ul);
        });
        // 다음버튼
        makeNextBtn();


        /** 룰 생성 */
        const $divisions = document.getElementsByClassName("division");
        const divisions = Array.from($divisions);

        divisions.forEach((division)=>{
            let items = shuffle(currentLesson[division.textContent]);
            division.addEventListener("touchstart",()=>{
                while(true){
                    if(items.length <= 0) break;
                    let $item = document.createElement("li");
                    $item.textContent = items.shift();
                    $item.setAttribute("class","item");
                    division.parentNode.appendChild($item);
                }
            });
        });


    } ,
    step2 : function (){
        let currentLesson = shuffleObject(lesson[currentLessonNum]);
        let divisionStrArr = Object.keys(currentLesson);

        /** 태그 생성 */
        //초기화
        document.body.innerHTML = "";
        // Lesson , Step Title
        makeTitle();
        // 항목 생성
        divisionStrArr.forEach((divisionStr)=>{
            let $ul = document.createElement("ul");

            let items = shuffle(currentLesson[divisionStr]);
            items.forEach((item)=>{
                let $item = document.createElement("li");
                $item.textContent = item;
                $item.setAttribute("class","item");
                $ul.appendChild($item);
            });
            document.body.appendChild($ul);
        });
        // 구분 생성
        divisionStrArr = shuffle(divisionStrArr);
        divisionStrArr.forEach((divisionStr)=>{
            let $divition = document.createElement("li");
            $divition.textContent = divisionStr;
            $divition.setAttribute("class","division");
            let $stepStr = document.getElementById("stepTitle");
            document.body.insertBefore($divition, $stepStr.nextSibling);
        });

        /** 룰 생성 */
        const $divisions = document.getElementsByClassName("division");
        const divisions = Array.from($divisions);
        const $uls = document.getElementsByTagName("ul");
        const uls = Array.from($uls);


        divisions.forEach((division)=>{
            division.addEventListener("touchstart",(event)=>{
                divisionsReset();
                division.classList.add('target');
                division.style.backgroundColor = 'red';
                event.stopPropagation();
            });
        });

        uls.forEach((ul)=>{
            ul.addEventListener("touchstart",()=>{
                let $beforeDivision = ul.getElementsByClassName("division")[0];
                if( $beforeDivision != undefined ) {
                    let $stepStr = document.getElementById("stepTitle");
                    document.body.insertBefore($beforeDivision, $stepStr.nextSibling);
                }
                let $target = document.getElementsByClassName("target");
                if( $target.length <= 0 ) return;
                ul.prepend($target[0]);
                divisionsReset();
            });
        });

        function divisionsReset() {
            divisions.forEach((division)=>{
                division.classList.remove('target');
                division.style.backgroundColor = '#f6f6f6';
            });
        };

        // 다음 버튼
        makeNextBtn();
    } ,
    step3 : function (){
        let currentLesson = shuffleObject(lesson[currentLessonNum]);
        let divisionStrArr = Object.keys(currentLesson);

        /** 태그 생성 */
        //초기화
        document.body.innerHTML = "";
        // Lesson , Step Title
        makeTitle();
        // 항목 생성
        divisionStrArr.forEach((divisionStr)=>{
            let $ul = document.createElement("ul");

            let items = shuffle(currentLesson[divisionStr]);
            items.forEach((item)=>{
                let $item = document.createElement("li");
                $item.textContent = item;
                $item.setAttribute("class","item");
                $ul.appendChild($item);
            });
            document.body.appendChild($ul);
        });
        // 구분 생성
        divisionStrArr = shuffle(divisionStrArr);
        let tempIndex = 0;
        let $uls = document.getElementsByTagName("ul");
        divisionStrArr.forEach((divisionStr)=>{
            let $divition = document.createElement("li");
            $divition.textContent = divisionStr;
            $divition.setAttribute("class","division");
            let $ul = $uls[tempIndex];
            $ul.insertBefore($divition, $ul.firstChild);
            tempIndex++;
        });

        /** 룰 생성 */
        const $divisions = document.getElementsByClassName("division");
        const divisions = Array.from($divisions);
        $uls = document.getElementsByTagName("ul");
        const uls = Array.from($uls);


        divisions.forEach((division)=>{
            division.addEventListener("touchstart",(event)=>{
                divisionsReset();
                division.classList.add('target');
                division.style.backgroundColor = 'red';
                event.stopPropagation();
            });
        });

        uls.forEach((ul)=>{
            ul.addEventListener("touchstart",()=>{
                let $beforeDivision = ul.getElementsByClassName("division")[0];
                if( $beforeDivision != undefined ) {
                    // let $stepStr = document.getElementById("stepTitle");
                    // document.body.insertBefore($beforeDivision, $stepStr.nextSibling);
                    let $beforeDivisionUl = document.getElementsByClassName("target")[0].parentNode;
                    $beforeDivisionUl.prepend($beforeDivision);

                }
                let $target = document.getElementsByClassName("target");
                if( $target.length <= 0 ) return;
                ul.prepend($target[0]);
                divisionsReset();
            });
        });

        function divisionsReset() {
            divisions.forEach((division)=>{
                division.classList.remove('target');
                division.style.backgroundColor = '#f6f6f6';
            });
        };

        // 다음 버튼
        makeNextBtn();
    } ,
    step4 : function (){

        let currentLesson = shuffleObject(lesson[currentLessonNum]);
        let divisionStrArr = Object.keys(currentLesson);
        let itemStrArr = [];
        divisionStrArr.forEach((key)=>{
            itemStrArr.push(...currentLesson[key]);
        });


        /** 태그 생성 */
        itemStrArr = shuffle(itemStrArr);
        //초기화
        document.body.innerHTML = "";
        // Lesson , Step Title
        makeTitle();
        // 항목 생성
        let $ul = document.createElement("ul");
        let $li = document.createElement("li");
        $li.textContent = "항목";
        $li.setAttribute("class","division");
        $ul.appendChild($li);
        itemStrArr.forEach( itemStr => {
            let $li = document.createElement("li");
            $li.textContent = itemStr;
            $li.setAttribute("class","item");
            $ul.appendChild($li);
        });
        document.body.appendChild($ul);
        // 구분 생성
        divisionStrArr.forEach((divisionStr)=>{
            let $ul = document.createElement("ul");
            let $li = document.createElement("li");
            $li.textContent = divisionStr;
            $li.setAttribute("class","division");
            $ul.appendChild($li);
            document.body.appendChild($ul);
        });
        // 다음 버튼
        makeNextBtn();


        /** 룰 생성 */
        const $items = document.getElementsByClassName("item");
        const items = Array.from($items);
        const $divisions = document.getElementsByClassName("division");
        const divisions = Array.from($divisions);


        items.forEach((item)=>{
            item.addEventListener("touchstart",()=>{
                itemsReset();
                item.classList.add('target');
                item.style.backgroundColor = 'red';
            });
        });

        divisions.forEach((division)=>{
            division.addEventListener("touchstart",()=>{
                let $target = document.getElementsByClassName("target");
                if( $target.length <= 0 ) return;
                division.parentNode.appendChild($target[0]);
                itemsReset();
            });
        });

        function itemsReset() {
            items.forEach((item)=>{
                item.classList.remove('target');
                item.style.backgroundColor = '#f6f6f6';
            });
        };

    } ,
    step5 : function (){

        let currentLesson = shuffleObject(lesson[currentLessonNum]);
        let divisionStrArr = Object.keys(currentLesson);
        let itemStrArr = [];
        divisionStrArr.forEach((key)=>{
            itemStrArr.push(...currentLesson[key]);
        });

        /** 태그 생성 */
        itemStrArr = shuffle(itemStrArr);
        //초기화
        document.body.innerHTML = "";
        // Lesson , Step Title
        makeTitle();
        // 구분 생성
        divisionStrArr.forEach((divisionStr)=>{
            let $ul = document.createElement("ul");
            let $li = document.createElement("li");
            $li.textContent = divisionStr;
            $li.setAttribute("class","division");
            $ul.appendChild($li);
            document.body.appendChild($ul);
        });
        // 항목 생성
        let tempIndex = 0;
        itemStrArr.forEach( itemStr => {
            let $targets = document.getElementsByClassName("division");
            let $li = document.createElement("li");
            $li.textContent = itemStr;
            $li.setAttribute("class","item");
            $targets[tempIndex].parentNode.appendChild($li);
            tempIndex = ( tempIndex < divisionStrArr.length-1 )? tempIndex+1 : 0;
        });
        // 다음 버튼
        makeNextBtn();


        /** 룰 생성 */
        const $items = document.getElementsByClassName("item");
        const items = Array.from($items);
        const $divisions = document.getElementsByClassName("division");
        const divisions = Array.from($divisions);

        items.forEach((item)=>{
            item.addEventListener("touchstart",()=>{
                itemsReset();
                item.classList.add('target');
                item.style.backgroundColor = 'red';
            });
        });

        divisions.forEach((division)=>{
            division.addEventListener("touchstart",()=>{
                let $target = document.getElementsByClassName("target");
                if( $target.length <= 0 ) return;
                division.parentNode.appendChild($target[0]);
                itemsReset();
            });
        });

        function itemsReset() {
            items.forEach((item)=>{
                item.classList.remove('target');
                item.style.backgroundColor = '#f6f6f6';
            });
        };

    } ,
    step6 : function (){

        let currentLesson = shuffleObject(lesson[currentLessonNum]);
        let divisionStrArr = Object.keys(currentLesson);

        /** 태그 생성 */
        document.body.innerHTML = "";
        // Lesson , Step Title
        makeTitle();
        // 구분 생성
        divisionStrArr.forEach((divisionStr)=>{
            let $ul = document.createElement("ul");
            let $li = document.createElement("li");
            $li.textContent = divisionStr;
            $li.setAttribute("class","division");
            $ul.appendChild($li);
            document.body.appendChild($ul);
        });
        // 다음버튼
        makeNextBtn();


        /** 룰 생성 */
        const $divisions = document.getElementsByClassName("division");
        const divisions = Array.from($divisions);

        divisions.forEach((division)=>{
            let items = shuffle(currentLesson[division.textContent]);
            division.addEventListener("touchstart",()=>{
                while(true){
                    if(items.length <= 0) break;
                    let $item = document.createElement("li");
                    $item.textContent = items.shift();
                    $item.setAttribute("class","item");
                    division.parentNode.appendChild($item);
                }
            });
        });


    }
};

function shuffle(arr) {
    let array = JSON.parse(JSON.stringify(arr));
    for (let index = array.length - 1; index > 0; index--) {
        const randomPosition = Math.floor(Math.random() * (index + 1));
        const temporary = array[index];
        array[index] = array[randomPosition];
        array[randomPosition] = temporary;
    }
    return array;
};

function shuffleObject(obj){
    const keys = Object.keys(obj);
    keys.sort(() => Math.random() - 0.5);

    const shuffledObj = {};
    keys.forEach(key => {
        shuffledObj[key] = obj[key];
    });
    return shuffledObj;
}

function checkAnswer(){

    let $asnwerDivisions = document.getElementsByClassName("division");
    let answerLesson = {};
    Array.from($asnwerDivisions).forEach(($answerDivision)=>{
        answerLesson[$answerDivision.textContent] = [];
        if( $answerDivision.parentNode.tagName.toLowerCase() === "ul" ){
            let childNodes = $answerDivision.parentNode.childNodes;
            childNodes.forEach((childNode)=>{
                if( childNode.classList.contains("item") ) answerLesson[$answerDivision.textContent].push(childNode.textContent);
            });
        }
    });

    let currentLesson = lesson[currentLessonNum];
    let answerLessonKeys = Object.keys(answerLesson);

    console.log(currentLesson);
    console.log(answerLessonKeys);


    for (let i = 0; i < answerLessonKeys.length ; i++) {
        let key = answerLessonKeys[i];
        if( key === "항목") continue;
        if( answerLesson[key].length !== currentLesson[key].length ) {
            Toast.fire({
                icon: 'error',
                title: '오답 입니다.'
            });
            return;
        }

        let answerValues = answerLesson[key];
        for (let j = 0; j < answerValues.length; j++) {
            if( currentLesson[key].indexOf(answerValues[j]) < 0) {
                Toast.fire({
                    icon: 'error',
                    title: '오답 입니다.'
                });
                return;
            };
        }

    }

    Toast.fire({
        icon: 'success',
        title: 'SUCCESS',
        text: '정답입니다.',
    }).then(result => {
        next();
    });
};

function next(){

    let MAX_STEP = Object.keys(step).length;

    if( currentStepNum >= MAX_STEP && ( currentLessonNum >= lesson.length - 1 ) ){
        Swal.fire({
            icon: 'success',
            title: 'Clear',
            text: '축하합니다.' +
                '모든 문제를 다 맞췄습니다.',
        }).then(result => {
            open(location, '_self').close();
        });
    } else if( currentStepNum  >= MAX_STEP   ){
        currentLessonNum ++;
        currentStepNum = 1;
        actStep();
    }else{
        currentStepNum ++;
        actStep();
    };
};

function beforeStep(){
    if( currentStepNum > 1 ) {
        currentStepNum--;
        actStep();
    }else{
        Toast.fire({
            icon: 'warning',
            title: 'warning',
            text: '첫번째 Step입니다.',
        });
    }
}

function nextStep(){
    let MAX_STEP = Object.keys(step).length;
    if( currentStepNum < MAX_STEP ) {
        currentStepNum++;
        actStep();
    }else{
        Toast.fire({
            icon: 'warning',
            title: 'warning',
            text: '마지막 Step입니다.',
        });
    }
}

function beforeLesson() {
    if( currentLessonNum > 0 ) {
        currentLessonNum--;
        currentStepNum = 1;
        actStep();
    }else{
        Toast.fire({
            icon: 'warning',
            title: 'warning',
            text: '첫번째 Lesson입니다.',
        });
    }
}

function nextLesson() {
    if( currentLessonNum < lesson.length-1 ) {
        currentLessonNum++;
        currentStepNum = 1;
        actStep();
    }else{
        Toast.fire({
            icon: 'warning',
            title: 'warning',
            text: '마지막 Lesson입니다.',
        });
    }
}

function actStep(){
    switch(currentStepNum){
        case 1 :
            step.step1();
            break;
        case 2 :
            step.step2();
            break;
        case 3 :
            step.step3();
            break;
        case 4 :
            step.step4();
            break;
        case 5 :
            step.step5();
            break;
        case 6 :
            step.step6();
            break;
    }
};

function makeTitle(){
    /* Lesson Title */
    let $title = document.createElement("div");
    $title.textContent = "LESSON "+currentLessonNum;
    $title.setAttribute("id","lessonTitle");
    document.body.appendChild($title);
    /* Step Title */
    let $step = document.createElement("div");
    $step.textContent = "STEP "+currentStepNum;
    $step.setAttribute("id","stepTitle");
    document.body.appendChild($step);
}

function makeNextBtn(){
    /* 정답 확인 */
    let $next = document.createElement("div");
    $next.setAttribute("id","next");
    $next.textContent = "▶";
    $next.setAttribute("onclick","checkAnswer();");
    document.body.appendChild($next);

    /* Step box */
    let $nextStepBox = document.createElement("div");
    $nextStepBox.setAttribute("id","nextStepBox");

    /* 이전 Step */
    let $beforeStep = document.createElement("div");
    $beforeStep.setAttribute("id","beforeStep");
    $beforeStep.textContent = "◀ Step ";
    $beforeStep.setAttribute("onclick","beforeStep();");
    $nextStepBox.appendChild($beforeStep);

    /* 다음 Step */
    let $nextStep = document.createElement("div");
    $nextStep.setAttribute("id","nextStep");
    $nextStep.textContent = "Step ▶";
    $nextStep.setAttribute("onclick","nextStep();");
    $nextStepBox.appendChild($nextStep);

    document.body.appendChild($nextStepBox);

    /* Lesson box */
    let $nextLessonBox = document.createElement("div");
    $nextLessonBox.setAttribute("id","nextLessonBox");

    /* 이전 Lesson  */
    let $beforeLesson = document.createElement("div");
    $beforeLesson.setAttribute("id","beforeLesson");
    $beforeLesson.textContent = "◀ Lesson";
    $beforeLesson.setAttribute("onclick","beforeLesson();");
    $nextLessonBox.appendChild($beforeLesson);

    /* 다음 Lesson  */
    let $nextLesson = document.createElement("div");
    $nextLesson.setAttribute("id","nextLesson");
    $nextLesson.textContent = "Lesson ▶";
    $nextLesson.setAttribute("onclick","nextLesson();");
    $nextLessonBox.appendChild($nextLesson);

    document.body.appendChild($nextLessonBox);

    /* 공백 */
    let $space = document.createElement("div");
    $space.setAttribute("id","space");
    document.body.appendChild($space);

}

const Toast = Swal.mixin({
    toast: true,
    position: 'center-center',
    showConfirmButton: false,
    timer: 500,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


