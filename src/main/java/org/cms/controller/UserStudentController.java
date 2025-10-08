package org.cms.controller;

import org.cms.dataobject.CourseEnrollmentDO;
import org.cms.dataobject.UserTeacherDO;
import org.cms.response.CommonReturnType;
import org.cms.service.UserStudentService;
import org.cms.service.UserTeacherService;
import org.cms.service.model.LessonModel;
import org.cms.service.model.UserStudentModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.cms.controller.BaseController.CONTENT_TYPE_FORMED;

@Controller("UserStudent")
@RequestMapping("/student")
@CrossOrigin(allowCredentials = "true", allowedHeaders = "*", originPatterns = "*")
public class UserStudentController {

    @Autowired
    private UserStudentService userStudentService;

    @RequestMapping(value = "/register", method = {RequestMethod.POST}, consumes = {CONTENT_TYPE_FORMED})
    @ResponseBody
    public CommonReturnType register(@RequestParam(name = "name") String name) {
        UserStudentModel userStudentModel = new UserStudentModel();
        userStudentModel.setName(name);
        userStudentService.register(userStudentModel);
        return CommonReturnType.create(null);
    }

    @RequestMapping(value = "/remove", method = {RequestMethod.POST}, consumes = {CONTENT_TYPE_FORMED})
    @ResponseBody
    public CommonReturnType remove(@RequestParam(name = "studentName") String studentName) {
        userStudentService.remove(studentName);
        return CommonReturnType.create(null);
    }

    @RequestMapping(value = "/enroll", method = {RequestMethod.POST}, consumes = {CONTENT_TYPE_FORMED})
    @ResponseBody
    public CommonReturnType enroll(@RequestParam(name = "studentId") Integer studentId,
                                   @RequestParam(name = "courseId") Integer courseId) {
        CourseEnrollmentDO courseEnrollmentDO = new CourseEnrollmentDO();
        courseEnrollmentDO.setStudentId(studentId);
        courseEnrollmentDO.setCourseId(courseId);
        userStudentService.enroll(courseEnrollmentDO);
        return CommonReturnType.create(null);
    }

    @RequestMapping(value = "/unenroll", method = {RequestMethod.POST}, consumes = {CONTENT_TYPE_FORMED})
    @ResponseBody
    public CommonReturnType unenroll(@RequestParam(name = "studentId") Integer studentId,
                                     @RequestParam(name = "courseId") Integer courseId) {
        CourseEnrollmentDO courseEnrollmentDO = new CourseEnrollmentDO();
        courseEnrollmentDO.setStudentId(studentId);
        courseEnrollmentDO.setCourseId(courseId);
        userStudentService.unenroll(courseEnrollmentDO);
        return CommonReturnType.create(null);
    }

    @RequestMapping(value = "/getStudents", method = {RequestMethod.GET}, consumes = {CONTENT_TYPE_FORMED})
    @ResponseBody
    public CommonReturnType getStudents(@RequestParam(name = "studentId", required = true) Integer studentId,
                                        @RequestParam(name = "studentName", required = true) String studentName) {
        List<UserStudentModel> students = userStudentService.getStudents(studentId, studentName);
        return CommonReturnType.create(students);
    }
}
