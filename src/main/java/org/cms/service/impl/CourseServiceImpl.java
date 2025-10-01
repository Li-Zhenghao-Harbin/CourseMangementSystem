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
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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
    @Transactional
    public void addCourseSchedule(List<LessonModel> lessonModels) {
        List<LessonDO> lessonDOs = convertFromLessonModels(lessonModels);
        for (LessonDO lessonDO : lessonDOs) {
            lessonDOMapper.insert(lessonDO);
        }
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
}
