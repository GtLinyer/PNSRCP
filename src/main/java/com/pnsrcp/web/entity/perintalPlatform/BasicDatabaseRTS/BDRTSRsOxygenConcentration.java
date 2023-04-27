package com.pnsrcp.web.entity.perintalPlatform.BasicDatabaseRTS;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.OrderBy;
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
 * @Date: 2022/06/26 08:45 星期日
 * @Description: 基础数据库 呼吸系统 给氧浓度时间 表格
 */
@Getter
@Setter
@TableName("pc_bd_rts_oxygen_concentration")
public class BDRTSRsOxygenConcentration {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    private String oxygenConcentration;
    @OrderBy(asc = true)
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date startOcDate;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date endOcDate;
    private String totalOcHours;
    private String totalOcDays;
    private String totalOcDaysMoreHours;
}