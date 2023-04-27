package com.pnsrcp.web.dao.basicDatabaseNS;

import com.pnsrcp.web.dao.PcBaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseNS.BDNSAuxiliaryExamination;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/22 22:27 星期五
 * @Description: 基础数据库 辅助检查 超声 数据层
 */
@Mapper
public interface BDNsAeMapper extends PcBaseMapper<BDNSAuxiliaryExamination> {}