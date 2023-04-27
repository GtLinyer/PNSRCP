package com.pnsrcp.web.entity.perintalPlatform.followDatabase;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/02 23:47 星期六
 * @Description: 随访数据库 生长曲线 生长评估
 */
@Getter
@Setter
public class FDGcGrowthAssessment {
    private int id;
    private int cid;
    private int mid;
    private String correctedAge;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date caDate;
    private String caActualAgeMonth;
    private String caActualAgeDay;
    private String caBodyWeight;
    private String caBodyLength;
    private String caHeadCircumference;
    private String caBodyWeightPercentile;
    private String caBodyLengthPercentile;
    private String caHeadCircumferencePercentile;
    private String caBodyWeightZScore;
    private String caBodyLengthZScore;
    private String caHeadCircumferenceZScore;
    private String caBodyWeightGainRate;
    private String caBodyLengthGainRate;
    private String caHeadCircumferenceGainRate;
    private String caFeedingMethod;
    private String caCalories;
    private String caBreastMilkFortifier;
}
