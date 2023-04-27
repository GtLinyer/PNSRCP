package com.pnsrcp.web.dao.doctorPatientCommunication;

import com.pnsrcp.web.dao.PcBaseMapper;
import com.pnsrcp.web.entity.perintalPlatform.doctorPatientCommunication.DPCBreastMilkDiary;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/30 22:48 星期六
 * @Description: 医患交流库 母乳日志 数据层
 */
@Mapper
public interface DPCBmdMapper extends PcBaseMapper<DPCBreastMilkDiary> {}