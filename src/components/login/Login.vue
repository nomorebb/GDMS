<template>
  <div class="login-panel" @keyup.enter="doLogin">
  
    <div class="openup" id="openup" :class="{'opened':isLoginPanel}">
    <wyvonj-canvas></wyvonj-canvas>
      <header class="header">
        <img width="110" height="110" src="../../assets/img/gd_logo.png" alt="GDMS">
        <h1 class="headline">毕业设计管理系统</h1>
      </header>
      <div class="open-button" :class="{'opened':isLoginPanel}">
        <mu-circular-progress :size="70" color="red" v-if="isProgressbar"/>
        <div class="login-outer" @click="openLoginPanel" v-if="!isLoginOpen">
          Login
        </div>
        <section class="login-container" v-if="isLoginPanel">
          <div class="login-inner">
            Login
          </div>
          <div class="input-items">
            <mu-text-field label="帐号" hintText="请输入帐号" :errorText="errorAccount" v-model.trim="account" labelFloat/>
            <br/>
            <mu-text-field label="密码" hintText="请输入密码" type="password" :errorText="errorPassword" v-model.trim="password" labelFloat/>
            <mu-raised-button label="登 录" class="login-button" v-on:click="doLogin" />
          </div>
          <div class="pw-forget">忘记密码？
            <wyvonj-tooltip>
              <p class="pw-forget-content">学生初始密码都为学号，<br/>如果修改密码后忘记密码，<br/>请咨询管理员修改密码。</p>
            </wyvonj-tooltip>
          </div>

          
        </section>
      </div>
    </div>
    <wyvonj-footer></wyvonj-footer>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import WyvonjCanvas from '../utils/WyvonjCanvas.vue'
import WyvonjFooter from '../utils/WyvonjFooter.vue'
export default {
  data() {
      return {
        isLoginPanel: false,
        isLoginOpen: false,
        isForgot: false,
        account: '',
        password: '',
        errorAccount: '',
        errorPassword: ''
      }
    },
    computed: {
      ...mapState(['user', 'isProgressbar'])
    },
    components: {
      WyvonjFooter,
      WyvonjCanvas
    },
    methods: {
      openLoginPanel() {
        this.isLoginOpen = true
        this.isLoginPanel = true
      },
      //登录方法
      doLogin() {
        lg(this.account)
        if (!this.account.length) 
          return this.errorAccount = '请输入帐号！'
        if (!this.password.length) 
          return this.errorPassword = '请输入密码！'
        this.isLoginPanel = false
        this.progressbarStart()
        window.setTimeout(() => {
          this.login({ 
            account: this.account, 
            password: this.password 
          })
          .then(() => {
            this.progressbarStop()
              let date = new Date(Date.now() + 60000 * 30)
              let usertype=this.user.usertype
              cookie.set('user', this.account, date, '/', location.hostname)
              cookie.set('username',this.user.username , date, '/', location.hostname)
              cookie.set('usertype',usertype , date, '/', location.hostname)
              this.GET('/getstep')
                .then(res=>{
                  console.log(res)
                  cookie.set('step',res.data.curstep,date,'/',location.hostname)
                })
              if (this.user.isFirstLogin) {
                if (usertype < 2) {
                  this.$router.push('/entryinformation')
                } else if (usertype === 2) {
                  this.$router.push( '/admin')
                }
              } else {
                if (usertype === 0) {
                  this.$router.push('/student')
                } else if (usertype === 1) {
                  this.$router.push('/teacher')
                } else if (usertype === 2) {
                  this.$router.push('/admin')
                }
              }
            })
            .catch((error) => {
              this.isLoginPanel = true
              this.progressbarStop()
              switch (error) {
                case 0:
                    this.errorAccount = '找不到该账号'
                    break
                case 2:
                    this.errorPassword = '密码错误'
                    break
                case 3:
                default:
                  this.errorAccount = '未知错误，请重试'
              }
            })
        }, 300)
      },
      errorClear() {
        this.errorAccount = ''
        this.errorPassword = ''
      },
      ...mapActions(['login', 'progressbarStart', 'progressbarStop','getCurrentStep'])
    },
    watch: {
      account: 'errorClear',
      password: 'errorClear'
    },
    mounted() {
      this.getCurrentStep()
    }
}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import "../../style/variables.scss";
.canvas{
  width: 100vw;
  height: 50vh;
}
.login-panel
{
    position: relative;

    width: 100%;
    height: 100vh;

    background-color: #efefef;
    .input-items{
      position: relative;
      height: 218px;
    }
    .openup
    {
        position: absolute;
        z-index: 100;
        top: 0;

        width: 100%;
        height: 50%;

        transition: $material-enter;

        background-color: #3f51b5;
        -webkit-box-shadow: $material-shadow-4dp;
           -moz-box-shadow: $material-shadow-4dp;
                box-shadow: $material-shadow-4dp;
        &.opened
        {
            border-radius: 0;
        }
        .open-button
        {
            position: fixed;
            top: calc(50% - 45px);
            left: calc(50% - 128px);

            width: 256px;
            height: 90px;

            transition: $material-enter;

            border-radius: 45px;
            background-color: #fff;
            -webkit-box-shadow: $material-shadow-4dp;
               -moz-box-shadow: $material-shadow-4dp;
                    box-shadow: $material-shadow-4dp;
            &.opened
            {
                top: calc(50% - 128px);

                height: 256px;

                border-radius: 4px;
            }
        }
    }
    header
    {
        position: absolute;
        bottom: 156px;
        left: calc(50% - 305px);

        width: 610px;
        cursor: default;
        -webkit-user-select:      none;
           -moz-user-select: -moz-none;
            -ms-user-select:      none;
                user-select:      none;

        -khtml-user-select: none;
    }
    .headline
    {
        font-size: 60px;
        font-weight: lighter;
        line-height: 60px;

        overflow: hidden;

        width: 100%;
        margin: 0 auto;
        padding-right: 6px;

        transition: $swift-ease-out;
        /* animation: typing 2s steps(10,end),
        blink-caret.5s step-end 10 alternate;
        border-right: .1em solid;*/
        white-space: nowrap;

        color: #fff;
        @media (max-width:993px){
          font-size: 40px;
        }
    }
    .login-outer
    {
        font-size: 40px;

        padding-top: 14px;

        cursor: pointer;

        height: 90px;
        color: #a7a7a7;

        font-variant: small-caps;
    }
    .login-inner
    {
        font-size: 24px;

        margin-top: 20px;

        color: #b7b7b7;

        font-variant: small-caps;
    }
    .mu-circular-progress
    {
        margin-top: 10px;
    }
    section.login-container
    {
      height: 100%;
        position: relative;
        .mu-text-field
        {
            font-size: 14px;

            width: 200px;
            margin-bottom: 0;
        }
        .login-button
        {
            font-size: 16px;

            position: absolute;
            bottom: 0;
            left: 48px;

            width: 160px;
            height: 36px;
            word-spacing: 16px;

            color: #fff;
            border-radius: 36px;
            background-color: $red;
        }
        .pw-forget
        {
            font-size: 11px;

            position: absolute;
            right: -10px;
            bottom: -40px;

            cursor: pointer;
            &:hover
            {
                color: #e53935;
            }
        }
        
    }
}
.wyvonj-tooltip{
          font-size: 14px;
          padding: 8px;
          background-color: rgba(0,0,0,.64);
          color: white;
        }
</style>