package com.pnsrcp.web.dao.basicDatabaseRP;

import com.pnsrcp.web.dao.PcBaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP.BDRPScreeningAssessment;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/30 15:16 星期六
 * @Description: 基础数据库 视网膜病 筛查评估 数据层
 */
@Mapper
public interface BDRpSaMapper extends PcBaseMapper<BDRPScreeningAssessment> {}