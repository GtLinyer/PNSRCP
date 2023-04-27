package com.pnsrcp.web.entity.perintalPlatform.BasicDatabaseRTS;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/9/14 18:54 星期二
 * @Description: 基础数据库 呼吸系统 BPD
 */
@Getter
@Setter
@TableName("pc_bd_rts_bpd")
public class BDRTSBpd {
    @TableId
    private Integer cid;
    private int mid;
    private String diagnosticCriteria2001;
    private String diagnosticCriteria2018;
    private String diagnosticCriteria2019;
    private String treatmentsNumber;
    private String oralDays;
    private String intravenousAdministrationDays;
    private String aerosolInhalationDays;
}
