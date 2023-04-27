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
 * @Date: 2021/11/10 23:08 星期三
 * @Description: 基础数据库 消化系统 肠内营养管理 数据
 */
@Getter
@Setter
@TableName("pc_bd_dgs_enm_data")
public class BDDGSEnmData {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    private String day;
    private String breastMilkPKg;
    private String donateBreastMilkPKg;
    private String deeplyHydrolyzedMilkPKg;
    private String partiallyHydrolyzedMilkPKg;
    private String aminoAcidMilkPKg;
    private String ordinaryFormulaMilkPKg;
    private String totalDailyMilkVolumePKg;
    private String enteralNutritionalProteinGPD;
    private String enteralNutritionalProteinGPKgPD;
    private String totalMilkCaloriesKcalPD;
    private String totalMilkCaloriesKcalPKgPD;

    public void setBreastMilkPKg(String breastMilkPKg) {
        if (!breastMilkPKg.equals("")) {
            this.breastMilkPKg = breastMilkPKg;
        }
    }

    public void setDonateBreastMilkPKg(String donateBreastMilkPKg) {
        if (!donateBreastMilkPKg.equals("")) {
            this.donateBreastMilkPKg = donateBreastMilkPKg;
        }
    }

    public void setDeeplyHydrolyzedMilkPKg(String deeplyHydrolyzedMilkPKg) {
        if (!deeplyHydrolyzedMilkPKg.equals("")) {
            this.deeplyHydrolyzedMilkPKg = deeplyHydrolyzedMilkPKg;
        }
    }

    public void setPartiallyHydrolyzedMilkPKg(String partiallyHydrolyzedMilkPKg) {
        if (!partiallyHydrolyzedMilkPKg.equals("")) {
            this.partiallyHydrolyzedMilkPKg = partiallyHydrolyzedMilkPKg;
        }
    }

    public void setAminoAcidMilkPKg(String aminoAcidMilkPKg) {
        if (!aminoAcidMilkPKg.equals("")) {
            this.aminoAcidMilkPKg = aminoAcidMilkPKg;
        }
    }

    public void setOrdinaryFormulaMilkPKg(String ordinaryFormulaMilkPKg) {
        if (!ordinaryFormulaMilkPKg.equals("")) {
            this.ordinaryFormulaMilkPKg = ordinaryFormulaMilkPKg;
        }
    }

    public void setTotalDailyMilkVolumePKg(String totalDailyMilkVolumePKg) {
        if (!totalDailyMilkVolumePKg.equals("")) {
            this.totalDailyMilkVolumePKg = totalDailyMilkVolumePKg;
        }
    }

    public void setEnteralNutritionalProteinGPD(String enteralNutritionalProteinGPD) {
        if (!enteralNutritionalProteinGPD.equals("")) {
            this.enteralNutritionalProteinGPD = enteralNutritionalProteinGPD;
        }
    }

    public void setEnteralNutritionalProteinGPKgPD(String enteralNutritionalProteinGPKgPD) {
        if (!enteralNutritionalProteinGPKgPD.equals("")) {
            this.enteralNutritionalProteinGPKgPD = enteralNutritionalProteinGPKgPD;
        }
    }

    public void setTotalMilkCaloriesKcalPD(String totalMilkCaloriesKcalPD) {
        if (!totalMilkCaloriesKcalPD.equals("")) {
            this.totalMilkCaloriesKcalPD = totalMilkCaloriesKcalPD;
        }
    }

    public void setTotalMilkCaloriesKcalPKgPD(String totalMilkCaloriesKcalPKgPD) {
        if (!totalMilkCaloriesKcalPKgPD.equals("")) {
            this.totalMilkCaloriesKcalPKgPD = totalMilkCaloriesKcalPKgPD;
        }
    }
}
