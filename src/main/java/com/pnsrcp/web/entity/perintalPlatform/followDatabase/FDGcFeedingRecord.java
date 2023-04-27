package com.pnsrcp.web.entity.perintalPlatform.followDatabase;

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
 * @Date: 2022/06/23 14:47 星期四
 * @Description: 随访数据库 生长曲线 喂养 记录
 */
@Getter
@Setter
@TableName("pc_fd_gc_feeding_record")
public class FDGcFeedingRecord {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date feedingRecordDate;
    private String cgaWeek;
    private String cgaDay;
    private String correctedAgeMonth;
    private String correctedAgeDay;
    private String feedingSituation;
    private String feedingMethod;
    private String breastfeedingSituation;
    private String stoolSituation;
    private String urineSituation;
    private String breastMilk;
    private String breastMilkFortifier;
    private String prematureInfantFormulaMilk;
    private String termInfantFormulaMilk;
    private String aminoAcidMilk;
    private String hydrolyzedProteinMilk;
    private String calories;
}
