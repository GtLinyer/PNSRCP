package com.pnsrcp.web.entity.perintalPlatform.BasicDatabaseRTS;

import com.baomidou.mybatisplus.annotation.IdType;
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
 * @Date: 2021/9/16 17:40 星期四
 * @Description: 基础数据库 呼吸系统 呼吸暂停 咖啡因
 */
@Getter
@Setter
@TableName("pc_bd_rts_apnea_caffeine")
public class BDRTSApneaCaffeine {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date startApDate;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date endApDate;
    private String totalDays;
    private String useReason;
    private String firstDose;
    private String maintenanceDose;
}
