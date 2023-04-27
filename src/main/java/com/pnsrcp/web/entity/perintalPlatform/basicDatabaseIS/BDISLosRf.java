package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseIS;

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
 * @Date: 2021/9/23 11:59 星期四
 * @Description: 基础数据库 感染监测 LOS流程 危险因素
 */
@Getter
@Setter
@TableName("pc_bd_is_los_rf")
public class BDISLosRf {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date rfEvaluationTime;
    private String riskFactor;
}
