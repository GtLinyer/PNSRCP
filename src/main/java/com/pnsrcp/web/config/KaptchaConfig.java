package com.pnsrcp.web.config;

import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.google.code.kaptcha.util.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Properties;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/18 22:05 星期二
 * @Description: 谷歌验证码配置
 */
@Component
public class KaptchaConfig {
    @Bean
    public DefaultKaptcha getDDefaultKaptcha() {
        DefaultKaptcha dk = new DefaultKaptcha();
        Properties properties = new Properties();

        // 图片边框
        properties.setProperty("kaptcha.border", "no");
        // 字体颜色
        properties.setProperty("kaptcha.textproducer.font.color", "0,0,0");
        // 图片宽
        properties.setProperty("kaptcha.image.width", "90");
        // 图片高
        properties.setProperty("kaptcha.image.height", "38");
        // 图片样式
        properties.setProperty("kaptcha.obscurificator.impl", "com.google.code.kaptcha.impl.FishEyeGimpy");
        // 字体大小
        properties.setProperty("kaptcha.textproducer.font.size", "28");
        // session key
        properties.setProperty("kaptcha.session.key", "verCode");
        // 验证码长度
        properties.setProperty("kaptcha.textproducer.char.length", "4");
        // 字体
        properties.setProperty("kaptcha.textproducer.font.names", "Arial,Courier");

        Config config = new Config(properties);
        dk.setConfig(config);

        return dk;
    }
}
