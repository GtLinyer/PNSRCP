package com.pnsrcp.web.config;

import org.springframework.security.core.AuthenticationException;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/7/12 12:52 星期一
 * @Description: 登录错误
 */
public class AccountDeactivationException extends AuthenticationException {

    public AccountDeactivationException(String msg, Throwable t) {
        super(msg, t);
    }

    public AccountDeactivationException(String msg) {
        super(msg);
    }
}
