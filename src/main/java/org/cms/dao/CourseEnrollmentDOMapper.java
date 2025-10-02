package org.cms.dao;

import java.util.List;
import org.cms.dataobject.CourseEnrollmentDO;

public interface CourseEnrollmentDOMapper {
    int enroll(CourseEnrollmentDO record);

    int unenroll(CourseEnrollmentDO record);

    List<CourseEnrollmentDO> selectAll();
}