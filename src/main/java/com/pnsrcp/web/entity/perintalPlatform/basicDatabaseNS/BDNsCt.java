package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseNS;

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
 * @Date: 2022/07/25 22:29 星期一
 * @Description: 基础数据库 循环系统 CT
 */
@Getter
@Setter
@TableName("pc_bd_ns_ct")
public class BDNsCt {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date leftInspectionTime;
    private String leftInspectionResult;
    private String leftGerminalHemorrhage;
    private String leftIntraventricularHemorrhage;
    private String leftParenchymalBrainDisease;
    private String leftPeriventricularWhiteMatterSoftening;
    private int leftVentricularExpansion = 0;
    private String leftVentricularExpansionSize;
    private int leftCerebralInfarction = 0;
    private int leftHydrocephalus = 0;
    private int leftNeonatalHypoxicIschemicEncephalopathy = 0;
    private int leftOtherCentralDiseaseSubarachnoidHemorrhage = 0;
    private int leftOtherCentralDiseaseSubduralHemorrhage = 0;
    private int leftOtherCentralDiseaseTentoriumHemorrhage = 0;
    private int leftOtherCentralDiseaseHydrocephalus = 0;
    private int leftOtherCentralDiseaseArachnoidCyst = 0;
    private int leftOtherCentralDiseaseCaudateSulcusCyst = 0;
    private int leftOtherCentralDiseaseChoroidPlexusCyst = 0;
    private int leftOtherCentralDiseaseSubependymalCyst = 0;
    private int leftOtherCentralDiseaseOtherBrainParenchymalCysts = 0;
    private String leftOtherCentralDiseaseOther;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date rightInspectionTime;
    private String rightInspectionResult;
    private String rightGerminalHemorrhage;
    private String rightIntraventricularHemorrhage;
    private String rightParenchymalBrainDisease;
    private String rightPeriventricularWhiteMatterSoftening;
    private int rightVentricularExpansion = 0;
    private String rightVentricularExpansionSize;
    private int rightCerebralInfarction = 0;
    private int rightHydrocephalus = 0;
    private int rightNeonatalHypoxicIschemicEncephalopathy = 0;
    private int rightOtherCentralDiseaseSubarachnoidHemorrhage = 0;
    private int rightOtherCentralDiseaseSubduralHemorrhage = 0;
    private int rightOtherCentralDiseaseTentoriumHemorrhage = 0;
    private int rightOtherCentralDiseaseHydrocephalus = 0;
    private int rightOtherCentralDiseaseArachnoidCyst = 0;
    private int rightOtherCentralDiseaseCaudateSulcusCyst = 0;
    private int rightOtherCentralDiseaseChoroidPlexusCyst = 0;
    private int rightOtherCentralDiseaseSubependymalCyst = 0;
    private int rightOtherCentralDiseaseOtherBrainParenchymalCysts = 0;
    private String rightOtherCentralDiseaseOther;
    private String section1Url;
    private String section2Url;
    private String ctExplanation;
}
