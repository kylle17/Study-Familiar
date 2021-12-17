package study.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class MainController {

    @Autowired
    MainService mainService;


    @GetMapping("")
    public String study() {
        return "index";
    }


}
