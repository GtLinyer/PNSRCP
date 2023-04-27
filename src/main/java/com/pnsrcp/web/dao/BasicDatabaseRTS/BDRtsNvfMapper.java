package com.pnsrcp.web.dao.BasicDatabaseRTS;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.BasicDatabaseRTS.BDRTSNivFailed;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/30 20:07 星期六
 * @Description: 基础数据库 呼吸系统 无创通气失败 数据层
 */
@Mapper
public interface BDRtsNvfMapper extends BaseMapper<BDRTSNivFailed> {}