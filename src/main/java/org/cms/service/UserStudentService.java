package org.cms.service;

import org.cms.dataobject.CourseEnrollmentDO;
import org.cms.service.model.UserStudentModel;

public interface UserStudentService {
    void register(UserStudentModel userStudentModel);
    void remove(int studentId);
    void enroll(CourseEnrollmentDO courseEnrollmentDO);
    void unenroll(CourseEnrollmentDO courseEnrollmentDO);
}
