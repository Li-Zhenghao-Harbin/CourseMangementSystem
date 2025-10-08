package org.cms.service.impl;

import org.cms.dao.CourseEnrollmentDOMapper;
import org.cms.dao.UserStudentDOMapper;
import org.cms.dataobject.CourseEnrollmentDO;
import org.cms.dataobject.UserStudentDO;
import org.cms.service.UserStudentService;
import org.cms.service.model.UserStudentModel;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserStudentServiceImpl implements UserStudentService {
    @Autowired
    private UserStudentDOMapper userStudentDOMapper;

    @Autowired
    private CourseEnrollmentDOMapper courseEnrollmentDOMapper;

    @Override
    public void register(UserStudentModel userStudentModel) {
        UserStudentDO userStudentDO = convertFromUserStudentModel(userStudentModel);
        userStudentDOMapper.insert(userStudentDO);
    }

    @Override
    public void remove(String studentName) {
        userStudentDOMapper.deleteByStudentName(studentName);
    }

    @Override
    public void enroll(CourseEnrollmentDO courseEnrollmentDO) {
        courseEnrollmentDOMapper.enroll(courseEnrollmentDO);
    }

    @Override
    public void unenroll(CourseEnrollmentDO courseEnrollmentDO) {
        courseEnrollmentDOMapper.unenroll(courseEnrollmentDO);
    }

    @Override
    public List<UserStudentModel> getStudents(Integer studentId, String studentName) {
        List<UserStudentDO> studentDOs =  userStudentDOMapper.getStudents(studentId, studentName);
        List<UserStudentModel> studentModels = convertFromUserStudentDOs(studentDOs);
        return studentModels;
    }

    private UserStudentDO convertFromUserStudentModel(UserStudentModel userStudentModel) {
        UserStudentDO userStudentDO = new UserStudentDO();
        BeanUtils.copyProperties(userStudentModel, userStudentDO);
        return userStudentDO;
    }

    private List<UserStudentModel> convertFromUserStudentDOs(List<UserStudentDO> userStudentDOs) {
        List<UserStudentModel> userStudentModels = new ArrayList<>();
        for (UserStudentDO userStudentDO : userStudentDOs) {
            UserStudentModel userStudentModel = new UserStudentModel();
            BeanUtils.copyProperties(userStudentDO, userStudentModel);
            userStudentModels.add(userStudentModel);
        }
        return userStudentModels;
    }
}
