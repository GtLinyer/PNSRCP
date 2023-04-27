package com.pnsrcp.web.entity.perintalPlatform.basicDatabaseRP;

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
 * @Date: 2021/10/13 23:34 星期三
 * @Description: 基础数据库 视网膜病 筛查情况
 */
@Getter
@Setter
@TableName("pc_bd_rp_screening_status")
public class BDRPScreeningStatus {
    @TableId
    private Integer cid;
    private int mid;
    private int whetherNeedRopScreening = 0;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date firstScreeningDate4WeeksAfterBirth;
    private String correctGestationalAge4WeeksAfterBirthWeek;
    private String correctGestationalAge4WeeksAfterBirthDay;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date firstScreeningDate6WeeksAfterBirth;
    private String correctGestationalAge6WeeksAfterBirthWeek;
    private String correctGestationalAge6WeeksAfterBirthDay;
    private String screeningNumber;
    private String treatmentsNumber;
}
