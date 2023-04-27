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
 * @Date: 2021/11/26 20:22 星期五
 * @Description: 基础数据库 消化系统 肠外营养管理
 */
@Getter
@Setter
@TableName("pc_bd_dgs_pnm")
public class BDDGSPnm {
    @TableId
    private Integer cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date aminoAcidStartTime;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date fatEmulsionStartTime;
    private String intravenousNutritionTime;
    private String aminoAcidStartingDose;
    private String fatEmulsionStartDose;
    private String aminoAcidsStopUsingCalorie;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date highestAminoAcidDoseTime;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date highestFatEmulsionDoseTime;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date totalCaloricReach30KcalPKgPDTime;
    private String highestAminoAcidDose;
    private String highestFatEmulsionDose;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date totalCaloricReach80KcalPKgPDTime;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date stopAminoAcidsTime;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date stopFatEmulsionTime;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date totalCaloricReach120KcalPKgPDTime;
    private String totalAminoAcidUsed;
    private String totalFatEmulsionUsed;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date totalCaloricReach150KcalPKgPDTime;
    private Double carbohydrateGPD1to7d;
    private Double carbohydrateGPD8to14d;
    private Double carbohydrateGPD15to21d;
    private Double carbohydrateGPD22to28d;
    private Double carbohydrateGPDTotal;
    private Double carbohydrateGPKgPD1to7d;
    private Double carbohydrateGPKgPD8to14d;
    private Double carbohydrateGPKgPD15to21d;
    private Double carbohydrateGPKgPD22to28d;
    private Double carbohydrateGPKgPDTotal;
    private Double carbohydrateCalorie1to7d;
    private Double carbohydrateCalorie8to14d;
    private Double carbohydrateCalorie15to21d;
    private Double carbohydrateCalorie22to28d;
    private Double carbohydrateCalorieTotal;
    private Double aminoAcidGPD1to7d;
    private Double aminoAcidGPD8to14d;
    private Double aminoAcidGPD15to21d;
    private Double aminoAcidGPD22to28d;
    private Double aminoAcidGPDTotal;
    private Double aminoAcidGPKgPD1to7d;
    private Double aminoAcidGPKgPD8to14d;
    private Double aminoAcidGPKgPD15to21d;
    private Double aminoAcidGPKgPD22to28d;
    private Double aminoAcidGPKgPDTotal;
    private Double aminoAcidCalorie1to7d;
    private Double aminoAcidCalorie8to14d;
    private Double aminoAcidCalorie15to21d;
    private Double aminoAcidCalorie22to28d;
    private Double aminoAcidCalorieTotal;
    private Double fatEmulsionGPD1to7d;
    private Double fatEmulsionGPD8to14d;
    private Double fatEmulsionGPD15to21d;
    private Double fatEmulsionGPD22to28d;
    private Double fatEmulsionGPDTotal;
    private Double fatEmulsionGPKgPD1to7d;
    private Double fatEmulsionGPKgPD8to14d;
    private Double fatEmulsionGPKgPD15to21d;
    private Double fatEmulsionGPKgPD22to28d;
    private Double fatEmulsionGPKgPDTotal;
    private Double fatEmulsionCalorie1to7d;
    private Double fatEmulsionCalorie8to14d;
    private Double fatEmulsionCalorie15to21d;
    private Double fatEmulsionCalorie22to28d;
    private Double fatEmulsionCalorieTotal;
    private Double intravenousNutritionCalorieKcalPD1to7d;
    private Double intravenousNutritionCalorieKcalPD8to14d;
    private Double intravenousNutritionCalorieKcalPD15to21d;
    private Double intravenousNutritionCalorieKcalPD22to28d;
    private Double intravenousNutritionCalorieKcalPDTotal;
    private Double intravenousNutritionCalorieKcalPKgPD1to7d;
    private Double intravenousNutritionCalorieKcalPKgPD8to14d;
    private Double intravenousNutritionCalorieKcalPKgPD15to21d;
    private Double intravenousNutritionCalorieKcalPKgPD22to28d;
    private Double intravenousNutritionCalorieKcalPKgPDTotal;
    private Double totalCalorieKcalPD1to7d;
    private Double totalCalorieKcalPD8to14d;
    private Double totalCalorieKcalPD15to21d;
    private Double totalCalorieKcalPD22to28d;
    private Double totalCalorieKcalPDTotal;
    private Double totalCalorieKcalPKgPD1to7d;
    private Double totalCalorieKcalPKgPD8to14d;
    private Double totalCalorieKcalPKgPD15to21d;
    private Double totalCalorieKcalPKgPD22to28d;
    private Double totalCalorieKcalPKgPDTotal;
    private Double totalLiquidVolume1to7d;
    private Double totalLiquidVolume8to14d;
    private Double totalLiquidVolume15to21d;
    private Double totalLiquidVolume22to28d;
    private Double totalLiquidVolumeTotal;
}
