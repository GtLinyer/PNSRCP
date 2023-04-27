package com.pnsrcp.web.dao.basicDatabase;

import com.pnsrcp.web.dao.PcBaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.BDGestationInformation;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/29 20:51 星期五
 * @Description: 基础数据库 孕期信息 数据层
 */
@Mapper
public interface BDGiMapper extends PcBaseMapper<BDGestationInformation> {}
