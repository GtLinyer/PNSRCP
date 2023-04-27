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
 * @Date: 2021/10/31 20:48 星期日
 * @Description: 基础数据库 消化系统 生长指标 体重、头围、身长
 */
@Getter
@Setter
@TableName("pc_bd_dgs_gi_whcbl")
public class BDDGSGiWHcBl {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private int cid;
    private int mid;
    private String day;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date thisDate;
    private String weight;
    private String headCircumference;
    private String bodyLength;
    private String cgaWeek;
    private String cgaDay;

    public void setWeight(String weight) {
        if (!weight.equals("")) {
            this.weight = weight;
        }
    }

    public void setHeadCircumference(String headCircumference) {
        if (!headCircumference.equals("")) {
            this.headCircumference = headCircumference;
        }
    }

    public void setBodyLength(String bodyLength) {
        if (!bodyLength.equals("")) {
            this.bodyLength = bodyLength;
        }
    }
}
