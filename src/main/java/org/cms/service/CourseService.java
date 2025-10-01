package org.cms.service;

import org.cms.service.model.CourseModel;
import org.cms.service.model.LessonModel;

import java.util.List;

public interface CourseService {
    void registerCourse(CourseModel courseModel);
    void addCourseSchedule(List<LessonModel> lessonModels);
}
