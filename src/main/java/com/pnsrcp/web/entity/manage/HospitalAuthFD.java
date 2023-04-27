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
 * @Date: 2022/06/02 14:19 星期四
 * @Description: 医院 随访数据库权限 实体
 */
@Getter
@Setter
@TableName("pc_hospital_auth_fd")
public class HospitalAuthFD {
    @TableId(type = IdType.AUTO)
    private Integer hid;
    private int followDatabase = 0;
    private int fdFollowInformation = 0;
    private int fdGrowthCurve = 0;
    private int fdDevelopmentalLevel = 0;
    private int fdGrowthProcess = 0;
    private int fdGrowthExchange = 0;
    private int fdSpecialDisease = 0;
}
