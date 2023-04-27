package com.pnsrcp.web.entity.perintalPlatform.BasicDatabaseRTS;

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
 * @Date: 2021/9/15 16:40 星期三
 * @Description: 基础数据库 呼吸系统 RDS
 */
@Getter
@Setter
@TableName("pc_bd_rts_rds")
public class BDRTSRds {
    @TableId
    private Integer cid;
    private int mid;
    private int hasRds = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date diagnosisTime;
    private String grade;
    private int diagnosisBasisClinical = 0;
    private int diagnosisBasisImage = 0;
    private int usePS = 0;
    private String gulsuTime;
    private String kelisuTime;
}
