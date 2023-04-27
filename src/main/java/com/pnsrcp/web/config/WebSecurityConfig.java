package com.pnsrcp.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import javax.sql.DataSource;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/18 22:17 星期二
 * @Description: 安全配置
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final MyAuthenticationSuccessHandler myAuSuccHan;

    private final MyAuthenticationFailureHandler myAuFailHan;

    private final VerifyCodeFilter verifyCodeFilter;

    private final DataSource dataSource;

    public WebSecurityConfig(MyAuthenticationSuccessHandler myAuSuccHan, MyAuthenticationFailureHandler myAuFailHan, VerifyCodeFilter verifyCodeFilter, DataSource dataSource) {
        this.myAuSuccHan = myAuSuccHan;
        this.myAuFailHan = myAuFailHan;
        this.verifyCodeFilter = verifyCodeFilter;
        this.dataSource = dataSource;
    }

    @Bean
    UserDetailsService myUDS() {
        return new MyUserDetailsService();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // 使用自定义UserDetailsService
        auth.userDetailsService(myUDS()).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Bean
    public PersistentTokenRepository persistentTokenRepository() {
        JdbcTokenRepositoryImpl persistentTokenRepository = new JdbcTokenRepositoryImpl();
        // 将 DataSource 设置到 PersistentTokenRepository
        persistentTokenRepository.setDataSource(dataSource);
        // 第一次启动的时候自动建表，关闭
        persistentTokenRepository.setCreateTableOnStartup(false);
        return persistentTokenRepository;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.addFilterBefore(verifyCodeFilter, UsernamePasswordAuthenticationFilter.class)  // 添加一个验证码过滤器
                .formLogin()  // 定义当需要用户登录时候，转到的登录页面
                .loginPage("/").permitAll()  // 设置登录页面
                .loginProcessingUrl("/login/post")  // 自定义的登录接口
                .failureUrl("/")
                .successHandler(myAuSuccHan)
                .failureHandler(myAuFailHan)
                .and().logout().logoutUrl("/logout")  // 自定义的注销接口
                .logoutSuccessUrl("/")
                .and().authorizeRequests()  // 定义哪些URL需要被保护、哪些不需要被保护
                .antMatchers("/login/**", "/favicon.svg", "/js/**", "/css/**", "/images/**", "/utils/**").permitAll()  // 设置所有人都可以访问登录页面
                .antMatchers("/manage/**").hasRole("ADMIN") // 设置 系统管理 访问权限
                .antMatchers("/perinatalPlatform/reportExport/**").hasAnyRole("ADMIN", "AC") // 设置 系统管理 访问权限
                .antMatchers("/feedback", "/feedback/**").hasRole("HC") // 设置 反馈 访问权限
                .antMatchers("/perinatalPlatform/basicDatabase/**").hasRole("BD") // 设置 基础数据库 访问权限
                .antMatchers("/perinatalPlatform/doctorPatientCommunication/**").hasRole("DPC") // 设置 医患交流库 访问权限
                .antMatchers("/perinatalPlatform/motherBabySameRoom/**").hasRole("MBSR") // 设置 母婴同室库 访问权限
                .antMatchers("/perinatalPlatform/parentalPsychology/**").hasRole("PP") // 设置 父母心理库 访问权限
                .antMatchers("/perinatalPlatform/researchDatabase/**").hasRole("RD") // 设置 研究数据库 访问权限
                .antMatchers("/perinatalPlatform/ultrasoundImage/**").hasRole("UI") // 设置 超声影像库 访问权限
                .antMatchers("/perinatalPlatform/followDatabase/**").hasRole("FD") // 设置 随访数据库 访问权限
                .antMatchers("/perinatalPlatform/highBilirubin/**").hasRole("HB") // 设置 高胆数据库 访问权限
                .anyRequest().authenticated()  // 任何请求,登录后可以访问
                .and().csrf().disable()  // 关闭csrf防护
                .rememberMe() // 记住我配置
                .tokenRepository(persistentTokenRepository())
                .tokenValiditySeconds(7*24*60*60);  // 记住我时长(秒)
    }
}