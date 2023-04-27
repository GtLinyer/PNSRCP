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
 * @Date: 2021/11/17 17:20 星期三
 * @Description: 基础数据库 消化系统 其它诊断与治疗
 */
@Getter
@Setter
@TableName("pc_bd_dgs_other_diagnosis_and_treatment")
public class BDDGSOtherDiagnosisAndTreatment {
    @TableId
    private Integer cid;
    private int mid;
    private int neonatalSwallowingSyndrome = 0;
    private int neonatalGastroesophagealReflux = 0;
    private int neonatalDiarrhea = 0;
    private int infectiousEnteritis = 0;
    private int allergicEnteritis = 0;
    private int umbilicalVeinCatheter = 0;
    private String digestiveTractPerforation;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date necRelatedDigestiveTractPerforationDiagnosisTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date firstSpontaneousPerforationTime;
    private String digestiveTractPerforationTreatment;
    private int gastrointestinalBleeding = 0;
    private int neonatalCholestasisSyndrome = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date neonatalCholestasisSyndromeDiagnosisTime;
    private String totalBilirubin;
    private String directBilirubin;
    private String ast;
    private String alt;
    private String tba;
}
