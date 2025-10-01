package org.cms.service.impl;

import org.cms.dao.UserStudentDOMapper;
import org.cms.dataobject.UserStudentDO;
import org.cms.service.UserStudentService;
import org.cms.service.model.UserStudentModel;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserStudentServiceImpl implements UserStudentService {
    @Autowired
    private UserStudentDOMapper userStudentDOMapper;

    @Override
    public void register(UserStudentModel userStudentModel) {
        UserStudentDO userStudentDO = convertFromUserStudentModel(userStudentModel);
        userStudentDOMapper.insert(userStudentDO);
    }

    private UserStudentDO convertFromUserStudentModel(UserStudentModel userStudentModel) {
        UserStudentDO userStudentDO = new UserStudentDO();
        BeanUtils.copyProperties(userStudentModel, userStudentDO);
        return userStudentDO;
    }
}
