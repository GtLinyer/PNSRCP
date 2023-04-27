package com.pnsrcp.web.entity.perintalPlatform.basicDatabse;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Project: 围产新生儿科研合作平台
 * @Author: Linyer
 * @Email: linyer@linyer.cn
 * @Date: 2021/8/5 22:12 星期四
 * @Description: 基础数据库 复苏情况
 */
@Getter
@Setter
@TableName("pc_bd_recovery_situation")
public class BDRecoverySituation {
    @TableId
    private Integer cid;
    private int mid;
    private String recoveryMeasures;
    private int attractionMildStimulation = 0;
    private int nasalCannulaOxygen = 0;
    private int positiveMaskVentilation = 0;
    private int pmvResuscitationBag = 0;
    private int pmvTCombiner = 0;
    private int continuousPositiveAirwayPressure = 0;
    private String cpapMothed;
    private int trachealIntubation = 0;
    private int chestCompressionH60S = 0;
    private int adrenaline = 0;
    private int normalSaline = 0;
    private String resuscitateInitialGas;
    private String initialOxygenConcentration;
    private String resuscitationMaxO2Concentration;
    private String delayedUmbilicalCordLigation;
    private String delayedUmbilicalCordLigationTime;
    private String umbilicalCordSqueeze;
    private int administrationModeUmbilicalVein = 0;
    private int administrationModeUmbilicalArtery = 0;
    private int administrationModePeripheralVein = 0;
    private int administrationModeTrachealTube = 0;
    private int apgarAuxiliaryScoring1MinGiveOxygen = 0;
    private int apgarAuxiliaryScoring1MinPositivePressureVentilation = 0;
    private int apgarAuxiliaryScoring1MinContinuousPositivePressureVentilation = 0;
    private int apgarAuxiliaryScoring1MinTrachealIntubation = 0;
    private int apgarAuxiliaryScoring1MinChestCompressionsH60S = 0;
    private int apgarAuxiliaryScoring1MinAdrenaline = 0;
    private int apgarAuxiliaryScoring1Min = 0;
    private int apgarAuxiliaryScoring5MinGiveOxygen = 0;
    private int apgarAuxiliaryScoring5MinPositivePressureVentilation = 0;
    private int apgarAuxiliaryScoring5MinContinuousPositivePressureVentilation = 0;
    private int apgarAuxiliaryScoring5MinTrachealIntubation = 0;
    private int apgarAuxiliaryScoring5MinChestCompressionsH60S = 0;
    private int apgarAuxiliaryScoring5MinAdrenaline = 0;
    private int apgarAuxiliaryScoring5Min = 0;
    private int apgarAuxiliaryScoring10MinGiveOxygen;
    private int apgarAuxiliaryScoring10MinPositivePressureVentilation = 0;
    private int apgarAuxiliaryScoring10MinContinuousPositivePressureVentilation = 0;
    private int apgarAuxiliaryScoring10MinTrachealIntubation = 0;
    private int apgarAuxiliaryScoring10MinChestCompressionsH60S = 0;
    private int apgarAuxiliaryScoring10MinAdrenaline = 0;
    private int apgarAuxiliaryScoring10Min = 0;
    private String recoveryEnd;
    private String stopRecoveryTime;
    private int abandonRecoveryReasonUltraImmature = 0;
    private int abandonRecoveryReasonCongenitalMalformations = 0;
    private int abandonRecoveryReasonEconomicReasons = 0;
    private int abandonRecoveryReasonWorryPrognosis = 0;
    private int abandonRecoveryReasonOther = 0;
    private int umbilicalArterialBloodGas = 0;
    private String uabgPH;
    private String uabgBloodOxygenSaturation;
    private String uabgLacticAcid;
    private String uabgPaO2;
    private String uabgPaCO2;
    private String uabgBE;
    private String uabgHCO3;
    private String uabgHgb;
    private String apgarScore1Min;
    private String apgarScore5Min;
    private String apgarScore10Min;
    private String neonatalAsphyxia;
    private String fateAfterBirth;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date deathTime;
    private int congenitalMalformations = 0;
}
