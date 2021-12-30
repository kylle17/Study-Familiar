package study;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Vector;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@SpringBootTest
class HelloSpringApplicationTests {

	@Test
	int solution(int[] numbers)
	{
		int answer = -1;

		int[] arr = new int[100];
		for(int i=0 , length = 100 ; i<length ; i++){
			arr[i] = 0;
		}


		for(int i = 0 , length = numbers.length ; i< length ; i++){
			int number = numbers[i];
			int before_number = arr[number];
			arr[number] = before_number+1 ;
		}

		for(int i=0 , length = arr.length ; i< length ; i++ ){
			if( arr[i] > numbers.length/2 ) answer = i;
		}

		return answer;
	}




	public String solution(int num) {
		String answer = "";

		String[] eng = { "zero" , "one" , "two" , "three" , "four" , "five" , "six" , "seven" , "eight" , "nine"};

		while(true){
			int target_num = num % 10 ;
			answer = eng[target_num] +answer;
			num = num / 10;
			if(  num < 1 ) {
				break;
			}
		}


		return answer;
	}



	public int solution(String phone_number) {

		int answer = 0;

		Pattern pattern1 = Pattern.compile("\\d{3}-\\d{4}-\\d{4}");
		Pattern pattern2 = Pattern.compile("\\d{11}");
		Pattern pattern3 = Pattern.compile("\\+82-\\d{2}-\\d{4}-\\d{4}");

		if( pattern1.matcher(phone_number).matches() ) return 1;
		if( pattern2.matcher(phone_number).matches() ) return 2;
		if( pattern3.matcher(phone_number).matches() ) return 3;
		return -1;

	}




	public boolean solution(int[] arr, int n) {
		boolean answer = false;

		HashMap<Integer,Integer> num_map = new HashMap<Integer,Integer>();
		for(int i=0 , length = arr.length ; i<length ; i++){
			num_map.put( arr[i] , arr[i] );
		}


		for(int i=0 , length = arr.length ; i<length ; i++){
			int target_num  = arr[i] - n ;
			if( !(num_map.get(target_num)==null ) ) return true;
		}

		return answer;
	}



}
