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
 * @Date: 2022/07/07 15:18 星期四
 * @Description: 区域 超声影像库 实体
 */
@Getter
@Setter
@TableName("pc_area_auth_ui")
public class AreaAuthUI {
    @TableId(type = IdType.AUTO)
    private Integer aid;
    private int ultrasoundImage = 0;
    private int uiBrainUltrasound = 0;
}
