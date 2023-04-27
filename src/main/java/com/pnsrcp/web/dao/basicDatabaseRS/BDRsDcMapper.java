package com.pnsrcp.web.dao.basicDatabaseRS;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.BDRSDeathCause;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/29 22:24 星期五
 * @Description: 基础数据库 复苏情况 死亡原因 数据层
 */
@Mapper
public interface BDRsDcMapper extends BaseMapper<BDRSDeathCause> {}