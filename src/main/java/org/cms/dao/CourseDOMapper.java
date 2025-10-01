package org.cms.dao;

import java.util.List;
import org.cms.dataobject.CourseDO;

public interface CourseDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(CourseDO record);

    CourseDO selectByPrimaryKey(Integer id);

    List<CourseDO> selectAll();

    int updateByPrimaryKey(CourseDO record);
}