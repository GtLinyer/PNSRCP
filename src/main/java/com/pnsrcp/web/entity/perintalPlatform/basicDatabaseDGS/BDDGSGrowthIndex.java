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
 * @Date: 2021/10/31 20:39 星期日
 * @Description: 基础数据库 消化系统 生长指标
 */
@Getter
@Setter
@TableName("pc_bd_dgs_growth_index")
public class BDDGSGrowthIndex {
    @TableId
    private Integer cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date birthWeightLossMinimumTime;
    private String birthWeightLossMinimumValue;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date regainBirthWeightTime;
    private String regainBirthWeightDayAge;
}
