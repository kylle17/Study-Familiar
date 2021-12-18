package study.knowledge_manage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import study.main.MainService;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

@Controller
public class KnowledgeManageController {

    @Autowired
    KnowledgeManageService knowledgeManageService;


    @GetMapping("knowledge_manage")
    public String knowledge_manage_page( @RequestParam(defaultValue ="") String password){
        if( password.equals("1115") ){
            return "knowledge_manage";
        }else{
            return "index";
        }
    }


    @GetMapping("level1")
    @ResponseBody
    public ArrayList<HashMap<String,String>> selectLevel1(){ return knowledgeManageService.selectLevel1();  }


    @PatchMapping("level1")
    @ResponseBody
    public int updateLevel1( @RequestBody ArrayList<HashMap<String,String>> level1 ){
        return knowledgeManageService.updateLevel1(level1); }


    @GetMapping("level2")
    @ResponseBody
    public ArrayList<HashMap<String,String>> selectLevel2( String level1){
        return knowledgeManageService.selectLevel2(level1); }


    @PatchMapping("level2")
    @ResponseBody
    public int updateLevel2( @RequestBody ArrayList<HashMap<String,String>> level2 ){
        return knowledgeManageService.updateLevel2(level2); }


    @GetMapping("categorize_group")
    @ResponseBody
    public ArrayList<HashMap<String,String>> selectCategorize_group( String level1 , String level2 ){
        return knowledgeManageService.selectCategorize_group(level1 , level2); }


    @GetMapping("knowledge")
    @ResponseBody
    public ArrayList<KnowledgeDTO> selectKnowledge( String level1 , String level2 , String categorize_group ){
        return knowledgeManageService.selectKnowledge( level1 , level2 , categorize_group );
    }


    @PostMapping("knowledges")
    @ResponseBody
    public int insertKnowledges(@RequestBody ArrayList<KnowledgeDTO> knowledgeDTOList){
        return knowledgeManageService.insertKnowledges(knowledgeDTOList);
    }


    @PostMapping("knowledge")
    @ResponseBody
    public int insertKnowledge(@RequestBody KnowledgeDTO knowledgeDTO){
        return knowledgeManageService.insertKnowledge(knowledgeDTO);
    }

    @DeleteMapping("knowledge")
    @ResponseBody
    public int deleteKnowledge( @RequestBody HashMap<String,String> hashmap ){
        int id = Integer.parseInt(hashmap.get("id"));
        System.out.println(id);
        return knowledgeManageService.deleteKnowledge(id);
    }


    @GetMapping("common")
    @ResponseBody
    public ArrayList<String> selectCommon( String categorize ){
        return knowledgeManageService.selectCommon( categorize );
    }






}
