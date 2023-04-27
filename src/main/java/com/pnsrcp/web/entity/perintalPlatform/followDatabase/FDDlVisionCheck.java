package com.pnsrcp.web.entity.perintalPlatform.followDatabase;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/03 16:35 星期日
 * @Description: 随访数据库 发育水平 视力 检查
 */
@Getter
@Setter
public class FDDlVisionCheck {
    private int id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date visionCheckDate;
    private String cgaWeek;
    private String cgaDay;
    private String correctedAgeMonth;
    private String correctedAgeDay;
    private String leftEyeScreening;
    private String leftEyePlus;
    private String leftEyeTreatment;
    private String leftEyeVisualEvokedPotential;
    private String rightEyeScreening;
    private String rightEyePlus;
    private String rightEyeTreatment;
    private String rightEyeVisualEvokedPotential;
}
