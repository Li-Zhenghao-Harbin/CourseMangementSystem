package org.cms.dao;

import java.util.List;
import org.cms.dataobject.UserStudentDO;

public interface UserStudentDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(UserStudentDO record);

    UserStudentDO selectByPrimaryKey(Integer id);

    List<UserStudentDO> selectAll();

    int updateByPrimaryKey(UserStudentDO record);

    int deleteByStudentName(String studentName);

    List<UserStudentDO> getStudents(Integer studentId, String studentName);
}