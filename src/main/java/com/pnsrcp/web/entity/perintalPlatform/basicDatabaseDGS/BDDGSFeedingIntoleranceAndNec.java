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
 * @Date: 2021/11/17 14:40 星期三
 * @Description: 基础数据库 消化系统 喂养不耐受与NEC
 */
@Getter
@Setter
@TableName("pc_bd_dgs_feeding_intolerance_and_nec")
public class BDDGSFeedingIntoleranceAndNec {
    @TableId
    private Integer cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date feedingIntoleranceOrGastrointestinalSymptomsStartTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date feedingIntoleranceOrGastrointestinalSymptomsEndTime;
    private int feedingIntoleranceManifestationVomit = 0;
    private int feedingIntoleranceManifestationBloating = 0;
    private int feedingIntoleranceManifestationGastricRetention = 0;
    private int feedingIntoleranceManifestationBileLikeRetention = 0;
    private int feedingIntoleranceManifestationBrownStomachContents = 0;
    private int feedingIntoleranceManifestationBloodyStools = 0;
    private int feedingIntoleranceManifestationIntestinalType = 0;
    private String feedingIntoleranceManifestationOther;
    private int fastingReasonProgressiveBloating = 0;
    private int fastingReasonRepeatedRetention = 0;
    private int fastingReasonBrownStomachContents = 0;
    private int fastingReasonBloodyStools = 0;
    private int fastingReasonBloodOxygenInstability = 0;
    private int fastingReasonConfirmedInfection = 0;
    private int fastingReasonSuspectedInfection = 0;
    private int fastingReasonConfirmedNEC = 0;
    private int fastingReasonSuspectedNEC = 0;
    private int fastingReasonBloodTransfusion = 0;
    private String fastingReasonOther;
    private int gastrointestinalDecompression = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date gastrointestinalDecompressionStartTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date gastrointestinalDecompressionEndTime;
    private int nec = 0;
    private String necStaging;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date necDiagnosisDate;
    private int beforeNecVasoactiveDrugs = 0;
    private int beforeNecFluidResuscitation = 0;
    private int beforeNecHeparin = 0;
    private int beforeNecBloodTransfusion = 0;
    private int beforeNecCBall = 0;
    private int beforeNecGlucocorticoid = 0;
    private int diagnosisBasisClinicalSymptoms = 0;
    private int diagnosisBasisAuxiliaryExamination = 0;
    private int digestiveSymptomsBowelSoundsWeakenAndDisappear = 0;
    private int digestiveSymptomsGrossBloodyStool = 0;
    private int digestiveSymptomsFecalOccultBlood = 0;
    private int digestiveSymptomsUpperGastrointestinalBleeding = 0;
    private int digestiveSymptomsTightAbdominalWall = 0;
    private int digestiveSymptomsAbdominalTenderness = 0;
    private int abdominalRadiographWidenedIntestinalSpace = 0;
    private int abdominalRadiographBowelWallGas = 0;
    private int abdominalRadiographHilarPneumoperitoneum = 0;
    private int abdominalRadiographIntestinalObstruction = 0;
    private int abdominalRadiographBowelPerforation = 0;
    private int colorUltrasoundPneumaticPortalVein = 0;
    private int colorUltrasoundAscites = 0;
    private int internalMedicineConservativeTreatment = 0;
    private String internalMedicineConservativeTreatmentFate;
    private int operationTreatment = 0;
    private String operationTreatmentReason;
    private String operationTreatmentFate;
}
