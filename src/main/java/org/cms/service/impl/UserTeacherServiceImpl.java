package org.cms.service.impl;

import org.cms.dao.UserTeacherDOMapper;
import org.cms.dataobject.UserTeacherDO;
import org.cms.service.UserTeacherService;
import org.cms.service.model.UserTeacherModel;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserTeacherServiceImpl implements UserTeacherService {

    @Autowired
    private UserTeacherDOMapper userTeacherDOMapper;

    @Override
    public void register(UserTeacherModel userTeacherModel) {
        UserTeacherDO userTeacherDO = getUserTeacherByModel(userTeacherModel);
        userTeacherDOMapper.insert(userTeacherDO);
    }

    @Override
    public UserTeacherDO getUserTeacherById(int id) {
        return userTeacherDOMapper.selectByPrimaryKey(id);
    }

    private UserTeacherDO getUserTeacherByModel(UserTeacherModel userTeacherModel) {
        UserTeacherDO userTeacherDO = new UserTeacherDO();
        BeanUtils.copyProperties(userTeacherModel, userTeacherDO);
        return userTeacherDO;
    }
}
