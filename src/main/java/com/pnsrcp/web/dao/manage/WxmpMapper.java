package com.pnsrcp.web.dao.manage;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pnsrcp.web.entity.manage.Advertisement;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/08/23 16:03 星期二
 * @Description: 小程序 管理 数据层
 */
@Mapper
public interface WxmpMapper extends BaseMapper<Advertisement> {}