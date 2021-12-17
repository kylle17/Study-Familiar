package study.knowledge_manage;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KnowledgeDTO {


    int id ;
    int order_num;
    String level1;
    String level2;
    String categorize_group;
    String categorize;
    String question;
    String answer;

}
