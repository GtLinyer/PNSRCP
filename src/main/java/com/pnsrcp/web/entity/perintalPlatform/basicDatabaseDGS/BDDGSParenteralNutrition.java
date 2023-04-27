package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseDGS;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2023/02/21 01:26 星期二
 * @Description: 基础数据库 消化系统 肠外营养
 */
@Getter
@Setter
@TableName("pc_bd_dgs_parenteral_nutrition")
public class BDDGSParenteralNutrition {
    @TableId
    private Integer cid;
    private int mid;
    private Integer catheterizationTotalDays;
    private Double glucose50p1to7d;
    private Double glucose50p8to14d;
    private Double glucose50p15to21d;
    private Double glucose50p22to28d;
    private Double glucose50pTotal;
    private Double glucose10p1to7d;
    private Double glucose10p8to14d;
    private Double glucose10p15to21d;
    private Double glucose10p22to28d;
    private Double glucose10pTotal;
    private Double glucose5p1to7d;
    private Double glucose5p8to14d;
    private Double glucose5p15to21d;
    private Double glucose5p22to28d;
    private Double glucose5pTotal;
    private Double sterilizedWater50p1to7d;
    private Double sterilizedWater50p8to14d;
    private Double sterilizedWater50p15to21d;
    private Double sterilizedWater50p22to28d;
    private Double sterilizedWater50pTotal;
    private Double aminoAcid6p1to7d;
    private Double aminoAcid6p8to14d;
    private Double aminoAcid6p15to21d;
    private Double aminoAcid6p22to28d;
    private Double aminoAcid6pTotal;
    private Double fatEmulsion20p1to7d;
    private Double fatEmulsion20p8to14d;
    private Double fatEmulsion20p15to21d;
    private Double fatEmulsion20p22to28d;
    private Double fatEmulsion20pTotal;
    private Double nonPNLiquid1to7d;
    private Double nonPNLiquid8to14d;
    private Double nonPNLiquid15to21d;
    private Double nonPNLiquid22to28d;
    private Double nonPNLiquidTotal;
    private Double totalLiquidVolume1to7d;
    private Double totalLiquidVolume8to14d;
    private Double totalLiquidVolume15to21d;
    private Double totalLiquidVolume22to28d;
    private Double totalLiquidVolumeTotal;
}
