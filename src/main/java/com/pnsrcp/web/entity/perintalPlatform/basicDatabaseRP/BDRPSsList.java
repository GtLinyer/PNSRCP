package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/10/13 23:45 星期三
 * @Description: 基础数据库 视网膜病 筛查情况 列表
 */
@Getter
@Setter
@TableName("pc_bd_rp_ss_list")
public class BDRPSsList {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date screeningDate;
    private String timeAfterBirth;
    private String correctGestationalAgeWeek;
    private String correctGestationalAgeDay;
    @TableField("`interval`")
    private String interval;
    private String leftEyeStaging;
    private String leftEyeZone;
    private String leftEyePlus;
    private String leftEyeApRop;
    private String leftEyeTreatment;
    private String rightEyeStaging;
    private String rightEyeZone;
    private String rightEyePlus;
    private String rightEyeApRop;
    private String rightEyeTreatment;

    public void setInterval(String interval) {
        if (!interval.equals("")) {
            this.interval = interval;
        }
    }
}
