package org.cms.controller;

import org.cms.dataobject.UserTeacherDO;
import org.cms.response.CommonReturnType;
import org.cms.service.UserTeacherService;
import org.cms.service.model.UserStudentModel;
import org.cms.service.model.UserTeacherModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller("UserTeacher")
@RequestMapping("/teacher")
@CrossOrigin(allowCredentials = "true", allowedHeaders = "*", originPatterns = "*")
public class UserTeacherController extends BaseController {

    @Autowired
    private UserTeacherService userTeacherService;

    @RequestMapping(value = "/register", method = {RequestMethod.POST}, consumes = {CONTENT_TYPE_FORMED})
    @ResponseBody
    public CommonReturnType register(@RequestParam(name = "name") String name,
                                     @RequestParam(name = "password") String password) {
        UserTeacherModel userTeacherModel = new UserTeacherModel();
        userTeacherModel.setName(name);
        userTeacherModel.setPassword(password);
        userTeacherService.register(userTeacherModel);
        return CommonReturnType.create(null);
    }

    @RequestMapping("/request")
    @ResponseBody
    public UserTeacherDO request(@RequestParam(name = "id")Integer id) {
        UserTeacherDO userTeacherDO = userTeacherService.getUserTeacherById(id);
        return userTeacherDO;
    }


}
