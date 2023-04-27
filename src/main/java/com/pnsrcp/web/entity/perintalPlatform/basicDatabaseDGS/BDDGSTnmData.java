package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseDGS;

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
 * @Date: 2021/11/28 21:47 星期日
 * @Description: 基础数据库 消化系统 过渡期营养管理
 */
@Getter
@Setter
@TableName("pc_bd_dgs_tnm_data")
public class BDDGSTnmData {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    private String milkToN;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date milkToNDate;
    private String milkToNDaysAfterBirth;
    private String milkToNCorrectGestationalAgeWeek;
    private String milkToNCorrectGestationalAgeDay;
    private String milkToNWeight;
    private String milkToNWeightZScore;
    private String milkToNActualEnteralNutrition;
    private String milkToNEnteralAminoAcidsGPD;
    private String milkToNEnteralAminoAcidsGPKgPD;
    private String milkToNEnteralCalorieKcalPD;
    private String milkToNEnteralCalorieKcalPKgPD;
    private String milkToNParenteralAminoAcidsGPD;
    private String milkToNParenteralAminoAcidsGPKgPD;
    private String milkToNParenteralCalorieKcalPD;
    private String milkToNParenteralCalorieKcalPKgPD;
    private String milkToNTotalProteinGPD;
    private String milkToNTotalProteinGPKgPD;
    private String milkToNTotalCalorieKcalPD;
    private String milkToNTotalCalorieKcalPKgPD;

    public void setMilkToNDaysAfterBirth(String milkToNDaysAfterBirth) {
        if (!milkToNDaysAfterBirth.equals("")) {
            this.milkToNDaysAfterBirth = milkToNDaysAfterBirth;
        }
    }

    public void setMilkToNCorrectGestationalAgeWeek(String milkToNCorrectGestationalAgeWeek) {
        if (!milkToNCorrectGestationalAgeWeek.equals("")) {
            this.milkToNCorrectGestationalAgeWeek = milkToNCorrectGestationalAgeWeek;
        }
    }

    public void setMilkToNCorrectGestationalAgeDay(String milkToNCorrectGestationalAgeDay) {
        if (!milkToNCorrectGestationalAgeDay.equals("")) {
            this.milkToNCorrectGestationalAgeDay = milkToNCorrectGestationalAgeDay;
        }
    }

    public void setMilkToNWeight(String milkToNWeight) {
        if (!milkToNWeight.equals("")) {
            this.milkToNWeight = milkToNWeight;
        }
    }

    public void setMilkToNWeightZScore(String milkToNWeightZScore) {
        if (!milkToNWeightZScore.equals("")) {
            this.milkToNWeightZScore = milkToNWeightZScore;
        }
    }

    public void setMilkToNActualEnteralNutrition(String milkToNActualEnteralNutrition) {
        if (!milkToNActualEnteralNutrition.equals("")) {
            this.milkToNActualEnteralNutrition = milkToNActualEnteralNutrition;
        }
    }

    public void setMilkToNEnteralAminoAcidsGPD(String milkToNEnteralAminoAcidsGPD) {
        if (!milkToNEnteralAminoAcidsGPD.equals("")) {
            this.milkToNEnteralAminoAcidsGPD = milkToNEnteralAminoAcidsGPD;
        }
    }

    public void setMilkToNEnteralAminoAcidsGPKgPD(String milkToNEnteralAminoAcidsGPKgPD) {
        if (!milkToNEnteralAminoAcidsGPKgPD.equals("")) {
            this.milkToNEnteralAminoAcidsGPKgPD = milkToNEnteralAminoAcidsGPKgPD;
        }
    }

    public void setMilkToNEnteralCalorieKcalPD(String milkToNEnteralCalorieKcalPD) {
        if (!milkToNEnteralCalorieKcalPD.equals("")) {
            this.milkToNEnteralCalorieKcalPD = milkToNEnteralCalorieKcalPD;
        }
    }

    public void setMilkToNEnteralCalorieKcalPKgPD(String milkToNEnteralCalorieKcalPKgPD) {
        if (!milkToNEnteralCalorieKcalPKgPD.equals("")) {
            this.milkToNEnteralCalorieKcalPKgPD = milkToNEnteralCalorieKcalPKgPD;
        }
    }

    public void setMilkToNParenteralAminoAcidsGPD(String milkToNParenteralAminoAcidsGPD) {
        if (!milkToNParenteralAminoAcidsGPD.equals("")) {
            this.milkToNParenteralAminoAcidsGPD = milkToNParenteralAminoAcidsGPD;
        }
    }

    public void setMilkToNParenteralAminoAcidsGPKgPD(String milkToNParenteralAminoAcidsGPKgPD) {
        if (!milkToNParenteralAminoAcidsGPKgPD.equals("")) {
            this.milkToNParenteralAminoAcidsGPKgPD = milkToNParenteralAminoAcidsGPKgPD;
        }
    }

    public void setMilkToNParenteralCalorieKcalPD(String milkToNParenteralCalorieKcalPD) {
        if (!milkToNParenteralCalorieKcalPD.equals("")) {
            this.milkToNParenteralCalorieKcalPD = milkToNParenteralCalorieKcalPD;
        }
    }

    public void setMilkToNParenteralCalorieKcalPKgPD(String milkToNParenteralCalorieKcalPKgPD) {
        if (!milkToNParenteralCalorieKcalPKgPD.equals("")) {
            this.milkToNParenteralCalorieKcalPKgPD = milkToNParenteralCalorieKcalPKgPD;
        }
    }

    public void setMilkToNTotalProteinGPD(String milkToNTotalProteinGPD) {
        if (!milkToNTotalProteinGPD.equals("")) {
            this.milkToNTotalProteinGPD = milkToNTotalProteinGPD;
        }
    }

    public void setMilkToNTotalProteinGPKgPD(String milkToNTotalProteinGPKgPD) {
        if (!milkToNTotalProteinGPKgPD.equals("")) {
            this.milkToNTotalProteinGPKgPD = milkToNTotalProteinGPKgPD;
        }
    }

    public void setMilkToNTotalCalorieKcalPD(String milkToNTotalCalorieKcalPD) {
        if (!milkToNTotalCalorieKcalPD.equals("")) {
            this.milkToNTotalCalorieKcalPD = milkToNTotalCalorieKcalPD;
        }
    }

    public void setMilkToNTotalCalorieKcalPKgPD(String milkToNTotalCalorieKcalPKgPD) {
        if (!milkToNTotalCalorieKcalPKgPD.equals("")) {
            this.milkToNTotalCalorieKcalPKgPD = milkToNTotalCalorieKcalPKgPD;
        }
    }
}
