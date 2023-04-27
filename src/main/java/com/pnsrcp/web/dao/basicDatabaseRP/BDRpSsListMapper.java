package com.pnsrcp.web.dao.basicDatabaseRP;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP.BDRPSsList;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/30 15:06 星期六
 * @Description: 基础数据库 视网膜病 筛查情况 列表 数据层
 */
@Mapper
public interface BDRpSsListMapper extends BaseMapper<BDRPSsList> {}