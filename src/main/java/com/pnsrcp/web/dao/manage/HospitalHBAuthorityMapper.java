package com.pnsrcp.web.dao.manage;

import com.pnsrcp.web.dao.PcBaseMapper;
import com.pnsrcp.web.entity.manage.HospitalAuthHB;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/08/24 16:28 星期三
 * @Description: 医院信息 高胆数据库 权限 数据层
 */
@Mapper
public interface HospitalHBAuthorityMapper extends PcBaseMapper<HospitalAuthHB> {}