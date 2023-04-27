package com.pnsrcp.web.dao.manage;

import com.pnsrcp.web.dao.PcBaseMapper;
import com.pnsrcp.web.entity.manage.HospitalAuthRD;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/08/24 16:23 星期三
 * @Description: 医院信息 研究数据库 权限 数据层
 */
@Mapper
public interface HospitalRDAuthorityMapper extends PcBaseMapper<HospitalAuthRD> {}