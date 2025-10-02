package org.cms.dao;

import java.util.List;
import org.cms.dataobject.CourseEnrollmentDO;

public interface CourseEnrollmentDOMapper {
    int insert(CourseEnrollmentDO record);

    List<CourseEnrollmentDO> selectAll();
}