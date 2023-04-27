package com.pnsrcp.web.dao.basicDatabaseIs;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseIS.BDISLosRf;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/08/23 15:10 星期二
 * @Description: 基础数据库 感染监测 LOS流程 危险因素 数据层
 */
@Mapper
public interface BDIsLosRfMapper extends BaseMapper<BDISLosRf> {}