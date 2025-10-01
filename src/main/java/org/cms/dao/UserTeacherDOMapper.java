package org.cms.dao;

import java.util.List;
import org.cms.dataobject.UserTeacherDO;

public interface UserTeacherDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(UserTeacherDO record);

    UserTeacherDO selectByPrimaryKey(Integer id);

    List<UserTeacherDO> selectAll();

    int updateByPrimaryKey(UserTeacherDO record);
}