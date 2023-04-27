package com.pnsrcp.web.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/9/11 2:19 星期六
 * @Description: MVC 配置
 */
@Configuration
public class MyWebMvcConfig implements WebMvcConfigurer {
    // 图片路径
    @Value("${com.perinatalcloud.feedback_images_path}")
    private String feedbackImagesPath;
    @Value("${com.perinatalcloud.feedback_images_url}")
    private String feedbackImagesUrl;
    @Value("${com.perinatalcloud.dcp_images_path}")
    private String dcpImagesPath;
    @Value("${com.perinatalcloud.dcp_images_url}")
    private String dcpImagesUrl;
    @Value("${com.perinatalcloud.wxmp_ad_images_path}")
    private String wxmpAdImagesPath;
    @Value("${com.perinatalcloud.wxmp_ad_images_url}")
    private String wxmpAdImagesUrl;
    @Value("${com.perinatalcloud.ultrasound_images_path}")
    private String ultrasoundImagesPath;
    @Value("${com.perinatalcloud.ultrasound_images_url}")
    private String ultrasoundImagesUrl;
    @Value("${com.perinatalcloud.us_images_path}")
    private String usImagesPath;
    @Value("${com.perinatalcloud.us_images_url}")
    private String usImagesUrl;
    @Value("${com.perinatalcloud.mri_images_path}")
    private String mriImagesPath;
    @Value("${com.perinatalcloud.mri_images_url}")
    private String mriImagesUrl;
    @Value("${com.perinatalcloud.ct_images_path}")
    private String ctImagesPath;
    @Value("${com.perinatalcloud.ct_images_url}")
    private String ctImagesUrl;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(feedbackImagesUrl + "**").addResourceLocations("file:" + feedbackImagesPath);
        registry.addResourceHandler( dcpImagesUrl + "**").addResourceLocations("file:" + dcpImagesPath);
        registry.addResourceHandler( wxmpAdImagesUrl + "**").addResourceLocations("file:" + wxmpAdImagesPath);
        registry.addResourceHandler( ultrasoundImagesUrl + "**").addResourceLocations("file:" + ultrasoundImagesPath);
        registry.addResourceHandler( usImagesUrl + "**").addResourceLocations("file:" + usImagesPath);
        registry.addResourceHandler( mriImagesUrl + "**").addResourceLocations("file:" + mriImagesPath);
        registry.addResourceHandler( ctImagesUrl + "**").addResourceLocations("file:" + ctImagesPath);
    }
}