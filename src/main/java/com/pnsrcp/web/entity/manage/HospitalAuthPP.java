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
 * @Date: 2021/8/22 0:19 星期日
 * @Description: 医院 父母心理库权限 实体
 */
@Getter
@Setter
@TableName("pc_hospital_auth_pp")
public class HospitalAuthPP {
    @TableId(type = IdType.AUTO)
    private Integer hid;
    private int parentalPsychology = 0;
    private int ppPrenatalPsychology = 0;
    private int ppPostpartumPsychology = 0;
}
