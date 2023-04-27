package com.pnsrcp.web.utils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.core.io.ClassPathResource;

import java.io.BufferedReader;
import java.io.InputStreamReader;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2022/04/14 00:13 星期四
 * @Description: 获取 区域 工具类
 */
public class RegionUtil {

    private static final ClassPathResource cpr = new ClassPathResource("/static/js/utils/region.json");

    // 根据 code 获取 省名
    public static String getProvinceByCode(String provinceCode) {
        BufferedReader bufferedReader = null;
        try {
            bufferedReader = new BufferedReader(new InputStreamReader(cpr.getInputStream()));
            StringBuilder regionString = new StringBuilder();
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                regionString.append(line);
            }
            JSONArray regionArray = JSONObject.parseArray(regionString.toString());
            for (int i = 0; i < regionArray.size(); i ++) {
                JSONObject region = regionArray.getJSONObject(i);
                if (region.get("code").equals(provinceCode)) {
                    return region.getString("name");
                }
            }
        } catch (Exception e) {
            try {
                bufferedReader.close();
            } catch (Exception ignored) {}
        }
        return null;
    }

    // 根据 code 获取 市名
    public static String getCityByCode(String provinceCode, String cityCode) {
        BufferedReader bufferedReader = null;
        try {
            bufferedReader = new BufferedReader(new InputStreamReader(cpr.getInputStream()));
            StringBuilder regionString = new StringBuilder();
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                regionString.append(line);
            }
            JSONArray regionArray = JSONObject.parseArray(regionString.toString());
            for (int i = 0; i < regionArray.size(); i ++) {
                JSONObject region = regionArray.getJSONObject(i);
                if (region.get("code").equals(provinceCode)) {
                    JSONArray cities = region.getJSONArray("children");
                    for (int j = 0; j < cities.size(); j ++) {
                        JSONObject city = cities.getJSONObject(j);
                        if (city.get("code").equals(cityCode)) {
                            return city.getString("name");
                        }
                    }
                }
            }
        } catch (Exception e) {
            try {
                bufferedReader.close();
            } catch (Exception ignored) {}
        }
        return null;
    }

    // 根据 code 获取 县名
    public static String getCountyByCode(String provinceCode, String cityCode, String countyCode) {
        BufferedReader bufferedReader = null;
        try {
            bufferedReader = new BufferedReader(new InputStreamReader(cpr.getInputStream()));
            StringBuilder regionString = new StringBuilder();
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                regionString.append(line);
            }
            JSONArray regionArray = JSONObject.parseArray(regionString.toString());
            for (int i = 0; i < regionArray.size(); i ++) {
                JSONObject region = regionArray.getJSONObject(i);
                if (region.get("code").equals(provinceCode)) {
                    JSONArray cities = region.getJSONArray("children");
                    for (int j = 0; j < cities.size(); j ++) {
                        JSONObject city = cities.getJSONObject(j);
                        if (city.get("code").equals(cityCode)) {
                            JSONArray counties = city.getJSONArray("children");
                            for (int k = 0; k < counties.size(); k ++) {
                                JSONObject county = counties.getJSONObject(k);
                                if (county.get("code").equals(countyCode)) {
                                    return county.getString("name");
                                }
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            try {
                bufferedReader.close();
            } catch (Exception ignored) {}
        }
        return null;
    }
}
