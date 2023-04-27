package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseIS;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/9/27 12:55 星期一
 * @Description: 基础数据库 感染监测 抗菌药物 使用
 */
@Getter
@Setter
@TableName("pc_bd_is_ad_use")
public class BDISAdUse {
    @TableId
    private Integer cid;
    private int mid;
    private String antibacterialDrugType;
    private String antibacterialDrug;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date abdStartDate;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date abdEndDate;
    private String abdDose;
    private String abdFrequency;
    private String abdDot;
    private String abdUseReason;
    private String abdReasonable;
}
