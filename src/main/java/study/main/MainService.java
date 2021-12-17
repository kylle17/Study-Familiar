package study.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import study.knowledge_manage.KnowledgeDTO;

import java.util.ArrayList;

@Service
public class MainService {

    @Autowired
    MainMapper mainMapper;


}
