<template>
    <div>
        <div class="welcome-page" v-if="!isExceptions">
            <div class="header__account header__account--active">
                <div class="header__account-back" @click="$emit('toStart', true)">
                    <svg width="10" height="10" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9683 1.30187C11.2533 0.586875 10.0983 0.586875
                         9.38332 1.30187L0.968318 9.71688C0.253318 10.4319 0.253318 11.5869 0.968318 12.3019L9.38332 20.7169C10.0983 
                         21.4319 11.2533 21.4319 11.9683 20.7169C12.6833 20.0019 12.6833 18.8469 11.9683 18.1319L4.85498 11.0002L11.9683
                          3.88688C12.6833 3.17188 12.665 1.99854 11.9683 1.30187Z" fill="#6e7191"/>
                    </svg>
                </div>
                <div>Account settings</div>
            </div>
            <div class="account-body">
                <div class="account-body__item">
                    <div class="account-body__item-title">Language</div>
                    <div class="account-body__item-value">
                        <select v-model="selectLanguage" @change="setLang">
                            <option class="disabled" value="">{{checkLanguage}}</option>
                            <option>English US</option>
                            <option>English UK</option>
                            <option>English AU</option>
                            <option>German DE</option>
                            <option>German DE-AT</option>
                            <option>French</option>
                            <option>Italian</option>
                            <option>Spanish</option>
                            <option>Chinese</option>
                            <option>Danish</option>
                            <option>Dutch</option>
                            <option>Finnish</option>
                            <option>Japanese</option>
                            <option>Korean</option>
                            <option>Norwegian</option>
                            <option>Polish</option>
                            <option>Portuguese</option>
                            <option>Swedish</option>
                            <option>Turkish</option>
                        </select>
                    </div>
                </div>
                <div class="account-body__item">
                    <div class="account-body__item-title">Account</div>
                    <div class="account-body__item-value">{{userName}}</div>
                </div>
                <div class="account-body__item">
                    <div class="account-body__item-title">Exceptions</div>
                    <div class="account-body__item-value account-body__item-exceptions"
                        @click="isExceptions = true"
                    >{{exceptionsQtty}} words were excluded</div>
                </div>
                <div class="account-body__item">
                    <div class="account-body__item-title">License</div>
                    <div class="account-body__item-value">
                        <div v-if="!license && !basicMode" 
                            class="free-trials">
                            Free trial ({{freeTrialsUI}} checks left)
                        </div>
                        <div v-if="basicMode" 
                            class="free-trials">
                            Basic ({{freeTrialsUI ? freeTrialsUI : 0}} check per day)
                                <svg width="10" height="10" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.96 22.9999H23.04C25.0933 22.9999 26.3733 20.7732 25.3467 18.9999L15.3067 1.65324C14.28 -0.120091 11.72 -0.120091 10.6933 1.65324L0.653332 18.9999C-0.373334 20.7732 0.906666 22.9999 2.96 22.9999ZM13 13.6666C12.2667 13.6666 11.6667 13.0666 11.6667 12.3332V9.66658C11.6667 8.93324 12.2667 8.33324 13 8.33324C13.7333 8.33324 14.3333 8.93324 14.3333 9.66658V12.3332C14.3333 13.0666 13.7333 13.6666 13 13.6666ZM14.3333 17.9999C14.3333 18.5522 13.8856 18.9999 13.3333 18.9999H12.6667C12.1144 18.9999 11.6667 18.5522 11.6667 17.9999V17.3332C11.6667 16.781 12.1144 16.3332 12.6667 16.3332H13.3333C13.8856 16.3332 14.3333 16.781 14.3333 17.3332V17.9999Z" fill="#FF8C00"/>
                                </svg>
                        </div>
                        <div v-if="license && license.success" class="free-trials">
                            Pro {{license.purchase.recurrence}} 
                            <!-- (till {{licenseOffDate}}) -->
                        </div>
                        <textarea placeholder="License key" type="text"
                            :class="licenseInputClasses" 
                            v-model="licenseKey" 
                            @keyup.enter="checkLicense"></textarea>
                        <div class="license-error">{{licenseStatusMessage}}</div>
                        <a v-if="!licenseKey" href="https://figm8.gumroad.com/l/speller" target="_blank" class="get-license">Get License Key</a>
                        <a :class="useKeyClasses" class="get-license get-license__use" @click="checkLicense">Use License Key</a>
                        <div v-if="license && license.success && licenseKey" class="key-actions">
                            <a class="get-license" 
                                v-clipboard:copy="licenseKey"
                                v-clipboard:success="successCopy"
                            >Copy Key</a>
                            <a class="get-license" href="https://figm8.gumroad.com/l/speller" target="_blank">
                                Upgrade
                            </a>
                        </div>
                        
                    </div>
                </div>
                <div class="account-body__item">
                    <div class="account-body__item-title">Contact us</div>
                    <div class="account-body__item-value">figm8help@gmail.com</div>
                </div>
            </div>
            <footer>
                <div :class="footerClasses">Copied</div>
                <div class="made-ua">
                    <p>Made with </p> 
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 66.911 66.911" style="enable-background:new 0 0 66.911 66.911;" xml:space="preserve">
                    <path style="fill:#E34326;" d="M66.911,22.831c0-10.563-8.558-19.122-19.118-19.122c-5.658,0-10.721,2.473-14.223,6.377
                        c-0.037,0.043-0.076,0.085-0.113,0.128c-3.5-3.98-8.618-6.505-14.334-6.505C8.561,3.709,0.005,12.268,0,22.831
                        c0,5.834,2.629,11.059,6.758,14.565H6.751l27.104,25.806l26.308-25.806h-0.012C64.279,33.89,66.911,28.669,66.911,22.831z"/>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                </svg>
                <p> in Ukraine</p>
                </div>
            </footer>
        </div>
        <Exceptions v-if="isExceptions" v-on:toAccount="toAccount" />
    </div>
