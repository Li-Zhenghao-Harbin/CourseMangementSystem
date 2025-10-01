package org.cms.controller;

import org.cms.dataobject.UserTeacherDO;
import org.cms.service.UserTeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller("UserTeacher")
@RequestMapping("/teacher")
@CrossOrigin(allowCredentials = "true", allowedHeaders = "*", originPatterns = "*")
public class UserTeacherController extends BaseController {

    @Autowired
    private UserTeacherService userTeacherService;

    @RequestMapping("/request")
    @ResponseBody
    public UserTeacherDO request(@RequestParam(name = "id")Integer id) {
        UserTeacherDO userTeacherDO = userTeacherService.getUserTeacherById(id);
        return userTeacherDO;
    }

}
