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
 * @Date: 2021/8/5 13:35 星期四
 * @Description: 医院 基础数据库权限 实体
 */
@Getter
@Setter
@TableName("pc_hospital_auth_bd")
public class HospitalAuthBD {
    @TableId(type = IdType.AUTO)
    private Integer hid;
    private int basicDatabase = 0;
    private int bdMotherInformation = 0;
    private int bdGestationInformation = 0;
    private int bdPerinatalInformation = 0;
    private int bdBabySituation = 0;
    private int bdRecoverySituation = 0;
    private int bdCriticalAssessment = 0;
    private int bdRespiratorySystem = 0;
    private int bdDigestiveSystem = 0;
    private int bdInfectionSurveillance = 0;
    private int bdCirculatorySystem = 0;
    private int bdNervousSystem = 0;
    private int bdRetinopathy = 0;
    private int bdDischargeSituation = 0;
}
