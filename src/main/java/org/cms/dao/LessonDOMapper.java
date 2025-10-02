package org.cms.dao;

import java.util.List;
import org.cms.dataobject.LessonDO;

public interface LessonDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(LessonDO record);

    LessonDO selectByPrimaryKey(Integer id);

    List<LessonDO> selectAll();

    int updateByPrimaryKey(LessonDO record);

    List<LessonDO> getLessonsByCourseId(Integer courseId);

    List<LessonDO> getLessonsByDate(String startDate, String endDate);
}