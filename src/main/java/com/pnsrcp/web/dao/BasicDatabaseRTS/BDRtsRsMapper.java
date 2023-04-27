package com.pnsrcp.web.dao.BasicDatabaseRTS;

import com.pnsrcp.web.dao.PcBaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.BasicDatabaseRTS.BDRTSRespiratorySupport;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/30 19:15 星期六
 * @Description: 基础数据库 呼吸系统 呼吸支持 数据层
 */
@Mapper
public interface BDRtsRsMapper extends PcBaseMapper<BDRTSRespiratorySupport> {}