package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseIS;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/9/27 13:02 星期一
 * @Description: 基础数据库 感染监测 抗菌药物
 */
@Getter
@Setter
@TableName("pc_bd_is_ad")
public class BDISAd {
    @TableId
    private Integer cid;
    private int mid;
    private String totalAntibacterialDrugNumber;
    private String totalAntibacterialDrugDotNumber;
    private String totalAntibacterialDrugLotNumber;
}
