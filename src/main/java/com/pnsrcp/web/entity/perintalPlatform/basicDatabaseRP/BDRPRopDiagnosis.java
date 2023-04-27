package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP;

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
 * @Date: 2021/10/16 15:50 星期六
 * @Description: 视网膜病 ROP诊断
 */
@Getter
@Setter
@TableName("pc_bd_rp_rop_diagnosis")
public class BDRPRopDiagnosis {
    @TableId
    private Integer cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date leftEyeDiagnosisDate;
    private String leftEyeStaging;
    private String leftEyeZone;
    private String leftEyePlusLesion;
    private int leftEyeApRop = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date leftEyeHighestLevelTreatmentDate;
    private String leftEyeHighestLevelTreatment;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date rightEyeDiagnosisDate;
    private String rightEyeStaging;
    private String rightEyeZone;
    private String rightEyePlusLesion;
    private int rightEyeApRop = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date rightEyeHighestLevelTreatmentDate;
    private String rightEyeHighestLevelTreatment;
}