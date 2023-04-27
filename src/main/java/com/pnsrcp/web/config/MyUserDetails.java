package com.pnsrcp.web.config;

import com.pnsrcp.web.entity.manage.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/18 22:15 星期二
 * @Description: 自定义登录验证 用户信息
 */
public class MyUserDetails implements UserDetails {
    private String username;  // 登录用户名
    private String password;  // 登录密码
    private User user; // 登录用户
    private Collection<SimpleGrantedAuthority> authorities; // 权限
    private Map<String, List<String>> authMapList;

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setAuthorities(Collection<SimpleGrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public Map<String, List<String>> getAuthMapList() {
        return authMapList;
    }

    public void setAuthMapList(Map<String, List<String>> authMapList) {
        this.authMapList = authMapList;
    }

    @Override
    public Collection<SimpleGrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}