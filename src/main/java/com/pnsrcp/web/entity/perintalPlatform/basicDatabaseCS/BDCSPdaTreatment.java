package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseCS;

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
 * @Date: 2021/10/6 16:24 星期三
 * @Description: 基础数据库 循环系统 PDA治疗
 */
@Getter
@Setter
@TableName("pc_bd_cs_pda_treatment")
public class BDCSPdaTreatment {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private Integer cid;
    private Integer mid;
    private String pdaName;
    private String pdaMedicationRoute;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date pdaStartTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date pdaEndTime;
    private String isPdaClosesAfterTreatment;
    private String pdaTreatmentCourse;
}
