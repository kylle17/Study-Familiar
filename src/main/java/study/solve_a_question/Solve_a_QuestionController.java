package study.solve_a_question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import study.knowledge_manage.KnowledgeDTO;
import study.knowledge_manage.KnowledgeManageService;

import java.util.ArrayList;
import java.util.HashMap;

@Controller
public class Solve_a_QuestionController {

    @Autowired
    Solve_a_QuestionService solve_a_questionService;


    @GetMapping("no_study_level1")
    @ResponseBody
    public ArrayList<HashMap<String,String>> selectLevel1(){ return solve_a_questionService.selectLevel1();  }


    @GetMapping("no_study_level2")
    @ResponseBody
    public ArrayList<HashMap<String,String>> selectLevel2( String level1){
        return solve_a_questionService.selectLevel2(level1); }


    @GetMapping("no_study_categorize_group")
    @ResponseBody
    public ArrayList<HashMap<String,String>> selectCategorize_group( String level1 , String level2 ){
        return solve_a_questionService.selectCategorize_group(level1 , level2); }



    @GetMapping("solve_a_question_main")
    public String solve_a_question_main_page(String password){
        if( password.equals("1115") ){
            return "solve_a_question_main";
        }else{
            return "index";
        }
    }


    @GetMapping("solve_a_question")
    public String solve_a_question_page( String level1 ,  String level2 ,  String categorize_group , Model model){
        model.addAttribute( "level1" , level1 );
        model.addAttribute( "level2" , level2 );
        model.addAttribute( "categorize_group" , categorize_group );
        return "solve_a_question";
    }


    @GetMapping("knowledges")
    @ResponseBody
    public ArrayList<HashMap<String,String>> selectKnowledges( String level1 , String level2 , String categorize_group ){
        return solve_a_questionService.selectKnowledges(level1,level2,categorize_group);
    }


    @PostMapping("copy_study_menu")
    @ResponseBody
    public void copy_study_menu(){
        solve_a_questionService.copy_study_menu();
    }



    @PutMapping("record_reset")
    @ResponseBody
    public void record_reset(){
        solve_a_questionService.record_reset();
    }



    @PatchMapping("pass_record")
    public void pass_record(String level1 , String level2 , String categorize_group){
        solve_a_questionService.pass_record( level1 , level2 , categorize_group);
    }






}
