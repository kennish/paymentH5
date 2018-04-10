<template>
    <div class="body">
        <div class="flow">
            <div>
                <img class="topImg" src="../assets/img/SignStep1_on@3x.png" />
                <span style="color: #FE6138;">完善信息</span>
            </div>
            <span class="line line1"></span>
            <div>
                <img class="topImg" src="../assets/img/SignStep2_on@3x.png" />
                <span  style="color: #FE6138;">租赁合同</span>
            </div>
            <span class="line lineHalf"></span>
            <div>
                <img class="topImg" src="../assets/img/SignStep3_off@2x.png" />
                <span style="color: #C0C0C0;">电子签约</span>
            </div>
        </div>
        <section class="main" v-if="data">
            <h2 style="text-align:center">房屋租赁合同</h2>
            <p class="bold black">出租方：<span name="landlordHouse_companyName">{{data.landlordHouse.companyName}} (以下简称甲方)</span></p>
            <p class="bold black">地址：<span name="landlordHouse_companyAddress">{{data.landlordDetail.companyAddress}}</span>
            <p class="bold black">承租方： <span name="tenantsInfo_name">{{data.tenantsInfo.name}} (以下简称乙方)</span> </p>
            <p class="bold black"> 证件号码： <span name="tenantsInfo_idCard">{{data.tenantsInfo.idCard}}</span></p>
            <p class="bold black"> 房源地址：<span name="tenantsInfo_address">{{houseAddress}}</span></p>
            <p class="bold black"> 电话：<span name="tenantsInfo_mobile">{{data.tenantsInfo.mobile}}</span> </p>
            <p> 甲乙双方根据中华人民共和国法律和上海市有关法规，就租赁房屋事宜，经双方协商一致订立租赁合同如下：</p>
            <p class="bold black little-large">第一条：房屋出租</p>
            <!--<p> 1.名称：『 <span name="area_name"></span> 』(以下简称该物业)</p>-->
            <p>地址： <span name="tenantsInfo_fulladdress">{{houseAddress}}</span>(以下简称该房屋)</p>
            <p class="bold black little-large"> 第二条：租赁部位及面积</p>
            <p>甲方将该房屋在完全装修且良好状态下出租给乙方，租用建筑面积总计 <span name="houseSize" class="bottomThin">{{data.landlordHouse.houseSize}}</span> 平方米。</p>
            <p class="bold black little-large"> 第三条：租赁目的</p>
            <p> 3.1乙方向甲方承诺，租赁该房屋作为 <span class="bottomThin">居住</span> 使用，并遵守国家和本市有关房屋使用和物业管理的规定。</p>
            <p> 3.2 乙方保证：在租赁期内未征得甲方书面同意以及按规定须经有关部门审批核准前，不擅自改变上款约定的使用用途，不得群租，不得作为商用，否则将视为违约赔偿两个月的租金为违约金。</p>
            <p class="bold black little-large">第四条：租赁期限 </p>
            <p> 1. 租赁期 <span name="rentalPeriod">{{data.rentalPeriod}}</span> 个月 自<span name="leaseTime">{{leaseTime}}</span></p>
            <!--<p>固定期自<span name="fixationTime" class="bottomThin"></span>至<span name="fixationTimes" class="bottomThin"></span></p>
            <p>非固定期自<span name="noFixationTime" class="bottomThin"></span>至<span name="noFixationTimes" class="bottomThin"></span></p>-->
            <p>2.租赁期满，甲方有权收回全部出租房屋，乙方应如期或提前交还；乙方若要求续租或退租该房屋，须在本合同期满前一个月向甲方提出书面申请，经双方洽商并同意新租约条件后重新签订租赁合同或续租合同。 </p>
            <p class="bold black little-large"> 第五条：租金与费用</p>
            <p>1租金与支付 </p>
            <p>1.1 自<span name="leaseTime">{{leaseTime}}</span>止，每月人民币 <span name="rent">{{data.rent}}</span>元</p>
            <p>1.2 乙方选择以下方式【<span name='isLoans'>{{data.isLoans?'方式二':'方式一'}}</span>】向甲方支付租金：</p>
            <p style="text-indent: 1.6em;">方式一：付租金<span name='payWay'>{{data.rentPayTypeStr}}</span>，乙方应当于每月<span name="leasePayDay" class="bottomThin">{{data.payDay}}</span>日前向甲方支付房租。</p>
            <p style="text-indent: 1.6em;">方式二：乙方同意就其所租赁房屋的全额房租（即每月租金*租赁月数）向资金方申请“消费金融租金分期”。若资金方审核通过乙方“消费金融租金分期”申请的，乙方应当与资金方另行签订《消费金融租金分期贷款合同》，且乙方同意并授权资金方将全额房租直接支付至甲方的银行账户。乙方应当于每月【<span name="leasePayDay">{{data.payDay}}</span>】日向甲方支付【<span name='rent'>{{data.rent}}</span>】元，且乙方授权甲方每月将该笔款项向资金方偿还。甲方的银行账户信息如下：</p>
            <p style="text-indent: 1.6em;">账户名：<span class="bottomThin" name='lcName'>{{data.landlordDetail.payeeName}}</span></p>
            <p style="text-indent: 1.6em;">账&nbsp;&nbsp;&nbsp; 号：<span class="bottomThin" name='lcbankAccount'>{{data.landlordDetail.bankAccount}}</span></p>
            <p style="text-indent: 1.6em;">开户行：<span class="bottomThin" name='bankName'>{{data.landlordDetail.bankName}}</span></p>
            <p>1.3 乙方应当向甲方支付租房押金，押金为【<span name='rent'>{{data.rent}}</span>】元。乙方应当于【<span name='updateTime'>{{data.updateTime}}</span>】日向甲方支付租房押金。</p>
            <p>2.  甲方提供的第三方房屋增值独家服务平台为【盈家生活】及对应提供的APP、400电话和相关其指定的服务页面。</p>
            <p>3. 乙方在租赁期间所用水、电、煤气、电话 等费用，按账单由乙方支付(如有)。</p>
            <p style="text-indent: 1.6em;">本合同签署时，该房屋的水、电、煤气初始读表数为：</p>
            <p style="text-indent: 1.6em;">水：【 】</p>
            <p style="text-indent: 1.6em;">电：平【 】 谷【 】</p>
            <p style="text-indent: 1.6em;">煤气：【 】</p>
            <p style="text-indent: 1.6em;"> 租赁场所内的清洁工作，由乙方负责。</p>
            <p>4 租房押金</p>
            <p>4.1 签订本合同时，乙方向甲方交付人民币 <span name="deposit" class="bottomThin">{{data.deposit}}</span>元 作押金 。</p>
            <p>4.2 押金不计利息，租赁期满并结清所有费用后，以人民币币种金额形式退还至乙方提供的指定银行账号。</p>
            <p>4.3 乙方如逾期未付租金或未按本合同规定支付费用时，甲方可先将押金的一部分(相当于逾期未付之费用)扣除后通知乙方，并保留索赔权。</p>
            <p>4.4 押金扣除被没收部分后，乙方应在收到甲方通知后7天内，补足其被没收部分的押金。</p>
            <p>4.5 本合同终止时，乙方须将租赁场所全部归还甲方。乙方在清偿应承担的一切费用后，甲方于一个月内把剩余押金无息退还给乙方指定的银行账户。</p>
            <p>4.6 押金支付到甲方指定的如下</p>
            <p>户名：<span class="bottomThin" name='lcName'>{{data.landlordDetail.payeeName}}</span></p>
            <p>账户：<span class="bottomThin" name='lcbankAccount'>{{data.landlordDetail.bankAccount}}</span></p>
            <p>开户行：<span class="bottomThin" name='bankName'>{{data.landlordDetail.bankName}}</span></p>
            <p>4.7  乙方未按照合同前述约定的日期向甲方支付租金的，甲方有权对乙方租赁的该房屋采取以下措施：</p>
            <p>(1)逾期24小时后仍未支付租金的，甲方有权切断对乙方租赁的该房屋的电力供应；</p>
            <p>(2)逾期48小时后仍未支付租金的，甲方有权封锁乙方租赁的该房屋的房门；</p>
            <p>(3)逾期72小时后仍未支付租金的，甲方有权直接通知乙方解除本合同并清退乙方、办理结算手续，由此产生的一切损失和责任由乙方负责。</p>
            <p>乙方在上述（1）、（2）情形发生的24小时内支付相应租金的，甲方将在收到租金后24小时内会及时恢复该房屋供电或解锁门锁等，乙方可继续正常使用该房屋。</p>
            <p>4.8  若在租赁期内，乙方单方提前解除本合同的，甲方无须向乙方退回押金。</p>
            <p class="bold black little-large">第六条：甲方的权利和义务</p>
            <p>1.租赁期内甲方不得无故收回该房屋。</p>
            <p>2.甲方定期对房屋设备进行维修保养。</p>
            <p>3.甲方应做好房屋的安全管理工作。</p>
            <p>4.甲方由于房屋的保养、维修、防盗防火、救护或其他管理上的需要，须进入乙方房屋检查时，应事先通知乙方，必要时可采取必要的措施。但遇到紧急情况，可告知乙方，乙方应予协助和支持。</p>
            <p>5.因自然灾害及不可抗力事件，或非甲方故意造成，或非甲方重大过失造成火灾、盗窃而引起的损害，甲方不负任何责任。</p>
            <p>6.乙方因被其它客户牵连而蒙受损失时，甲方不负任何责任。</p>
            <p class="bold black little-large">第七条：乙方的权力和义务</p>
            <p>1.乙方应按本合同各项规定缴付费用。</p>
            <p>2.乙方不能将租赁的房屋全部或部分转租给第三者或让第三者使用。</p>
            <p>3.除房屋内已有的装饰和设施之外，乙方需重新装修时，必须事先报请有关部门批准，并得到甲方的书面同意后才可实施。租赁期满必须回复原状(合理损耗除外)并承担一切费用。经甲方验收合格后归还甲方。</p>
            <p>4.乙方有义务妥善使用所租赁房屋内的家具、电器及智能管理设备（包括但不限于人工智能盒子、智能门锁、分时电表等），若因使用不当而造成损坏，乙方须照价赔偿。如乙方不支付，甲方有权扣除部分或全部押金并保留索赔权。</p>
            <p>5.乙方承诺放弃优先购买权。</p>
            <p class="bold black little-large">第八条：合同解除及索赔</p>
            <p>乙方如发生以下行为时，甲方在协商不成的情况下可通知乙方解除本合同，甲方除有权没收乙方的租房押金外，同时可封存所租赁房屋内的所有物品，并保留索赔权：</p>
            <p>1.租金及其他费用超过3日以上未付。</p>
            <p>2.租赁场所的使用违反本合同第三条规定。</p>
            <p class="bold black little-large">第九条：协商解约</p>
            <p>1.在租赁期的固定期内，甲乙双方均不得解除本合同。若要解除，视为违约。如甲方违约，甲方将赔偿给乙方相当于租房押金的违约金。如乙方违约，乙方除付清解除合同时应付款项外，甲方有权没收乙方支付的租房押金作为违约金。</p>
            <p>2.合同签订后，租赁期开始前由于乙方的原因解除合同，乙方须向甲方偿付相当于已缴纳租房押金额的违约金和其他补偿。</p>
            <p class="bold black little-large">第十条：不可抗力</p>
            <p>因自然灾害及不可抗力事件致使房屋的全部或一部分毁坏，导致乙方租赁房屋不能正常使用时，甲方不负赔偿责任，但甲方应协同乙方共同处理善后事宜。</p>
            <p class="bold black little-large">第十一条：通知的义务</p>
            <p>1.甲、乙双方所发的通知均采用书面形式。</p>
            <p>2.乙方的联系方式若发生变更时，须及时直接书面通知甲方。</p>
            <p>3.双方理解相互配合的重要意义，在本合同到期前的一个月内，乙方理解并同意甲方在该租赁期间可以带看该套房屋，而且会尽力配合好甲方的工作。</p>
            <p class="bold black little-large">第十二条：租赁房屋的归还</p>
            <p>1.合同终止时，乙方应将租赁房屋属于乙方所有的一切物品(包括装修、各类设备)全部撤出，使租赁房屋恢复原状，经甲方验收后归还甲方。</p>
            <p>2.租赁房屋归还给甲方后，乙方若仍有物品遗留在租赁房屋内，则视为乙方丢弃物品，甲方可自由处置。</p>
            <p>3.合同终止时，乙方如不能将租赁房屋及时归还，甲方除没收乙方的租房押金外，乙方还必须赔偿甲方的所有直接和间接损失。</p>
            <p class="bold black little-large">第十三条：违约事件</p>
            <p>乙方违约事件发生后，甲方无论收取租金或其他费用与否，都会追究乙方违约责任的权利，乙方未按合同规定付足租金或其他费用，甲方有权要求乙方对不足部分继续履行支付的义务，也有按本合同法律规定采取其他措施的权利。</p>
            <p class="bold black little-large">第十四条：陈述</p>
            <p>本合同是在甲、乙双方完全自愿基础上签订的，定约前所有的议案、约束，声明均无效。</p>
            <p class="bold black little-large">第十五条：争议的解决</p>
            <p>甲、乙双方在执行本合同的过程中发生争议时，由双方友好协商解决；协商不成，应向该房屋所在地的中华人民共和国法院提出诉讼。</p>
            <p class="bold black little-large">第十六条：法律依据</p>
            <p>本合同受中华人民共和国的法律管辖。</p>
            <p class="bold black little-large">第十七条：附件</p>
            <p>本合同如有补充协议，与本合同具有同等法律效力。若补充协议与本合同有冲突，以补充协议为准。</p>
            <p class="bold black little-large">第十八条：未尽事宜</p>
            <p>未尽事宜，由甲、乙双方协商解决。所签订的补充协议与本合同具有同等法律效力，并作为本合同之附件。</p>
            <p class="bold black little-large">第十九条：效用</p>
            <p>本合同自甲、乙双方签订之日起生效，一式贰份，甲乙双方各执一份。</p>
            <p class="bold black little-large">第二十条：甲方指定收款方式</p>
            <p>甲乙双方共同同意，乙方必须通过盈家生活APP方式的方式向甲方支付任何本合同项下的租金或其他费用</p>
            <p class="bold black little-large">第二十一条：乙方联系方式</p>
            <div>
                1. 户籍地址：<span name="tenantsInfoId_addredss">{{data.tenantsInfo.address}}</span>
                <p>联系电话：<span name="tenantsInfo_mobile">{{data.tenantsInfo.mobile}}</span></p>
                <p>紧急联系人：<span name="tenantsInfo_contactName">{{data.tenantsInfo.contactName}}</span> </p>
                <!--<p>紧急联系人关系：<span name="tenantsInfo_contactRelationship"></span></p>-->
                <p>2.退款指定银行账户：<span name="tenantsInfo_bankAccount">{{data.tenantsInfo.bankAccount}}</span> </p>
                <p>开户行：<span name="tenantsInfo_bankName">{{data.tenantsInfo.bankName}}</span> </p>
                <p>户名：<span name="tenantsInfo_name">{{data.tenantsInfo.name}}</span> </p>
                <p>如果乙方上述信息有变更，应不少于30天内通知甲方。</p>
                <!--<h5>(以下无正文)</h5>
                <p>甲方：</p>
                <p>代表签署：</p>
                <p>日期：</p>
                <br />
                <p>乙方：</p>
                <p>代表签署：</p>
                <p>日期：</p>-->
            </div>
            <!--<p name="supplement"></p>-->
        </section>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      
    }
  },
  props: {
    data: null
  },
  computed: {
    houseAddress: function () {
      return this.data.landlordHouse.roomProvince + this.data.landlordHouse.roomCity + this.data.landlordHouse.roomCounty + this.data.landlordHouse.roomAddress + this.data.landlordHouse.areaName + this.data.landlordHouse.roomCode
    },
    leaseTime: function () {
      return this.data.leaseStartTime.split(' ')[0].replace('-','年').replace('-','月')+'日 至 ' + this.data.leaseEndTime.split(' ')[0].replace('-','年').replace('-','月') + '日'
    }
  }
}
</script>

