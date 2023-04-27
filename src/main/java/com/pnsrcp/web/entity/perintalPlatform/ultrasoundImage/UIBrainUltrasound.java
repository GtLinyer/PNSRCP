package com.pnsrcp.web.entity.perintalPlatform.ultrasoundImage;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/07/07 21:51 星期四
 * @Description: 围产新生儿科研合作平台 超声影像库 颅脑超声 超声检查次数
 */
@Getter
@Setter
public class UIBrainUltrasound {
    private int id;
    private int cid;
    private int mid;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date ultrasonographyTime;
    private String lvahUrl;
    private String lvtsUrl;
    private String rpvsUrl;
    private String lpvsUrl;
    private String resultInterpretation;
}
