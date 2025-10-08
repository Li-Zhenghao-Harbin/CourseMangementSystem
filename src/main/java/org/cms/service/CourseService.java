package org.cms.service;

import org.cms.service.model.CourseModel;
import org.cms.service.model.LessonModel;

import java.util.List;

public interface CourseService {
    void registerCourse(CourseModel courseModel);
    void addCourseSchedule(List<LessonModel> lessonModels);
    List<CourseModel> getCourses(int courseId, String courseName, int teacherId, String teacherName);
    List<CourseModel> getCoursesByDate(String startDate, String endDate);
    void removeCourse(int courseId);
    List<LessonModel> getLessons(int courseId, String startDate, String endDate, String startTime, String endTime);
}