<style scoped>
    .flow {
        margin-top: .21rem;
        display: flex;
        display: -webkit-flex;
        flex-flow: row;
        -webkit-flex-flow: row;
        width: 100%;
        height: 5.33rem;
        background-color: #fff;
        justify-content: space-around;
        -webkit-justify-content: space-around;
        align-items: center;
        -webkit-align-items: center;
    }
    .flow > div {
        width:2.2rem;
        text-align: center;
    }
    img {
        width:1.91rem;
        height:1.91rem;
    }
    img + span {
        font-size: .5rem;
    }
    .line {
        width:1.5rem;
        height:.33rem;
    }
    .line0 {
        background: url("../assets/img/SignLine0.png") no-repeat 100% 100%;
    }
    .lineHalf {
        background: url("../assets/img/SignLineHalf.png")no-repeat 100% 100%;
    }
    .line1 {
        background: url("../assets/img/SignLine1.png")no-repeat 100% 100%;
    }
    .body {
        flex:1;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
    h2 {
        font-size:.83rem;
    }
    .main {
        margin-top:.21rem;
        padding:.75rem;
        background-color: white;
    }
    .bold {
        font-weight: bold;
    }
    .black {
        color:#212121 !important;
    }
    .little-large {
        font-size: .625rem;
    }
    .main > * {
        font-size: .58rem;
        line-height: 1rem;
        color:#606060;
    }
    p > span {
        font-weight: normal;
    }
</style>
