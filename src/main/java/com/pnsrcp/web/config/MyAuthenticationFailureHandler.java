package com.pnsrcp.web.config;

import com.alibaba.fastjson.JSONObject;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/18 22:07 星期二
 * @Description: 认证失败处理
 */
@Component
public class MyAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        response.setContentType("text/plain;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_ACCEPTED);
        PrintWriter out = response.getWriter();
        JSONObject json = new JSONObject();
        json.put("code", 1);
        if (exception instanceof ValidateCodeException) {
            json.put("code", 0);
            json.put("errorMsg", "验证码错误！");
        } else if (exception instanceof AccountDeactivationException || exception instanceof InternalAuthenticationServiceException) {
            json.put("code", 0);
            json.put("errorMsg", exception.getMessage());
        } else if (exception instanceof UsernameNotFoundException || exception instanceof BadCredentialsException) {
            json.put("code", 0);
            json.put("errorMsg", "用户名或密码错误！");
        }else {
            json.put("code", 0);
            json.put("errorMsg", "出现了未知错误！");
        }
        out.write(json.toJSONString());
        out.flush();
        out.close();
    }
}
