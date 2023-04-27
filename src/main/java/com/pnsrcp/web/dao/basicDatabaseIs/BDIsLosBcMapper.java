package com.pnsrcp.web.dao.basicDatabaseIs;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseIS.BDISLosBc;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/08/23 15:05 星期二
 * @Description: 基础数据库 感染监测 LOS流程 血培养 数据层
 */
@Mapper
public interface BDIsLosBcMapper extends BaseMapper<BDISLosBc> {}