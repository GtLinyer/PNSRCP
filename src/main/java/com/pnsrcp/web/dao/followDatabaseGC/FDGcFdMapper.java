package com.pnsrcp.web.dao.followDatabaseGC;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.followDatabase.FDGcFeedingRecord;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/08/03 15:58 星期三
 * @Description: 随访数据库 生长曲线 喂养 数据层
 */
@Mapper
public interface FDGcFdMapper extends BaseMapper<FDGcFeedingRecord> {}