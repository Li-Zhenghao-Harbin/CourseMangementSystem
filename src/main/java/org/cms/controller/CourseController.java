package org.cms.controller;

import com.fasterxml.jackson.databind.JsonNode;
import org.cms.response.CommonReturnType;
import org.cms.service.CourseService;
import org.cms.service.model.CourseModel;
import org.cms.service.model.LessonModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static org.cms.controller.BaseController.CONTENT_TYPE_FORMED;
import static org.cms.controller.BaseController.CONTENT_TYPE_JSON;

@Controller("Course")
@RequestMapping("/course")
@CrossOrigin(allowCredentials = "true", allowedHeaders = "*", originPatterns = "*")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @RequestMapping(value = "/register", method = {RequestMethod.POST}, consumes = {CONTENT_TYPE_FORMED})
    @ResponseBody
    public CommonReturnType register(@RequestParam(name = "courseName") String courseName,
                                     @RequestParam(name = "teacherId") Integer teacherId) {
        CourseModel courseModel = new CourseModel();
        courseModel.setCourseName(courseName);
        courseModel.setTeacherId(teacherId);
        courseService.registerCourse(courseModel);
        return CommonReturnType.create(null);
    }

    @RequestMapping(value = "/remove", method = {RequestMethod.POST}, consumes = {CONTENT_TYPE_FORMED})
    @ResponseBody
    public CommonReturnType remove(@RequestParam(name = "courseId") Integer courseId) {
        courseService.removeCourse(courseId);
        return CommonReturnType.create(null);
    }

    @RequestMapping(value = "/addCourseSchedule", method = {RequestMethod.POST}, consumes = {CONTENT_TYPE_JSON})
    @ResponseBody
    public CommonReturnType addCourseSchedule(@RequestBody JsonNode jsonNode) {
        List<LessonModel> lessons = new ArrayList<>();
        JsonNode lessonNodes = jsonNode.get("lessons");
        if (lessonNodes != null && lessonNodes.isArray()) {
            for (JsonNode lessonNode : lessonNodes) {
                LessonModel lessonModel = new LessonModel();
                lessonModel.setCourseId(lessonNode.get("courseId").asInt());
                lessonModel.setLessonNumber(lessonNode.get("lessonNumber").asInt());
                lessonModel.setDate(lessonNode.get("date").asText());
                lessonModel.setStartTime(lessonNode.get("startTime").asText());
                lessonModel.setEndTime(lessonNode.get("endTime").asText());
                lessons.add(lessonModel);
            }
        }
        courseService.addCourseSchedule(lessons);
        return CommonReturnType.create(null);
    }

    @RequestMapping(value = "/getCourses", method = {RequestMethod.GET}, consumes = {CONTENT_TYPE_FORMED})
    @ResponseBody
    public CommonReturnType getCourses(@RequestParam(name = "courseId", required = false, defaultValue = "-1") Integer courseId,
                                      @RequestParam(name = "courseName", required = false, defaultValue = "") String courseName,
                                      @RequestParam(name = "teacherId", required = false, defaultValue = "-1") Integer teacherId,
                                      @RequestParam(name = "teacherName", required = false, defaultValue = "") String teacherName) {
        List<CourseModel> courses = courseService.getCourses(courseId, courseName, teacherId, teacherName);
        return CommonReturnType.create(courses);
    }

    @RequestMapping(value = "/getCoursesByDate", method = {RequestMethod.GET}, consumes = {CONTENT_TYPE_FORMED})
    @ResponseBody
    public CommonReturnType getCoursesByDate(@RequestParam(name = "startDate", required = false, defaultValue = "") String startDate,
                                             @RequestParam(name = "endDate", required = false, defaultValue = "") String endDate) {
        List<CourseModel> courses = courseService.getCoursesByDate(startDate, endDate);
        return CommonReturnType.create(courses);
    }

    @RequestMapping(value = "/getLessons", method = {RequestMethod.GET}, consumes = {CONTENT_TYPE_FORMED})
    @ResponseBody
    public CommonReturnType getLessons(@RequestParam(name = "courseId", required = true) Integer courseId,
                                       @RequestParam(name = "startDate", required = false, defaultValue = "") String startDate,
                                       @RequestParam(name = "endDate", required = false, defaultValue = "") String endDate,
                                       @RequestParam(name = "startTime", required = false, defaultValue = "") String startTime,
                                       @RequestParam(name = "endTime", required = false, defaultValue = "") String endTime) {
        List<LessonModel> lessons = courseService.getLessons(courseId, startDate, endDate, startTime, endTime);
        return CommonReturnType.create(lessons);
    }
}
