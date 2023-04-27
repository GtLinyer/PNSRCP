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
 * @Date: 2021/11/7 0:21 星期日
 * @Description: 基础数据库 消化系统 肠内营养 数据
 */
@Getter
@Setter
@TableName("pc_bd_dgs_en_data")
public class BDDGSEnData {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    private String day;
    private String fasting;
    private String tubeFeeding;
    private String partialNasalFeeding;
    private String bottleFeeding;
    private String partialBreastfeeding;
    private String directBreastfeeding;
    private String breastMilk;
    private String donateBreastMilk;
    private String breastMilkFortifier;
    private String deeplyHydrolyzedMilk;
    private String partiallyHydrolyzedMilk;
    private String aminoAcidMilk;
    private String ordinaryFormulaMilk;

    public void setFasting(String fasting) {
        if (!fasting.equals("")) {
            this.fasting = fasting;
        }
    }

    public void setTubeFeeding(String tubeFeeding) {
        if (!tubeFeeding.equals("")) {
            this.tubeFeeding = tubeFeeding;
        }
    }

    public void setPartialNasalFeeding(String partialNasalFeeding) {
        if (!partialNasalFeeding.equals("")) {
            this.partialNasalFeeding = partialNasalFeeding;
        }
    }

    public void setBottleFeeding(String bottleFeeding) {
        if (!bottleFeeding.equals("")) {
            this.bottleFeeding = bottleFeeding;
        }
    }

    public void setPartialBreastfeeding(String partialBreastfeeding) {
        if (!partialBreastfeeding.equals("")) {
            this.partialBreastfeeding = partialBreastfeeding;
        }
    }

    public void setDirectBreastfeeding(String directBreastfeeding) {
        if (!directBreastfeeding.equals("")) {
            this.directBreastfeeding = directBreastfeeding;
        }
    }

    public void setBreastMilk(String breastMilk) {
        if (!breastMilk.equals("")) {
            this.breastMilk = breastMilk;
        }
    }

    public void setDonateBreastMilk(String donateBreastMilk) {
        if (!donateBreastMilk.equals("")) {
            this.donateBreastMilk = donateBreastMilk;
        }
    }

    public void setBreastMilkFortifier(String breastMilkFortifier) {
        if (!breastMilkFortifier.equals("")) {
            this.breastMilkFortifier = breastMilkFortifier;
        }
    }

    public void setDeeplyHydrolyzedMilk(String deeplyHydrolyzedMilk) {
        if (!deeplyHydrolyzedMilk.equals("")) {
            this.deeplyHydrolyzedMilk = deeplyHydrolyzedMilk;
        }
    }

    public void setPartiallyHydrolyzedMilk(String partiallyHydrolyzedMilk) {
        if (!partiallyHydrolyzedMilk.equals("")) {
            this.partiallyHydrolyzedMilk = partiallyHydrolyzedMilk;
        }
    }

    public void setAminoAcidMilk(String aminoAcidMilk) {
        if (!aminoAcidMilk.equals("")) {
            this.aminoAcidMilk = aminoAcidMilk;
        }
    }

    public void setOrdinaryFormulaMilk(String ordinaryFormulaMilk) {
        if (!ordinaryFormulaMilk.equals("")) {
            this.ordinaryFormulaMilk = ordinaryFormulaMilk;
        }
    }
}
