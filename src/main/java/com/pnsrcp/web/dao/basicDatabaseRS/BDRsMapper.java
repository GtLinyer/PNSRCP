package com.pnsrcp.web.dao.basicDatabaseRS;

import com.pnsrcp.web.dao.PcBaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.BDRecoverySituation;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/29 22:20 星期五
 * @Description: 基础数据库 复苏情况 数据层
 */
@Mapper
public interface BDRsMapper extends PcBaseMapper<BDRecoverySituation> {}