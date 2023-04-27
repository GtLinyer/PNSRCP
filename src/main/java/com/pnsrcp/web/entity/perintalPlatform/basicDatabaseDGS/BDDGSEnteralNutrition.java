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
 * @Date: 2021/11/7 0:18 星期日
 * @Description: 基础数据库 消化系统 肠内营养
 */
@Getter
@Setter
@TableName("pc_bd_dgs_enteral_nutrition")
public class BDDGSEnteralNutrition {
    @TableId
    private Integer cid;
    private int mid;
    private String deeplyHydrolyzedMilkCalories;
    private String deeplyHydrolyzedMilkContent;
    private String partiallyHydrolyzedMilkCalories;
    private String partiallyHydrolyzedMilkContent;
    private String aminoAcidMilkCalories;
    private String aminoAcidMilkContent;
    private String ordinaryFormulaMilkCalories;
    private String ordinaryFormulaMilkContent;
    private String enhancerType;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date addBreastMilkFortifierTime;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date fullEnhancementTime;
    private String breastMilkFortifiersTotalUse;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date startFeedingTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date startOralFeedingTime;
    private String startFeedingType;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date breastFeedingStartTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date fullOralBottleFeedingTime;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date enteralFeedingStartTime;
    private String enteralFeedingInitiation;
    private Integer fasting1to7d;
    private Integer fasting8to14d;
    private Integer fasting15to21d;
    private Integer fasting22to28d;
    private Integer fastingTotal;
    private Integer tubeFeeding1to7d;
    private Integer tubeFeeding8to14d;
    private Integer tubeFeeding15to21d;
    private Integer tubeFeeding22to28d;
    private Integer tubeFeedingTotal;
    private Integer partialNasalFeeding1to7d;
    private Integer partialNasalFeeding8to14d;
    private Integer partialNasalFeeding15to21d;
    private Integer partialNasalFeeding22to28d;
    private Integer partialNasalFeedingTotal;
    private Integer bottleFeeding1to7d;
    private Integer bottleFeeding8to14d;
    private Integer bottleFeeding15to21d;
    private Integer bottleFeeding22to28d;
    private Integer bottleFeedingTotal;
    private Integer partBreastFeeding1to7d;
    private Integer partBreastFeeding8to14d;
    private Integer partBreastFeeding15to21d;
    private Integer partBreastFeeding22to28d;
    private Integer partBreastFeedingTotal;
    private Integer directBreastFeeding1to7d;
    private Integer directBreastFeeding8to14d;
    private Integer directBreastFeeding15to21d;
    private Integer directBreastFeeding22to28d;
    private Integer directBreastFeedingTotal;
    private Double breastMilk1to7d;
    private Double breastMilk8to14d;
    private Double breastMilk15to21d;
    private Double breastMilk22to28d;
    private Double breastMilkTotal;
    private Double donatedBreastMilk1to7d;
    private Double donatedBreastMilk8to14d;
    private Double donatedBreastMilk15to21d;
    private Double donatedBreastMilk22to28d;
    private Double donatedBreastMilkTotal;
    private Double breastMilkFortifier1to7d;
    private Double breastMilkFortifier8to14d;
    private Double breastMilkFortifier15to21d;
    private Double breastMilkFortifier22to28d;
    private Double breastMilkFortifierTotal;
    private Double deeplyHydrolyzedMilk1to7d;
    private Double deeplyHydrolyzedMilk8to14d;
    private Double deeplyHydrolyzedMilk15to21d;
    private Double deeplyHydrolyzedMilk22to28d;
    private Double deeplyHydrolyzedMilkTotal;
    private Double partiallyHydrolyzedMilk1to7d;
    private Double partiallyHydrolyzedMilk8to14d;
    private Double partiallyHydrolyzedMilk15to21d;
    private Double partiallyHydrolyzedMilk22to28d;
    private Double partiallyHydrolyzedMilkTotal;
    private Double aminoAcidMilk1to7d;
    private Double aminoAcidMilk8to14d;
    private Double aminoAcidMilk15to21d;
    private Double aminoAcidMilk22to28d;
    private Double aminoAcidMilkTotal;
    private Double regularFormulaMilk1to7d;
    private Double regularFormulaMilk8to14d;
    private Double regularFormulaMilk15to21d;
    private Double regularFormulaMilk22to28d;
    private Double regularFormulaMilkTotal;
    private Double totalDailyMilkVolume1to7d;
    private Double totalDailyMilkVolume8to14d;
    private Double totalDailyMilkVolume15to21d;
    private Double totalDailyMilkVolume22to28d;
    private Double totalDailyMilkVolumeTotal;
}
