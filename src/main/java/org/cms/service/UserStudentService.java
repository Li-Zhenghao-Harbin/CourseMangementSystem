package org.cms.service;

import org.cms.dataobject.CourseEnrollmentDO;
import org.cms.service.model.UserStudentModel;

import java.util.List;

public interface UserStudentService {
    void register(UserStudentModel userStudentModel);
    void remove(String studentName);
    void enroll(CourseEnrollmentDO courseEnrollmentDO);
    void unenroll(CourseEnrollmentDO courseEnrollmentDO);
    List<UserStudentModel> getStudents(Integer studentId, String studentName);
}
