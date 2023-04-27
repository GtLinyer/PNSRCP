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
 * @Date: 2021/8/21 21:10 星期六
 * @Description: 医院 母婴同室库权限 实体
 */
@Getter
@Setter
@TableName("pc_hospital_auth_mbsr")
public class HospitalAuthMBSR {
    @TableId(type = IdType.AUTO)
    private Integer hid;
    private int motherBabySameRoom = 0;
    private int mbsrBloodOxygenMonitor = 0;
}
