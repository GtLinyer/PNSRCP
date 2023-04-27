package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP;

import com.baomidou.mybatisplus.annotation.FieldStrategy;
import com.baomidou.mybatisplus.annotation.TableField;
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
 * @Date: 2021/10/15 21:25 星期五
 * @Description: 视网膜病 筛查评估
 */
@Getter
@Setter
@TableName("pc_bd_rp_screening_assessment")
public class BDRPScreeningAssessment {
    @TableId
    private Integer cid;
    private int mid;
    private int whetherNeedIntervene = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date confirmedInterventionTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date actualInterventionTime;
    private String timeFromDiagnosisToTreatment;
    private String treatmentHospital;
    private int whetherScreenAtIntervals = 0;
    private int noRopInZone1 = 0;
    private int regressiveRopInZone1 = 0;
    private int stage2Or3DiseaseInZone2 = 0;
    private int stage1DiseaseInZone2 = 0;
    private int stage1DiseaseOrNoRopInZone2 = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date inspectionTerminationDate;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date correctedGestationalAge45WeeksDate;
    private int retinalVascularization = 0;
    private int cga45wNoPreOrThresholdLesionRetinalBloodVesselsDevelopZone3 = 0;
    private int retinopathyRegression = 0;
}