package com.pnsrcp.web.dao.basicDatabaseIs;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseIS.BDISEosNsi;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/08/23 14:52 星期二
 * @Description: 基础数据库 感染监测 EOS流程 非特异性检查 数据层
 */
@Mapper
public interface BDIsEosNsiMapper extends BaseMapper<BDISEosNsi> {}