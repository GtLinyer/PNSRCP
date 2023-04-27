package com.pnsrcp.web.dao.manage;

import com.pnsrcp.web.dao.PcBaseMapper;
import com.pnsrcp.web.entity.manage.HospitalAuthUI;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/08/24 16:25 星期三
 * @Description: 医院信息 超声影像库 权限 数据层
 */
@Mapper
public interface HospitalUIAuthorityMapper extends PcBaseMapper<HospitalAuthUI> {}