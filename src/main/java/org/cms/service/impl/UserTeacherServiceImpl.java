package org.cms.service.impl;

import org.cms.dao.UserTeacherMapper;
import org.cms.dataobject.UserTeacher;
import org.cms.service.UserTeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserTeacherServiceImpl implements UserTeacherService {

    @Autowired
    private UserTeacherMapper userTeacherMapper;

    @Override
    public UserTeacher getUserTeacherById(int id) {
        return userTeacherMapper.selectByPrimaryKey(id);
    }
}
