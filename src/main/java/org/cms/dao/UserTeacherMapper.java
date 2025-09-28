package org.cms.dao;

import java.util.List;
import org.cms.dataobject.UserTeacher;

public interface UserTeacherMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(UserTeacher record);

    UserTeacher selectByPrimaryKey(Integer id);

    List<UserTeacher> selectAll();

    int updateByPrimaryKey(UserTeacher record);
}