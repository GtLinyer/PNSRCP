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
 * @Date: 2021/9/16 17:21 星期四
 * @Description: 基础数据库 呼吸系统 呼吸暂停
 */
@Getter
@Setter
@TableName("pc_bd_rts_apnea")
public class BDRTSApnea {
    @TableId
    private Integer cid;
    private int mid;
    private int hasApnea = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date diagnosisTime;
    private int useCaffeine = 0;
    private String caffeineTime;
}
