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
 * @Date: 2021/9/3 1:01 星期五
 * @Description: 基础数据库 呼吸系统 呼吸支持模式时间 表格
 */
@Getter
@Setter
@TableName("pc_bd_rts_respiratory_support_mode_time")
public class BDRTSModeTime {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    private String respiratorySupportMode;
    @OrderBy(asc = true)
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date startRsDate;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date endRsDate;
    private String totalHours;
    private String totalDays;
    private String totalDaysMoreHours;

    public String getRespiratorySupportModeAbbr() {
        switch (respiratorySupportMode) {
            case "有创高频":
                return "IHF";
            case "有创常频":
                return "IF";
            case "无创高频":
                return "NIHF";
            case "鼻导管":
                return "NC";
            case "头罩":
                return "Hood";
            default:
                return respiratorySupportMode;
        }
    }
}
