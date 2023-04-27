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
 * @Date: 2021/9/15 16:51 星期三
 * @Description: 基础数据库 呼吸系统 RDS PS
 */
@Getter
@Setter
@TableName("pc_bd_rts_rds_ps")
public class BDRTSRdsPs {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date administrationTime;
    private String psType;
    private String administrationMode;
    private String totalDoseAdministered;
    private String weight;
    private String dosage;
}
