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
 * @Date: 2021/11/10 23:05 星期三
 * @Description: 基础数据库 消化系统 肠内营养管理
 */
@Getter
@Setter
@TableName("pc_bd_dgs_enm")
public class BDDGSEnm {
    @TableId
    private Integer cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date microfeedingEndTime;
    private String microfeedingDuration;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date milkVolumeReach30MlPKgPDTime;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date milkVolumeReach80MlPKgPDTime;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date milkVolumeReach120MlPKgPDTime;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date milkVolumeReach150MlPKgPDTime;
    private String feedingIncreaseRate;
    private Double breastMilk1to7d;
    private Double breastMilk8to14d;
    private Double breastMilk15to21d;
    private Double breastMilk22to28d;
    private Double breastMilkTotal;
    private Double donateBreastMilk1to7d;
    private Double donateBreastMilk8to14d;
    private Double donateBreastMilk15to21d;
    private Double donateBreastMilk22to28d;
    private Double donateBreastMilkTotal;
    private Double deeplyHydrolyzedMilk1to7d;
    private Double deeplyHydrolyzedMilk8to14d;
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
    private Double enteralNutritionProteinGPD1to7d;
    private Double enteralNutritionProteinGPD8to14d;
    private Double enteralNutritionProteinGPD15to21d;
    private Double enteralNutritionProteinGPD22to28d;
    private Double enteralNutritionProteinGPDTotal;
    private Double enteralNutritionProteinGPKgPD1to7d;
    private Double enteralNutritionProteinGPKgPD8to14d;
    private Double enteralNutritionProteinGPKgPD15to21d;
    private Double enteralNutritionProteinGPKgPD22to28d;
    private Double enteralNutritionProteinGPKgPDTotal;
    private Double totalMilkCaloriesKcalPD1to7d;
    private Double totalMilkCaloriesKcalPD8to14d;
    private Double totalMilkCaloriesKcalPD15to21d;
    private Double totalMilkCaloriesKcalPD22to28d;
    private Double totalMilkCaloriesKcalPDTotal;
    private Double totalMilkCaloriesKcalPKgPD1to7d;
    private Double totalMilkCaloriesKcalPKgPD8to14d;
    private Double totalMilkCaloriesKcalPKgPD15to21d;
    private Double totalMilkCaloriesKcalPKgPD22to28d;
    private Double totalMilkCaloriesKcalPKgPDTotal;
}
