package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseIS;

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
 * @Date: 2021/9/27 20:16 星期一
 * @Description: 基础数据库 感染监测 其它感染诊断
 */
@Getter
@Setter
@TableName("pc_bd_is_oid")
public class BDISOid {
    @TableId
    private Integer cid;
    private int mid;
    private int urinaryTractInfection = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date utiDiagnosisTime;
    private int purulentMeningitis = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date pmDiagnosisTime;
    private int viralMeningitis = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date vmDiagnosisTime;
    private int catheterRelatedBloodstreamInfection = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date crbiDiagnosisTime;
}
