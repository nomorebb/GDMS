<template>
  <div class="account-container">
    <div>
      <div class="message-container" :class="{'warning':warningMsg.length>0,'success':success}">
        {{warningMsg}}
      </div>
      <div class="addon-input">
        <span class="input-addon">
            <i class="material-icons">lock</i>
          </span>
        <input placeholder="请输入原密码" type="password" v-model.trim="original" />
      </div>
      <div class="addon-input">
        <span class="input-addon">
            <i class="material-icons">lock_outline</i>
          </span>
        <input placeholder="请输入新密码" type="password" v-model.trim="password" />
      </div>
      <div class="addon-input">
        <span class="input-addon">
            <i class="material-icons">lock_outline</i>
          </span>
        <input placeholder="请再输入一遍新密码" type="password" v-model.trim="passwordRepeat" />
      </div>
       <mu-raised-button class="update" @click="commitPassword" backgroundColor="blue" label="确认更改"/>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex'
import WyvonjCanvas from '../utils/WyvonjCanvas.vue'
export default {
  data() {
      return {
        original: '',
        password: '',
        passwordRepeat: '',
        warningMsg: '',
        success: false
      }
    },
    methods: {
      commitPassword() {
        if (this.original.length < 1)
          return this.warningMsg = '请输入原密码'
        if (this.password.length < 8)
          return this.warningMsg = '新密码长度不够'
        if (this.password !== this.passwordRepeat) {
          return this.warningMsg = '两次输入的密码不一样'
        } else if (true){
          let acc = cookie.get('user')
          if (!acc) {
            return this.warningMsg = '登录超时，请重新登录再进行操作'
          }
          this.POST('/account', {
              account: acc,
              oldPassword: this.original,
              newPassword: this.password
            })
            .then(res => {
              if (res.data.state === 1) {
                this.success = true
                this.warningMsg = '成功修改密码'
              }else{
                this.warningMsg = '原密码不正确'
              }
            })
        } else {
          return this.warningMsg = '密码包含非法字符'
        }
      },
      clearError() {
        this.warningMsg = ''
        this.success = false
      }
    },
    watch: {
      original: 'clearError',
      passwordRepeat: 'clearError',
      password: 'clearError'
    },
    components: {
      WyvonjCanvas
    }
}
</script>


<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';
.account-container
{
    display: flex;

    align-items: flex-start;
    justify-content: center;
    > div
    {
        margin-top: 128px;
    }
    button.update
    {
        width: 300px;
           justify-content:center;

            height: 48px;
            font-size: 18px;
    }
}

</style>