</template>

<script>
import { handleEvent } from '../uiMessageHandler';
import { dispatch } from '../uiMessageHandler';
import Exceptions from './exceptions.vue';
export default {
    data() {
        return {
            userName: '',
            exceptions: 0,
            licenseKey: null,
            freeTrials: null,
            isExceptions: false,
            selectLanguage: '',
            licenseStatusMessage: '',
            license: null,
            licenseInputClasses: 'free-trials-input',
            basicMode: false,
            isLicenseKey: false,
            footerClasses: '',
            useKeyClasses: ''
        }
    },
    components: {
        Exceptions
    },
    props: ['checkLanguage', 'freeTrialsUI', 'licenseOffDate'],
    mounted() {
        dispatch('getUser');
        dispatch('getUserExceptions');
        dispatch('checkLicenseStatus');
        dispatch('getUserLang');

        handleEvent('userNameHandler', value => this.userName = value);
        handleEvent('exceptions', value => this.exceptions = value);
        handleEvent('setLicense', value => {
            this.licenseKey = value.key;
            this.license = value.license;
        });
        handleEvent('getFreeTrials', (data) => {
            this.freeTrials = data;
            if(data == 0) {
                this.$emit('offUserLicense', 0);
            }  
        });
        handleEvent('getUserLang', (data) => {
            data ? this.selectLanguage = data : this.selectLanguage = 'English US';
        }); 
        handleEvent('licenseKeyStatus', value => {
            if(typeof(value) === 'string') {
                this.licenseStatusMessage = value;
                this.licenseInputClasses = 'free-trials-input free-trials-input--err';
            } else {
                this.license = value;
                this.useKeyClasses = '';
                if(!value.success) this.useKeyClasses = 'active';
            };
        });
        handleEvent('licenseStatus', value => {
            if(typeof(value) === 'string') {
                this.licenseStatusMessage = value;
                this.licenseInputClasses = 'free-trials-input free-trials-input--err';
            } else {
                this.license = value;
                this.licenseKey = value.purchase.license_key;
                if(!value.success) this.useKeyClasses = 'active';
            };
        });
        handleEvent('setFreeTrials', value => {
            this.freeTrials = value;
            if(value == 0) {
                this.$emit('offUserLicense', 0);
            } else if(value == 1) {
                this.$emit('offUserLicense', 1);
            }
        });
    },
    computed: {
        exceptionsQtty()  { 
            if(this.exceptions) {
                return this.exceptions.length;
            } else return 0;
        },
    },
    methods: {
       toAccount() {
           this.isExceptions = false;
       },
       checkLicense() {
           dispatch('checkLicenseKey', this.licenseKey);
       },
       successCopy() {
           this.footerClasses = 'active';
           setTimeout(() => this.footerClasses = '', 2000);
       },
       setLang() {
           dispatch('setUserLang', this.selectLanguage);
       }
    },
    watch: {
        selectLanguage(val) {
            this.selectLanguage = val;
            this.$emit('setCheckLanguage', val);
        },
        license: function(val) {
            if(this.license && !val.success) {
                this.licenseStatusMessage = 'There is some issue with this key. Please try to check key, or contact us by the email below.';
                this.licenseInputClasses = 'free-trials-input free-trials-input--err';
            } else {
                this.licenseStatusMessage = '';
                this.licenseInputClasses = 'free-trials-input';
                this.isLicenseKey = null;
                this.basicMode = false;
            }
        },
        freeTrials(val) {
            if(val == 1 || val == 0) {
                this.basicMode = true;
                dispatch('checkLastUseDate');
            } 
        },
        licenseKey(value) {
            if(value && !this.license || this.license.purchase && value != this.license.purchase.license_key) {
                this.useKeyClasses = 'active';
            };
            if(value) {
                this.isLicenseKey = true;
            };
            if(!value) {
                this.isLicenseKey = false;
                this.license = null;
                this.licenseStatusMessage = '';
                this.licenseInputClasses = 'free-trials-input';
                this.useKeyClasses = '';
            };
          
        }, 
    }
}
</script>

