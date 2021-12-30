package study.solve_a_question;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;

@Mapper
@Repository
public interface Solve_a_QuestionMapper {

    ArrayList<HashMap<String, String>> selectLevel1();

    ArrayList<HashMap<String, String>> selectLevel2(String level1);

    ArrayList<HashMap<String, String>> selectCategorize_group(@Param("level1") String level1, @Param("level2") String level2);

    ArrayList<HashMap<String, String>> selectKnowledges(@Param("level1") String level1, @Param("level2") String level2, @Param("categorize_group") String categorize_group);

    void mismatch_study_menu_remove();

    void copy_study_menu();

    void record_reset();

    void pass_record(@Param("level1") String level1, @Param("level2") String level2, @Param("categorize_group") String categorize_group);


}
