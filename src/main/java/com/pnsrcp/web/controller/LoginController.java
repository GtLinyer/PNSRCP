package com.pnsrcp.web.controller;

import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;
import com.pnsrcp.web.config.MyUserDetails;
import com.pnsrcp.web.entity.manage.User;
import com.pnsrcp.web.service.MainService;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.time.LocalDate;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/20 23:08 星期四
 * @Description: 登录控制层
 */
@Controller
public class LoginController {
    @Resource
    private MainService mainService;

    // 验证码图片
    private final Producer captchaProducer;

    // 构造体
    public LoginController(Producer captchaProducer) {
        this.captchaProducer = captchaProducer;
    }

    // 生成验证码图片
    @GetMapping(value = "/login/verCodeImg")
    public void verCodeImg(HttpServletRequest request, HttpServletResponse response) throws Exception {
        byte[] captchaOutputStream;
        ByteArrayOutputStream imgOutputStream = new ByteArrayOutputStream();
        try {
            // 生产验证码字符串并保存到session中
            String rightVerCode = captchaProducer.createText();
            request.getSession().setAttribute(Constants.KAPTCHA_SESSION_KEY, rightVerCode);
            BufferedImage challenge = captchaProducer.createImage(rightVerCode);
            ImageIO.write(challenge, "jpg", imgOutputStream);
        } catch (IllegalArgumentException e) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }
        captchaOutputStream = imgOutputStream.toByteArray();
        response.setHeader("Cache-Control", "no-store");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
        response.setContentType("image/jpeg");
        ServletOutputStream responseOutputStream = response.getOutputStream();
        responseOutputStream.write(captchaOutputStream);
        responseOutputStream.flush();
        responseOutputStream.close();
    }

    // 校验验证码
    @PostMapping(value = "/login/checkVerCode")
    @ResponseBody
    public boolean checkVerCode(HttpSession session, @RequestParam("verCode") String inputVerCode) {
        boolean check = false;
        String rightVerCode = (String) session.getAttribute(Constants.KAPTCHA_SESSION_KEY);
        if(!StringUtils.isEmpty(rightVerCode)) {
            if(inputVerCode.equals(rightVerCode)) {
                check = true;
            }
        }
        return check;
    }

    // 登录页面
    @GetMapping({"", "/"})
    public String login(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth instanceof AnonymousAuthenticationToken){
            model.addAttribute("year", LocalDate.now().getYear());
            return "login";
        }else{
            return "redirect:/main";
        }
    }

    // 修改 密码
    @PostMapping(value = "/changePwd")
    @ResponseBody
    public String changePassword(@RequestParam("oldPwd") String oldPwd,
                                 @RequestParam("newPwd") String newPwd,
                                 @RequestParam("reNewPwd") String reNewPwd) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();
        return mainService.changePwd(user, oldPwd, newPwd, reNewPwd);
    }
}
