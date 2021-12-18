package study.knowledge_manage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

@Service
public class KnowledgeManageService {

    @Autowired
    KnowledgeManageMapper knowledgeMapper;


    public ArrayList<HashMap<String,String>> selectLevel1(){ return knowledgeMapper.selectLevel1(); }


    public int updateLevel1(ArrayList<HashMap<String,String>> level1){
        level1.forEach( level1_map -> {
            knowledgeMapper.updateLevel1(level1_map);
        } );
        return 1;
    };


    public ArrayList<HashMap<String,String>> selectLevel2(String level1){ return knowledgeMapper.selectLevel2(level1); }


    public int updateLevel2(ArrayList<HashMap<String,String>> level2){
        level2.forEach( level2_map -> {
            knowledgeMapper.updateLevel2(level2_map);
        } );
        return 1;
    };


    public ArrayList<HashMap<String,String>> selectCategorize_group(String level1 , String level2){ return knowledgeMapper.selectCategorize_group(level1,level2); }


    public ArrayList<KnowledgeDTO> selectKnowledge(String level1 , String level2 , String categorize_group) {
        return knowledgeMapper.selectKnowledge( level1 , level2 , categorize_group );
    }


    public int insertKnowledges(ArrayList<KnowledgeDTO> knowledgeDTOList) {
        for( int i=0 ; i < knowledgeDTOList.size() ;  i++ ){
            KnowledgeDTO knowledgeDTO = knowledgeDTOList.get(i);
            knowledgeDTO.setOrder_num(i);
            int same_id_count = knowledgeMapper.selectId(knowledgeDTO.getId());
            if( same_id_count == 1 ){
                knowledgeMapper.updateKnowledge(knowledgeDTO);
            }else{
                knowledgeMapper.insertKnowledge(knowledgeDTO);
            }
        }
        return 1;
    }


    public int insertKnowledge(KnowledgeDTO knowledgeDTO) {
        int same_id_count = knowledgeMapper.selectId(knowledgeDTO.getId());
        if( same_id_count == 1 ){
            knowledgeMapper.updateKnowledge(knowledgeDTO);
        }else{
            knowledgeMapper.insertKnowledge(knowledgeDTO);
        }
        return 1;
    }



    public int deleteKnowledge( int id ) {
        knowledgeMapper.deleteKnowledge(id);
        return 1;
    }



    public ArrayList<String> selectCommon( String categorize ){ return knowledgeMapper.selectCommon(categorize); }



}
