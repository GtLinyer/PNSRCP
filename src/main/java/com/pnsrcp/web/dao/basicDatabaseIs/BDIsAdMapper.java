package com.pnsrcp.web.dao.basicDatabaseIs;

import com.pnsrcp.web.dao.PcBaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseIS.BDISAd;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/08/23 15:21 星期二
 * @Description: 基础数据库 感染监测 抗菌药物 数据层
 */
@Mapper
public interface BDIsAdMapper extends PcBaseMapper<BDISAd> {}