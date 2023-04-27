package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseIS;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/9/27 18:25 星期一
 * @Description: 基础数据库 感染监测 评价指标
 */
@Getter
@Setter
@TableName("pc_bd_is_evaluation_index")
public class BDISEvaluationIndex {
    @TableId
    private Integer cid;
    private int mid;
    private int whetherUseAntibioticsDuringHospitalization = 0;
    private int restrictedAntibioticsUse = 0;
    private int specialGradeAntibioticsUse = 0;
}
