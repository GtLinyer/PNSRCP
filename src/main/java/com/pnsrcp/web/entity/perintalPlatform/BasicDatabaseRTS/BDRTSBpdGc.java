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
 * @Date: 2021/9/14 21:56 星期二
 * @Description: 基础数据库 呼吸系统 BPD GC
 */
@Getter
@Setter
@TableName("pc_bd_rts_bpd_gc")
public class BDRTSBpdGc {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    private String gcType;
    private String administrationMode;
    private String dosingIndication;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date startGcDate;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date endGcDate;
    private String totalDays;
}
