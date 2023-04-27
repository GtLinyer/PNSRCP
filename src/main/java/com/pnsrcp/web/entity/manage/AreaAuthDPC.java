package com.pnsrcp.web.entity.manage;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/1/28 23:54 星期五
 * @Description: 区域 医患交流库权限 实体
 */
@Getter
@Setter
@TableName("pc_area_auth_dpc")
public class AreaAuthDPC {
    @TableId(type = IdType.AUTO)
    private Integer aid;
    private int doctorPatientCommunication = 0;
    private int dpcBreastMilkDiary = 0;
    private int dpcGrowthCurve = 0;
    private int dpcFeedingSituation = 0;
    private int dpcDoctorPatientCommunication = 0;
}
