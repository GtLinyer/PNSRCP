package com.pnsrcp.web.entity.manage;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/04/30 08:32 星期六
 * @Description: 小程序 广告 实体类
 */
@Getter
@Setter
@TableName("pc_wxmp_ad_images")
public class Advertisement {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String url;
}
