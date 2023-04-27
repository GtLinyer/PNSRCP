package com.pnsrcp.web.config;

import com.google.code.kaptcha.Constants;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/18 22:08 星期二
 * @Description: 验证码过滤器
 */
@Component
class VerifyCodeFilter extends GenericFilterBean {

    private AuthenticationFailureHandler authenctiationFailureHandler;

    VerifyCodeFilter(AuthenticationFailureHandler authenctiationFailureHandler) {
        this.authenctiationFailureHandler = authenctiationFailureHandler;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) resp;
        String defaultFilterProcessUrl = "/login/post";

        if (request.getMethod().equals("POST") && request.getServletPath().equals(defaultFilterProcessUrl)) {
            // 验证码验证
            String inputVerCode = request.getParameter("verCode");
            String rightVerCode = (String) request.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY);
            try {
                if (StringUtils.isEmpty(inputVerCode)) {
                    throw new ValidateCodeException("emptyVerCode");
                }else if(!inputVerCode.equals(rightVerCode)) {
                    throw new ValidateCodeException("errorVerCode");
                }
            } catch (ValidateCodeException e) {
                // 有异常就返回自定义失败处理器
                authenctiationFailureHandler.onAuthenticationFailure(request, response, e);
                return;
            }
        }
        chain.doFilter(request, response);
    }
}