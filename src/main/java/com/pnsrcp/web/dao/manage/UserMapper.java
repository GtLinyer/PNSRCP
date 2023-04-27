package com.pnsrcp.web.dao.manage;

import com.pnsrcp.web.entity.manage.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/5/27 15:39 星期四
 * @Description: 用户信息 数据层
 */
@Mapper
public interface UserMapper {
    /**
     * 获取 登录用户信息
     * @param username 用户名
     * @return 用户信息
     */
    User userQuery(@Param("username") String username);

    /**
     * 获取 用户信息
     * @param hospitalId 医院ID
     * @param page 页面
     * @param limit 限制
     * @return 用户信息
     */
    List<User> usersQuery(@Param("hospitalId") int hospitalId, @Param("page") int page, @Param("limit") int limit);

    /**
     * 获取 用户数量
     * @return 用户数量
     */
    int userCount(@Param("hospitalId") int hospitalId);

    /**
     * 插入 用户信息
     * @param user 用户信息
     * @return 改变的行数
     */
    int userInsert(@Param("user") User user);

    /**
     * 更新 用户信息
     * @param user 用户信息
     * @return 改变的行数
     */
    int userUpdate(@Param("user") User user);

    /**
     * 更新 用户 密码
     * @param userId 用户ID
     * @param password 新密码
     * @return 改变的行数
     */
    int userPwdUpdate(@Param("userId") int userId, @Param("password") String password);
}