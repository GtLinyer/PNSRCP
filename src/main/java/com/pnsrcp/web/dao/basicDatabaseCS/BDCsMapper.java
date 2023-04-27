package com.pnsrcp.web.dao.basicDatabaseCS;

import com.pnsrcp.web.dao.PcBaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseCS.BDCirculatorySystem;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/29 23:54 星期五
 * @Description: 基础数据库 循环系统 数据层
 */
@Mapper
public interface BDCsMapper extends PcBaseMapper<BDCirculatorySystem> {}