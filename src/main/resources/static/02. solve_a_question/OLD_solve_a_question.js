

		window.onload = function() {


			let current_process = "";
		    let study = new Study();
		    go_test();
		    study = new Study();
		    study.suggest_question();
			addEvent_to_example_bnt();



		    function go_test(){
		    	current_process = "test";
		    	for(let i=0 ; i<10000 ; i++){
						if( study.End_Sign === "END" ) break;
z
			    		study.suggest_question();
			    		addEvent_to_example_bnt();

			    		var event = document.createEvent("Event");
			    		event.initEvent("click", false, true);
			    		let answer_index = study.get_answer_bnt_index();
			    		document.getElementsByClassName('example')[answer_index].dispatchEvent(event);
			    		document.getElementById('next').dispatchEvent(event);
		    	}
		    	current_process = "study";

		    };



		    function addEvent_to_example_bnt(){
			    let $example_bnt_arr = document.getElementsByClassName('example');
			    for(let i=0 ; i<$example_bnt_arr.length ; i++  ){
			    	$example_bnt_arr[i].addEventListener( 'click' , answer_check_process );
			    	$example_bnt_arr[i].disabled = false;
			    };
		    };



		    function removeEvent_to_example_bnt(){
			    let $example_bnt_arr = document.getElementsByClassName('example');
			    for(let i=0 ; i<$example_bnt_arr.length ; i++  ){
			    	$example_bnt_arr[i].removeEventListener( 'click' , answer_check_process );
			    	$example_bnt_arr[i].disabled = true;
			    };
		    };



		    function answer_check_process(event){

		    	this.style.background = 'powderblue';

				let answer = this.textContent;
	    		if( study.is_correct_answer(answer) ){
	    			success_process();
	    		}else{
	    			failure_process();
	    		}

		    };



		    function success_process(){
		    	removeEvent_to_example_bnt();
		    	show_answer();
		    	add_next_bnt();
		    	let $next = document.getElementById('next');
		    	$next.addEventListener('click' , suggest_next_question);

		    	function suggest_next_question(){
		    		study.correct_checking();
		    		study.suggest_question();
					if( study.End_Sign === "END" )	end_process();
		    		example_bnt_reset();
		    		addEvent_to_example_bnt();
		    		$next.remove();
		    	}
		    };



		    function failure_process(){
		    	show_answer();
		    	removeEvent_to_example_bnt();

		    	add_next_bnt();
		    	let $next = document.getElementById('next');
		    	$next.addEventListener('click' , suggest_next_question);

		    	function suggest_next_question(event){
			    	study.suggest_question();
		    		example_bnt_reset();
		    		addEvent_to_example_bnt();
		    		$next.remove();
		    	}

		    };



		    function end_process(){
				alert(" 축하합니다. \n 모든 문제를 맞추셨습니다. ");
				if( current_process === "study" ) window.close();
		    }



		    function add_next_bnt(){
		    	let next_bnt = document.createElement('div');
		    	next_bnt.id = 'next';
		    	next_bnt.textContent = "▶";
		    	let $target = document.getElementById('example2');
		    	$target.nextSibling.nextSibling.after(next_bnt);
		    }



		    function show_answer(){
		    	let $example_bnt_arr = document.getElementsByClassName('example');
		    	for(let i=0 ; i<$example_bnt_arr.length ; i++  ){
		    		if( study.is_correct_answer($example_bnt_arr[i].textContent) ){
		    			$example_bnt_arr[i].style.background = '#EF5350';
		    		}
		    	}
		    }



		    function example_bnt_reset(){
		    	let $example_bnt_arr = document.getElementsByClassName('example');
		    	for(let i=0 ; i<$example_bnt_arr.length ; i++  ){
		    		$example_bnt_arr[i].style.background = '#F2F2F2';
		    	}
		    };





		};




























		class Study{

			Study_data_contorller = new Study_data_contorller(make_data_arr());
			question = "";
			answer = "";
			answer_button_index = "";
			example_arr = [];
			End_Sign = "";


			constructor(){

			};

			suggest_question(){
				this.Study_data_contorller.next_question();
				if( this.Study_data_contorller.End_Sign === "END" ){
					this.End_Sign = "END"
					return;
				}
				this.question = this.Study_data_contorller.get_question();
				this.answer = this.Study_data_contorller.get_answer();
				this.example_arr = this.Study_data_contorller.get_example_arr();

				this.set_question_to_tag();
				this.set_example_to_tag();
			};


			set_question_to_tag(){
				let $question = document.getElementById('question');
				$question.textContent = "[ 문제 ]"+"\n\n\n"+this.question;

				// PC일 경우 크기 조절
				if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
					$question.style.height = 120+$question.value.match(/\n/g).length*40+'px';
				}

				// 모바일인 경우 크기 조절
				if(navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
					$question.style.height = 160+$question.value.match(/\n/g).length*25+'px';
				}
			}


			set_example_to_tag(){
				let $example_arr = document.getElementsByClassName('example');
				let random_number = Math.floor( $example_arr.length * Math.random() );

				let tempIndex = random_number;
				$example_arr[tempIndex].textContent = this.answer;
				this.answer_button_index = tempIndex;

				tempIndex = ( tempIndex < $example_arr.length - 1 )? tempIndex + 1 : 0 ;
				$example_arr[tempIndex].textContent = this.example_arr[0];

				tempIndex = ( tempIndex < $example_arr.length - 1 )? tempIndex + 1 : 0 ;
				$example_arr[tempIndex].textContent = this.example_arr[1];

				for(let i=0 ; i<$example_arr.length ; i++){
					// PC일 경우 크기 조절
					if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
						let example_enter_count = this.get_example_enter_count($example_arr[i]);
						let defualt_height = 70;
						$example_arr[i].style.height = defualt_height + (example_enter_count*20) + 'px';
					}

					// 모바일인 경우 크기 조절
					if(navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
						let example_enter_count = this.get_example_enter_count($example_arr[i]);
						let defualt_height = 60;
						$example_arr[i].style.height = defualt_height + (example_enter_count*20) + 'px';
					}
				}


			}


			get_example_enter_count(example){
				let result = 0;
				let example_match_arr = example.value.match(/\n/g);
				if( example_match_arr !== undefined && example_match_arr !== null ) result = example_match_arr.length;
				return result;
			}


			is_correct_answer(submitted_answer){
				if( submitted_answer === this.answer ){
					return true;
				}else{
					return false;
				}

			}


			correct_checking(){
				this.Study_data_contorller.correct_checking();
			};




			get_answer_bnt_index(){
				return this.answer_button_index;
			}





		};













		class Study_data_contorller{

			data_arr = [];
			study_step = new Study_step();

			current_question_index = null;
			question = "";
			answer = "";
			example_arr = [];
			End_Sign = "";

			constructor(data_arr){
				this.data_arr = data_arr;
			};



			next_question(){

				if( this.all_question_suggested() ){
					this.study_step.go_next_step();
					if(this.study_step.End_Sign ==="END" ){
						this.End_Sign = "END";
						return;
					}
					this.correct_check_reset();
					this.suggest_count_reset();
				}

				this.make_question_and_answer();
				this.make_example_arr();

			};



			all_question_suggested(){
				let result = true;

				for(let i=0 ; i<this.data_arr.length ; i++){
					if( this.is_empty(this.data_arr[i]) ) continue;
					if( this.is_not_correct(this.data_arr[i]) ){
						result = false;
						break;
					}
				};

				return result;
			};


			is_empty(data){
				let result = false;
				if(data[this.study_step.get_question_type()] === '') result = true;
				if(data[this.study_step.get_answer_type()] === '') result = true;
				return result;
			}


			is_not_correct( data ){
				return data.correct_check[this.study_step.get_question_type()] === false;
			};


			correct_check_reset(){
				for(let i=0 ; i < this.data_arr.length ; i++){
					this.data_arr[i].correct_check[this.study_step.get_question_type()] = false;
				}
			};

			suggest_count_reset(){
				for(let i=0 ; i < this.data_arr.length ; i++){
					this.data_arr[i].suggest_count[this.study_step.get_question_type()] = 0;
				}
			}


			make_question_and_answer(){
				let count = 0;
				while(count<1000){
					count++;
					let random_number =  Math.floor(this.data_arr.length * Math.random());

					if( this.is_this_an_correct_question(random_number) ) continue;

					this.current_question_index = random_number;

					this.question = this.data_arr[random_number][this.study_step.get_question_type()];
					if( this.question === '' )	continue;

					this.answer = this.data_arr[random_number][this.study_step.get_answer_type()];
					if( this.answer === '' )	continue;

					this.increase_suggest_count(random_number);
					break;
				}
				if(count===1000){
					alert('문제를 출제하지 못했습니다.');
					console.log('question type : '+this.study_step.get_question_type());
					console.log('answer type : '+this.study_step.get_answer_type());
					throw new Exception;
				}


			};


			is_this_an_correct_question(random_number){
				return this.data_arr[random_number].correct_check[this.study_step.get_question_type()];
			};


			increase_suggest_count(index){
				this.data_arr[index].suggest_count[this.study_step.get_question_type()] += 1;
			};


			make_example_arr(){
				this.example_arr = [];
				let count = 0;
				while(count<1000){
					count++;
					let random_number =  Math.floor(this.data_arr.length * Math.random());
					let example = this.data_arr[random_number][this.study_step.get_answer_type()];
					if( example === '' ) continue;
					if( example === this.answer ) continue;
					if( this.data_arr[random_number][this.study_step.get_question_type()] === this.question ) continue;
					if( example === this.example_arr[0] ) continue;
					this.example_arr.push(example);
					if( this.example_arr.length >= 2 ) break;
				}
				if(count===1000){
					alert('보기를 출제하지 못했습니다.');
					throw new Exception;
				}
			};


			correct_checking(){
				this.data_arr[this.current_question_index].correct_check[this.study_step.get_question_type()] = true;
			};


			get_question(){
				return this.question;
			};


			get_answer(){
				return this.answer;
			};


			get_example_arr(){
				return this.example_arr;
			};




		};


























		class Study_step{

			current_step = 0;
			step_arr = make_step_arr();
			End_Sign = "";

			constructor(){

			};


			get_question_type(){
				return this.step_arr[this.current_step].question_type;
			};

			get_answer_type(){
				return this.step_arr[this.current_step].answer_type;
			};

			go_next_step(){
				if( this.current_step === this.step_arr.length-1 ){
					this.current_step = 0;
					this.End_Sign = "END";
				}else{
					this.current_step++;
				}
			};




		};


		function make_step_arr(){
			return [
				{
					question_type 	: "answer_first",
					answer_type 	: "question_second",
				},
				{
					question_type 	: "question_second",
					answer_type 	: "answer_first",
				},
			];
		}



		function make_data_arr(){
			let result = [];

			let my_data = make_my_data();
			my_data.forEach(function(element){
				let question_and_answer = {};
				let keys = Object.keys(element);
				keys.forEach(function(key){
					question_and_answer.question_second = key;
					question_and_answer.answer_first = element[key];
					question_and_answer.suggest_count = { question_second:0 , answer_first:0 } ;
					question_and_answer.correct_check = { question_second:false , answer_first:false } ;
				});
				result.push(question_and_answer);
			});

			console.log(result);
			return result;
		};



//---------------------------- 로직 교체 절취선 --------------------------------------------------------------





		function make_my_data(){
			return  [
				{
					'(단어) \n Back-End'
					: '(단어) \n 백엔드'
				},
				{
					'(단어) \n Server Side'
					: '(단어) \n 서버 사이드'
				},
				{
					'(뜻) \n 서버 사이드'
					: '(뜻) \n 서버에서 동작하는'
				},
				{
					''
					: ''
				},

			];
		};










