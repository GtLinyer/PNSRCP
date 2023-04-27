package com.pnsrcp.web.dao.BasicDatabaseRTS;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.BasicDatabaseRTS.BDRTSInvasiveVentilation;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/30 21:03 星期六
 * @Description: 基础数据库 呼吸系统 撤机失败 有创通气 数据层
 */
@Mapper
public interface BDRtsWfMapper extends BaseMapper<BDRTSInvasiveVentilation> {}