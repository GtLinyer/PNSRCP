package com.pnsrcp.web.dao.basicDatabase;

import com.pnsrcp.web.dao.PcBaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.basicDatabse.BDPerinatalInformation;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/29 21:01 星期五
 * @Description: 基础数据库 围产信息 数据层
 */
@Mapper
public interface BDPiMapper extends PcBaseMapper<BDPerinatalInformation> {}