<style lang="scss" scoped>
@import "../figma-ui/figma-plugin-ds";

.header__account.header__account--active {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    margin: 0 -8px;
    padding: 2px 0 10px 8px;
    font-size: 13px;
    border-bottom: 1px #e5e5e5 solid;
    color: #202223;
    .header__account-back {
        margin: 0 10px 0 5px;
        cursor: pointer;
    }
}
.account-body {
    width: 100%;
    height: calc(100% - 55px);
    padding: 20px 0;
    &__item {
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        padding: 8px 0;
        color: #4E4B66;
        font-size: 14px;
        &-title {
            padding: 2px 5px;
            font-weight: 500;
            font-size: 13px;
            width: 40%;
            min-width: 40%;
        }
        &-value {
            width: 100%;
            padding-right: 5px;
            font-family: Outfit;
            font-weight: 300;
            font-size: 12px;
            select {
                appearance: none;
                width: 100%;
                overflow: hidden;
                background: url('../figma-ui/icons/select.png') no-repeat right;
                background-size: 5%;
                background-position-x: calc(100% - 10px);
                padding: 7px 5px;
                border-color: #e5e5e5;
                border-radius: 3px;
                background-color: transparent;
                color: #4E4B66;
                font-family: Outfit;
                font-size: 12px;
                
                &:focus-visible {
                    outline-color: #e5e5e5;
                }
                option {
                    color: #4E4B66;
                    font-size: 12px;
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
            .free-trials {
                margin-bottom: 5px;
            }
            .free-trials-input {
                margin-bottom: 5px;
                border: 1px solid #e5e5e5;
                padding: 7px;
                border-radius: 3px;
                width: 100%;
                font-size: 11px;
                font-family: Outfit !important;
                &:focus-visible {
                    outline-color: #e5e5e5;
                }
                &--err:focus-visible {
                    outline-color: #ED6A61;
                }
            }
        }
        &-exceptions {
            text-decoration: underline;
            cursor: pointer;
        }
    }
}
a.get-license {
    cursor: pointer;
    color: #008CFF;
    font-weight: 400;
    font-size: 12px;
    background-color: transparent;
    border: none;
    text-decoration: none;
    &:hover {
        font-weight: 500;
    }
    &__use {
        display: none;
        &.active {
            display: block;
            margin: 5px 0;
        }
    }
}
option.disabled {
    display: none;
}
.license-error {
    color: #ED6A61;
    font-size: 12px;
}
footer {
    text-align: center;
    color: #7DB94B;
    font-size: 12px;
    & > div {
        display: none;
        &.active {
            display: block;
        }
    }
    .made-ua {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        min-height: 20px;
    }
    p {
        margin: 0;
        color: #6E7191;
        font-size: 11px;
    }
}
.key-actions {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
}
.header__account-back:hover {
    cursor: pointer;
    svg path {
        fill: #4E4B66;
    }
}
footer svg {
    width: 13px;
    height: 13px;
    margin: 0 2px;
}
</style>