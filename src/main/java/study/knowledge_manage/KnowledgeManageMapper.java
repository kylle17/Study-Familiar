package study.knowledge_manage;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;

@Mapper
@Repository
public interface KnowledgeManageMapper {

    ArrayList<HashMap<String,String>> selectLevel1();
    ArrayList<HashMap<String,String>> selectLevel2(String level1);
    int updateLevel2(HashMap<String,String> level2);
    ArrayList<HashMap<String,String>> selectCategorize_group(@Param("level1") String level1 , @Param("level2")String level2);
    ArrayList<KnowledgeDTO> selectKnowledge(@Param("level1") String level1 , @Param("level2")String level2 , @Param("categorize_group")String categorize_group);
    int selectId(int id);
    int insertKnowledge(KnowledgeDTO knowledgeDTO);
    int updateKnowledge(KnowledgeDTO knowledgeDTO);
    int deleteKnowledge(int id);
    ArrayList<String> selectCommon(String categorize);

}
