package com.pnsrcp.web.config;

import com.pnsrcp.web.service.MainService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/18 22:15 星期二
 * @Description: 用户登录认证配置
 */
@Component
public class MyUserDetailsService implements UserDetailsService {
    @Resource
    private MainService mainService;

    @Override
    public MyUserDetails loadUserByUsername(String username) {
        return mainService.doLogin(username);
    }
}