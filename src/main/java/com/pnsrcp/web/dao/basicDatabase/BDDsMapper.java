package com.pnsrcp.web.dao.basicDatabase;

import com.pnsrcp.web.dao.PcBaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.BDDischargeSituation;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/30 15:34 星期六
 * @Description: 基础数据库 出院情况 数据层
 */
@Mapper
public interface BDDsMapper extends PcBaseMapper<BDDischargeSituation> {}