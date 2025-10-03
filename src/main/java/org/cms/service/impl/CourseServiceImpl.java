package org.cms.service.impl;

import org.cms.common.Utils.CommonUtils;
import org.cms.dao.CourseDOMapper;
import org.cms.dao.LessonDOMapper;
import org.cms.dataobject.CourseDO;
import org.cms.dataobject.LessonDO;
import org.cms.service.CourseService;
import org.cms.service.model.CourseModel;
import org.cms.service.model.LessonModel;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class CourseServiceImpl implements CourseService {
    @Autowired
    private CourseDOMapper courseDOMapper;

    @Autowired
    private LessonDOMapper lessonDOMapper;

    @Override
    public void registerCourse(CourseModel courseModel) {
        CourseDO courseDO = convertFromCourseModel(courseModel);
        courseDOMapper.insert(courseDO);
    }

    @Override
    public void addCourseSchedule(List<LessonModel> lessonModels) {
        List<LessonDO> lessonDOs = convertFromLessonModels(lessonModels);
        for (LessonDO lessonDO : lessonDOs) {
            lessonDOMapper.insert(lessonDO);
        }
    }

    @Override
    @Transactional
    public List<CourseModel> getCourses(int courseId, String courseName, int teacherId, String teacherName) {
        List<CourseDO> courseDOs = courseDOMapper.getCourses(courseId, courseName, teacherId, teacherName);
        List<CourseModel> courses = convertFromCourseDOs(courseDOs);
        return courses;
    }

    @Override
    @Transactional
    public List<CourseModel> getCoursesByDate(String startDate, String endDate) {
        List<LessonDO> lessonDOs = lessonDOMapper.getLessonsByDate(startDate, endDate);
        List<LessonModel> lessonModels = convertFromLessonDOs(lessonDOs);
        // 根据Lesson获取对应的Course
        List<CourseModel> courses = new ArrayList<>();
        Map<Integer, List<LessonModel>> lessonModelMap = new HashMap<>();
        for (LessonModel lessonModel : lessonModels) {
            if (!lessonModelMap.containsKey(lessonModel.getCourseId())) {
                List<LessonModel> lessonModelList = new ArrayList<>();
                lessonModelList.add(lessonModel);
                lessonModelMap.put(lessonModel.getCourseId(), lessonModelList);
            } else {
                lessonModelMap.get(lessonModel.getCourseId()).add(lessonModel);
            }
        }
        for (HashMap.Entry<Integer, List<LessonModel>> entry : lessonModelMap.entrySet()) {
            CourseDO courseDO = courseDOMapper.selectByPrimaryKey(entry.getKey());
            CourseModel courseModel = convertFromCourseDO(courseDO);
            courseModel.setLessons(entry.getValue());
            courses.add(courseModel);
        }
        return courses;
    }

    @Override
    public void removeCourse(int courseId) {
        courseDOMapper.deleteByPrimaryKey(courseId);
    }

    private CourseDO convertFromCourseModel(CourseModel courseModel) {
        CourseDO courseDO = new CourseDO();
        BeanUtils.copyProperties(courseModel, courseDO);
        courseDO.setAddTime(CommonUtils.getCurrentDate());
        return courseDO;
    }

    private List<LessonDO> convertFromLessonModels(List<LessonModel> lessonModels) {
        List<LessonDO> lessonDOs = new ArrayList<>();
        for (LessonModel lessonModel : lessonModels) {
            LessonDO lessonDO = new LessonDO();
            BeanUtils.copyProperties(lessonModel, lessonDO);
            lessonDOs.add(lessonDO);
        }
        return lessonDOs;
    }

    private CourseModel convertFromCourseDO(CourseDO courseDO) {
        CourseModel courseModel = new CourseModel();
        BeanUtils.copyProperties(courseDO, courseModel);
        return courseModel;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    private List<CourseModel> convertFromCourseDOs(List<CourseDO> courseDOs) {
        List<CourseModel> courseModels = new ArrayList<>();
        for (CourseDO courseDO : courseDOs) {
            CourseModel courseModel = new CourseModel();
            BeanUtils.copyProperties(courseDO, courseModel);
            // 获取Lesson
            int courseId = courseDO.getId();
            List<LessonDO> lessonDOs = lessonDOMapper.getLessonsByCourseId(courseId);
            List<LessonModel> lessonModels = convertFromLessonDOs(lessonDOs);
            courseModel.setLessons(lessonModels);
            courseModels.add(courseModel);
        }
        return courseModels;
    }

    private List<LessonModel> convertFromLessonDOs(List<LessonDO> lessonDOs) {
        List<LessonModel> lessonModels = new ArrayList<>();
        for (LessonDO lessonDO : lessonDOs) {
            LessonModel lessonModel = new LessonModel();
            BeanUtils.copyProperties(lessonDO, lessonModel);
            lessonModels.add(lessonModel);
        }
        return lessonModels;
    }
}
