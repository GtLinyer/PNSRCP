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
 * @Date: 2021/9/17 17:27 星期五
 * @Description: 基础数据库 呼吸系统 其它诊断与治疗
 */
@Getter
@Setter
@TableName("pc_bd_rts_other_diagnosis_treatment")
public class BDRTSOtherDiagnosisTreatment {
    @TableId
    private Integer cid;
    private int mid;
    private int newbornMeconiumAspirationSyndrome = 0;
    private int amnioticFluidAspirationSyndrome = 0;
    private int milkAspirationSyndrome = 0;
    private int neonatalWetLung = 0;
    private int neonatalPneumonia = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date neonatalPneumoniaDiagnosisTime;
    private int pneumothorax = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date pneumothoraxDiagnosisTime;
    private int pneumothoraxThoracentesis = 0;
    private int pneumothoraxClosedThoracicDrainage = 0;
    private int pleuralEffusion = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date pleuralEffusionDiagnosisTime;
    private int pleuralEffusionThoracentesis = 0;
    private int pleuralEffusionClosedThoracicDrainage = 0;
    private int ventilatorAssociatedPneumonia = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date vapDiagnosisTime;
    private int ventilatorRelatedBloodstreamInfection = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date vrbiDiagnosisTime;
    private int pulmonaryHemorrhage = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date pulmonaryHemorrhageDiagnosisTime;
    private int ards = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date ardsDiagnosisTime;
    private int respiratoryFailure = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date respiratoryFailureDiagnosisTime;
}
