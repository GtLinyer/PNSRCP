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
 * @Date: 2022/05/31 17:01 星期二
 * @Description: 医院 研究数据库 实体
 */
@Getter
@Setter
@TableName("pc_hospital_auth_rd")
public class HospitalAuthRD {
    @TableId(type = IdType.AUTO)
    private Integer hid;
    private int researchDatabase = 0;
    private int rdHypothermiaQI = 0;
}
