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
 * @Date: 2022/05/15 18:01 星期日
 * @Description: 医院 高胆数据库权限 实体
 */
@Getter
@Setter
@TableName("pc_hospital_auth_hb")
public class HospitalAuthHB {
    @TableId(type = IdType.AUTO)
    private Integer hid;
    private int highBilirubin = 0;
    private int hbPerinatalInformation = 0;
    private int hbTreatment = 0;
    private int hbFollowUpExamination = 0;
    private int hbFollowUpConclusion = 0;
}
