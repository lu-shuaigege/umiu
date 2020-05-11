<template>
	<view class="my-wallet-withdraw">
		<view class="my-wallet-withdraw-card">
			<view class="flex-horizontal-start card-item item-money">
				<view>提现金额</view>
				<view>（提现金额不少于￥100.00）</view>
			</view>
			<view class="flex-horizontal-start card-item item-input">
				<view class="title">￥</view>
				<input placeholder="0" type="number" @input="inputAmount" v-model="card.amount"/>
			</view>
			<view class="flex-horizontal-between card-item item-operate">
				<view class="flex-horizontal-start money-operate-text">
					<view class="mr20">可用余额</view>
					<view>{{withdrawal}}元</view>
				</view>
				<view class="money-operate-btn" @click="withdrawalAll">全部提现</view>
			</view>
		</view>
		<view class="my-wallet-withdraw-card">
			<view class="flex-horizontal-between card-item-bank">
				<view class="bank-item-label">提现方式</view>
				<view class="bank-item-value bold">银行卡</view>
			</view>
			<view class="flex-horizontal-between card-item-bank">
				<view class="bank-item-label">开户行</view>
				<input  class="bank-item-value" @input="inputBankName" adjust-position="true" placeholder="中国银行"/>
			</view>
			<view class="flex-horizontal-between card-item-bank">
				<view class="bank-item-label">开户名</view>
				<input class="bank-item-value" @input="inputAccountName" adjust-position="true" placeholder="张三"/>
			</view>
			<view class="flex-horizontal-between card-item-bank">
				<view class="bank-item-label">银行卡账号</view>
				<input class="bank-item-value" @input="inputBankAccout" adjust-position="true" type="number" maxlength="23" v-model="card.bank_account" placeholder="1111 1111 1111 1111"/>
			</view>
		</view>
		<view class="my-wallet-withdraw-btn" @click="applyForWithdrawal">申请提现</view>
	</view>
</template>

<script>
	import { getWallet,applyForWithdrawal} from '@/http/api.js';
	export default {
		data() {
			return {
				withdrawal:'',
				card:{
					amount:'',
					bank_name:'',
					account_name:'',
					bank_account:''
				}
			}
		},
		onLoad() {
			this.getWithdrawal()
		},
		onShow() {
			wx.hideHomeButton()
		},
		methods: {
			getWithdrawal(){
				getWallet().then(res=>{
					if(!res.data!=null){
						this.withdrawal=parseFloat(res.data.can_withdrawal).toFixed(2)
					}
				})
			},
			withdrawalAll(){
				this.card.amount=parseInt(this.withdrawal)
			},
			inputBankName(e){
				this.card.bank_name=e.detail.value
			},
			inputAccountName(e){
				this.card.account_name=e.detail.value
			},
			inputBankAccout(e){
				this.card.bank_account=(e.detail.value).replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
			},
			inputAmount(e){
				this.card.amount=e.detail.value
			},
			applyForWithdrawal(){
				if(parseInt(this.card.amount)<100 || this.card.amount==""){
					this.showToast('金额不得少于100')
					return
				}
				if(parseInt(this.card.amount)>this.withdrawal){
					this.showToast('提现金额不得大于余额')
					return
				}
				if(this.isNull(this.card.bank_name)){
					this.showToast('请输入开户行')
					return
				}
				if(this.isNull(this.card.account_name)){
					this.showToast('请输入开户名')
					return
				}
				if(!this.regBankAccount(this.card.bank_account)){
					this.showToast('请输入正确的银行卡账号')
					return
				}
				// this.regBankAccount(this.card.bank_account,'请输入正确的银行卡账号')
				applyForWithdrawal(this.card).then(res=>{
					if (res.data!=null){
						let balance=this.withdrawal-this.card.amount
						uni.navigateTo({
							url:'/pages/my/myWallet/withdraw/status/myWalletWithdrawSuccess?amount='+this.card.amount+'&balance='+balance
						})
					}else{
						uni.navigateTo({
							url:'/pages/my/myWallet/withdraw/status/myWalletWithdrawFailed'
						})
					}
				})
			},
			showToast(str){
				uni.showToast({
					title:str,
					icon: 'none'
				})
			},
			//判断输入是否为空
			isNull(str){
				return str.split(" ").join("").length === 0
			},
			regBankAccount(str){
				let account=str.split(" ").join("")
				let regExp= /^([1-9]{1})(\d{15}|\d{18})$/
				return regExp.test(account)&&account.length>0
			}
		}
	}
</script>

<style>
@import url('myWalletWithdraw');
</style>
