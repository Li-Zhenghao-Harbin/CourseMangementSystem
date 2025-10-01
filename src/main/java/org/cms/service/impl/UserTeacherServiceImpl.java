package org.cms.service.impl;

import org.cms.dao.UserTeacherDOMapper;
import org.cms.dataobject.UserTeacherDO;
import org.cms.service.UserTeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserTeacherServiceImpl implements UserTeacherService {

    @Autowired
    private UserTeacherDOMapper userTeacherDOMapper;

    @Override
    public UserTeacherDO getUserTeacherById(int id) {
        return userTeacherDOMapper.selectByPrimaryKey(id);
    }
}
