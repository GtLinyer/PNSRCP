package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseNS;

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
 * @Date: 2021/10/10 19:21 星期日
 * @Description: 基础数据库 循环系统 治疗及诊断
 */
@Getter
@Setter
@TableName("pc_bd_ns_td")
public class BDNSTreatmentDiagnosis {
    @TableId
    private Integer cid;
    private int mid;
    private int neonatalHypoxicIschemicEncephalopathy = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date nhieDiagnosisDate;
    private int mildHypothermia = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date mhStartTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date mhReachTargetTemperatureTime;
    private int adverseReactionsApnea = 0;
    private int adverseReactionsBradycardia = 0;
    private int adverseReactionsSubcutaneousGangrene = 0;
    private int adverseReactionsThrombocytopenia = 0;
    private int adverseReactionsAbnormalBloodClottingFunction = 0;
    private String ventricularHemorrhage;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date vhDiagnosisDate;
    private int otherCerebralHemorrhageCerebellar = 0;
    private int otherCerebralHemorrhageSubdural = 0;
    private int otherCerebralHemorrhageSubarachnoid = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date ochDiagnosisDate;
    private int treatmentObserve = 0;
    private int treatmentRepeatedWaistWear = 0;
    private int treatmentReservoir = 0;
    private int treatmentVentricularDrainage = 0;
    private int treatmentVpShunt = 0;
    private String periventricularWhiteMatterSoftening;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date pwmsDiagnosisDate;
}
