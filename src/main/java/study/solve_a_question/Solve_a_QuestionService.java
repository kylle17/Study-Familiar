package study.solve_a_question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;

@Service
public class Solve_a_QuestionService {

    @Autowired
    Solve_a_QuestionMapper solve_a_questionMapper;


    public ArrayList<HashMap<String, String>> selectLevel1() {
        return solve_a_questionMapper.selectLevel1();
    }


    public ArrayList<HashMap<String, String>> selectLevel2(String level1) {
        return solve_a_questionMapper.selectLevel2(level1);
    }


    public ArrayList<HashMap<String, String>> selectCategorize_group(String level1, String level2) {
        return solve_a_questionMapper.selectCategorize_group(level1, level2);
    }


    public ArrayList<HashMap<String, String>> selectKnowledges(String level1, String level2, String categorize_group) {
        return solve_a_questionMapper.selectKnowledges(level1, level2, categorize_group);
    }


    public void copy_study_menu() {
        solve_a_questionMapper.mismatch_study_menu_remove();
        solve_a_questionMapper.copy_study_menu();
    }


    void record_reset() {
        solve_a_questionMapper.record_reset();
    }


    public void pass_record(String level1, String level2, String categorize_group) {
        solve_a_questionMapper.pass_record(level1, level2, categorize_group);
    }


}
