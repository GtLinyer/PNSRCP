package com.pnsrcp.web.dao.basicDatabaseNS;

import com.pnsrcp.web.dao.PcBaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseNS.BDNSTreatmentDiagnosis;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/22 19:30 星期五
 * @Description: 基础数据库 神经系统 治疗及诊断 数据层
 */
@Mapper
public interface BDNsTdMapper extends PcBaseMapper<BDNSTreatmentDiagnosis> {}
