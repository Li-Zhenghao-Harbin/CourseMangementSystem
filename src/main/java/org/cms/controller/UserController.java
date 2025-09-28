package org.cms.controller;

import org.cms.dataobject.UserTeacher;
import org.cms.service.UserTeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller("User")
@RequestMapping("/user")
@CrossOrigin(allowCredentials = "true", allowedHeaders = "*", originPatterns = "*")
public class UserController {

    @Autowired
    private UserTeacherService userTeacherService;

    @RequestMapping("/requestTeacher")
    @ResponseBody
    public UserTeacher request(@RequestParam(name = "id")Integer id) {
        UserTeacher userTeacher = userTeacherService.getUserTeacherById(id);
        return userTeacher;
    }

}
