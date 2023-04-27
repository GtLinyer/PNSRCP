package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseDGS;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/11/26 20:23 星期五
 * @Description: 基础数据库 消化系统 肠外营养管理 数据
 */
@Getter
@Setter
@TableName("pc_bd_dgs_pnm_data")
public class BDDGSPnmData {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    private String day;
    private String carbohydrateGPD;
    private String carbohydrateGPKgPD;
    private String carbohydrateCalorie;
    private String aminoAcidGPD;
    private String aminoAcidGPKgPD;
    private String aminoAcidCalorie;
    private String fatEmulsionGPD;
    private String fatEmulsionGPKgPD;
    private String fatEmulsionCalorie;
    private String intravenousNutritionCalorieKcalPD;
    private String intravenousNutritionCalorieKcalPKgPD;
    private String totalCalorieKcalPD;
    private String totalCalorieKcalPKgPD;
    private String totalLiquidVolume;

    public void setCarbohydrateGPD(String carbohydrateGPD) {
        if (!carbohydrateGPD.equals("")) {
            this.carbohydrateGPD = carbohydrateGPD;
        }
    }

    public void setCarbohydrateGPKgPD(String carbohydrateGPKgPD) {
        if (!carbohydrateGPKgPD.equals("")) {
            this.carbohydrateGPKgPD = carbohydrateGPKgPD;
        }
    }

    public void setCarbohydrateCalorie(String carbohydrateCalorie) {
        if (!carbohydrateCalorie.equals("")) {
            this.carbohydrateCalorie = carbohydrateCalorie;
        }
    }

    public void setAminoAcidGPD(String aminoAcidGPD) {
        if (!aminoAcidGPD.equals("")) {
            this.aminoAcidGPD = aminoAcidGPD;
        }
    }

    public void setAminoAcidGPKgPD(String aminoAcidGPKgPD) {
        if (!aminoAcidGPKgPD.equals("")) {
            this.aminoAcidGPKgPD = aminoAcidGPKgPD;
        }
    }

    public void setAminoAcidCalorie(String aminoAcidCalorie) {
        if (!aminoAcidCalorie.equals("")) {
            this.aminoAcidCalorie = aminoAcidCalorie;
        }
    }

    public void setFatEmulsionGPD(String fatEmulsionGPD) {
        if (!fatEmulsionGPD.equals("")) {
            this.fatEmulsionGPD = fatEmulsionGPD;
        }
    }

    public void setFatEmulsionGPKgPD(String fatEmulsionGPKgPD) {
        if (!fatEmulsionGPKgPD.equals("")) {
            this.fatEmulsionGPKgPD = fatEmulsionGPKgPD;
        }
    }

    public void setFatEmulsionCalorie(String fatEmulsionCalorie) {
        if (!fatEmulsionCalorie.equals("")) {
            this.fatEmulsionCalorie = fatEmulsionCalorie;
        }
    }

    public void setIntravenousNutritionCalorieKcalPD(String intravenousNutritionCalorieKcalPD) {
        if (!intravenousNutritionCalorieKcalPD.equals("")) {
            this.intravenousNutritionCalorieKcalPD = intravenousNutritionCalorieKcalPD;
        }
    }

    public void setIntravenousNutritionCalorieKcalPKgPD(String intravenousNutritionCalorieKcalPKgPD) {
        if (!intravenousNutritionCalorieKcalPKgPD.equals("")) {
            this.intravenousNutritionCalorieKcalPKgPD = intravenousNutritionCalorieKcalPKgPD;
        }
    }

    public void setTotalCalorieKcalPD(String totalCalorieKcalPD) {
        if (!totalCalorieKcalPD.equals("")) {
            this.totalCalorieKcalPD = totalCalorieKcalPD;
        }
    }

    public void setTotalCalorieKcalPKgPD(String totalCalorieKcalPKgPD) {
        if (!totalCalorieKcalPKgPD.equals("")) {
            this.totalCalorieKcalPKgPD = totalCalorieKcalPKgPD;
        }
    }

    public void setTotalLiquidVolume(String totalLiquidVolume) {
        if (!totalLiquidVolume.equals("")) {
            this.totalLiquidVolume = totalLiquidVolume;
        }
    }
}
