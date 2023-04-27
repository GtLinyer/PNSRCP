package com.pnsrcp.web.config;

import org.springframework.security.core.AuthenticationException;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/18 22:08 星期二
 * @Description: 自定义验证码异常
 */
public class ValidateCodeException extends AuthenticationException {

    private static final long serialVersionUID = -7932793974645209799L;

    public ValidateCodeException(String msg) {
        super(msg);
    }
}