package org.cms.service;

import org.cms.dataobject.UserTeacherDO;
import org.cms.service.model.UserStudentModel;
import org.cms.service.model.UserTeacherModel;

public interface UserTeacherService {
    void register(UserTeacherModel userTeacherModel);
    public UserTeacherDO getUserTeacherById(int id);
}
