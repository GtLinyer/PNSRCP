package com.pnsrcp.web.config;

import com.alibaba.fastjson.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/18 22:13 星期二
 * @Description: 认证成功处理
 */
@Component
public class MyAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        response.setContentType("text/plain;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_OK);
        PrintWriter out = response.getWriter();
        JSONObject json = new JSONObject();
        json.put("code", 1);

        out.write(json.toJSONString());
        out.flush();
        out.close();
    }
}

