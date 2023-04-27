package com.pnsrcp.web.dao.basicDatabaseCS;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabaseCS.BDCSPdaTreatment;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/30 00:02 星期六
 * @Description: 基础数据库 循环系统 PDA治疗 数据层
 */
@Mapper
public interface BDCsPdaTreatmentMapper extends BaseMapper<BDCSPdaTreatment> {}