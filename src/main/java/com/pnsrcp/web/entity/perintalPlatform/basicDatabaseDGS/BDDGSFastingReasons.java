package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseDGS;

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
 * @Date: 2021/11/16 14:11 星期二
 * @Description: 基础数据库 消化系统 禁食原因
 */
@Getter
@Setter
@TableName("pc_bd_dgs_fasting_reasons")
public class BDDGSFastingReasons {
    @TableId
    private Integer cid;
    private int mid;
    private int fasting = 0;
    private String fastingTimes;
    private String fastingDays;
}