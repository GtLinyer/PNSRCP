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
 * @Date: 2021/11/13 0:07 星期六
 * @Description: 基础数据库 消化系统 肠外营养 数据
 */
@Getter
@Setter
@TableName("pc_bd_dgs_pn_data")
public class BDDGSPnData {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    private String day;
    private String glucose50Percent;
    private String glucose10Percent;
    private String glucose5Percent;
    private String sterilizedWater50Percent;
    private String aminoAcid6Percent;
    private String fatMilk20Percent;
    private String nonPNLiquid;

    public void setGlucose50Percent(String glucose50Percent) {
        if (!glucose50Percent.equals("")) {
            this.glucose50Percent = glucose50Percent;
        }
    }

    public void setGlucose10Percent(String glucose10Percent) {
        if (!glucose10Percent.equals("")) {
            this.glucose10Percent = glucose10Percent;
        }
    }

    public void setGlucose5Percent(String glucose5Percent) {
        if (!glucose5Percent.equals("")) {
            this.glucose5Percent = glucose5Percent;
        }
    }

    public void setSterilizedWater50Percent(String sterilizedWater50Percent) {
        if (!sterilizedWater50Percent.equals("")) {
            this.sterilizedWater50Percent = sterilizedWater50Percent;
        }
    }

    public void setAminoAcid6Percent(String aminoAcid6Percent) {
        if (!aminoAcid6Percent.equals("")) {
            this.aminoAcid6Percent = aminoAcid6Percent;
        }
    }

    public void setFatMilk20Percent(String fatMilk20Percent) {
        if (!fatMilk20Percent.equals("")) {
            this.fatMilk20Percent = fatMilk20Percent;
        }
    }

    public void setNonPNLiquid(String nonPNLiquid) {
        if (!nonPNLiquid.equals("")) {
            this.nonPNLiquid = nonPNLiquid;
        }
    }
}
