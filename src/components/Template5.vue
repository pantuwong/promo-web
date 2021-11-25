<template>
    <v-container fill-height fluid>
        <v-row no-gutters justify="space-around">
            <v-col cols="12" md="6" lg="6" xl="6" class="d-flex justify-center" >
                <div id="imageDom" ref="imageDom" class="box-custom-image2">
                    <img id="imgFood" ref="imgFood" src="../assets/template5-back.png" height="600" width="600" class="image-food">
                    <div class="content-top">
                        <img id="imgGradient" ref="imgGradient" src="../assets/blackGradient.png"  class="gradient" />
                        <img ref="imgTopLeft" src="../assets/template1-top-left.png"  class="top-left" />
                        <img ref="qr" :src="qr" class="qr">
                        <img ref="imgTopLeft" src="../assets/template5-top-right.png"  class="top-right" />
                    </div>
                    <div class="content-bottom">
                        <img id="imgBottomRight" ref="imgBottomRight" src="../assets/template4-bottom-right.png"  class="bottom-right" />
                        <div class="restaurantName">{{restaurantName}}</div>
                        <div class="caption-menu">{{caption}}</div>
                    </div>
                </div>
            </v-col>
            <v-col cols="12" md="6" lg="6" xl="6"  class="d-flex justify-center">
                <div class="parent">
                    <div class="div1">
                        <v-btn class="white--text" width="100%" color="#d70f64" @click="uploadClick()">{{ uploadText }}</v-btn>
                        <input
                            ref="uploader"
                            class="d-none"
                            type="file"
                            accept="image/*"
                            @change="onFileChanged"
                        >
                    </div>
                    <div class="div2">
                        <v-text-field ma-2 v-model="restaurantName" label="ชื่อร้าน" ></v-text-field>
                    </div>
                    <div class="div3">
                        <v-text-field ma-2 v-model="caption" label="ข้อความ caption" ></v-text-field>
                    </div>
                    <div class="div4">
                        <v-btn class="white--text" color="#d70f64" style="width:100%;" @click="back()">ย้อนกลับ</v-btn>
                    </div>
                    <div class="div5">
                        <v-btn href="/files/FPD_Promote_Store_Hot.ai" class="white--text" color="#d70f64" style="margin-right:5px; margin-left:5px; width:100%;" @click="downloadAI()">ดาวน์โหลด Ai</v-btn>
                    </div>
                    <div class="div6">
                        <v-btn v-if="isSaving" loading ref="save_pic" class="white--text" style="width:100%;" color="#d70f64" @click="toImage()">บันทึกรูปภาพ</v-btn>
                        <v-btn v-else ref="save_pic" class="white--text" style="width:100%;" color="#d70f64" @click="toImage()">บันทึกรูปภาพ</v-btn>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapActions, mapState} from "vuex";
import { toBlob } from 'html-to-image';
import { saveAs } from 'file-saver';
import axios from 'axios';
const qr = require("qrcode");
export default {
    name: "Template5",
    data: () => ({
        uploadText: 'อัพโหลดรูปภาพ',
        isSaving: false,
        restaurantName: 'ร้านคลีนคุกกี้',
        caption: 'อร่อยถูกใจ ใส่ใจสุขภาพ',
        qr: null,
    }),
    mounted() {
        let url = '';
        if (this.vendorCode === undefined) {
            url = 'https://www.foodpanda.co.th/';
        } else {
            url = `https://www.foodpanda.co.th/restaurant/${this.vendorCode}`
        }
        console.log(url)
        qr.toDataURL(url, (err, src) => {
            if (err) {
                console.log(err)
            } else {
                this.qr = src
            }
        });
    },  
    computed: {
        ...mapState(["vendorCode"]),
    },
    methods: {
        ...mapActions(["setSelectedTemplate"]),
        uploadClick() {
            window.addEventListener('focus', () => {
                this.isSelecting = false
            }, { once: '300px' })
            this.$refs.uploader.click();
        },
        onFileChanged(e) {
            this.uploadText = "เปลี่ยนรูปภาพ";
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files[0]);
            let imageDom = document.getElementById('imageDom');
            let imgFood = document.getElementById('imgFood');
            let imgGradient = document.getElementById('imgGradient');
            let imgBottomRight = document.getElementById('imgBottomRight');
            imageDom.style = "border-radius: 3% !important";
            imgFood.style = "border-radius: 3% !important";
            imgGradient.style = "border-radius: 3% !important";
            imgBottomRight.style = "border-radius: 3% !important"; 
        },
        createImage(file) {
            console.log(qr)
            var reader = new FileReader();
            var vm = this;
            const preview = document.querySelector('img');

            reader.addEventListener("load", function () {
                // convert image file to base64 string
                preview.src = reader.result;
            }, false);

            reader.onload = function (e) {
                vm.image = e.target.result;
            };

            reader.readAsDataURL(file);
        },
        back() {
            this.setSelectedTemplate(null)
        },
        generateImage() {
            return new Promise(resolve => {
                const node = document.getElementById('imageDom');
                toBlob(node)
                    .then((page) => {
                        return resolve(page);
                    })
            })
        },
        toImage() {
            // var isIphone = navigator.userAgent.indexOf("iPhone") != -1;
            // var isIpod = navigator.userAgent.indexOf("iPod") != -1;
            // var isIpad = navigator.userAgent.indexOf("iPad") != -1;
            let imageDom = document.getElementById('imageDom');
            let imgFood = document.getElementById('imgFood');
            let imgGradient = document.getElementById('imgGradient');
            let imgBottomRight = document.getElementById('imgBottomRight');
            imageDom.style = "border-radius: 0% !important";
            imgFood.style = "border-radius: 0% !important";
            imgGradient.style = "border-radius: 0% !important";
            imgBottomRight.style = "border-radius: 0% !important";
            this.isSaving = true;
            this.generateImage().then(() => {
                this.generateImage().then(() => {
                    this.generateImage().then((blob) => {
                        saveAs(blob, 'FPD_Promote_Store_Hot.png');
                        this.isSaving = false;
                    })
                })
            })

            const d = new Date();
            const dateString = d.toISOString().split('T')[0];
            const timeString = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

            let data = JSON.stringify({
                vendor_code: this.vendorCode,
                downloaded_date: dateString,
                downloaded_time: timeString,
                template_name: 'FPD_Promote_Store_Hot'
            });

            let config = {
                method: "post",
                url: `${process.env.VUE_APP_API_URL}/api/log`,
                headers: {
                "Content-Type": "application/json"
                },
                data: data
            };
            axios(config)
                .then(function() {
                    console.log('log success')
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
}
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;600&display=swap);

.v-btn {
    width: 80%;
}
.box-custom-image2 {
  position: relative;
  width: 370px;
  height: 370px;
  background-color: blanchedalmond;
  overflow: hidden;
  perspective: 1px;
  border-radius:3%;
  margin: 0px;
  margin-bottom: 20px;
  padding: 0px;
}

.box-custom-image2 .image-food  {
  position: absolute;
    left: -1000%;
    right: -1000%;
    top: -1000%;
    bottom: -1000%;
    margin: auto;
    width: 370px;
    height: 370px;
  z-index: 9;
  border-radius: 3%;
  -o-object-fit: cover;
     object-fit: cover;
}
.box-custom-image2  .content-top {
    position: relative;
    top: 0px;
    z-index: 999;
}

.box-custom-image2  .content-bottom {
    position: relative;
    bottom: 0px;
    z-index: 9999;
}

.box-custom-image2  .content-top .gradient {
    position: absolute;
    width: 600px;
    margin: 0px;
    border-top-left-radius: 3%;
}

.box-custom-image2  .content-top .top-left {
    position: absolute;
    width: 90px;
    top: 8px;
    left: 8px;
}

.box-custom-image2  .content-top .qr {
    position: absolute;
    left: 62px;
    width: 34px;
    top: 10px;
}

.box-custom-image2  .content-top .top-right {
    position: absolute;
    width: 200px;
    top: 15px;
    right: 10px;
}

.box-custom-image2  .content-top .name {
    position: absolute;
    width: 250px;
    top: 3px;
    right: 10px;
    color: white;
    text-align: right;
    font-family: 'Kanit';
    font-size: 25px;
}
.box-custom-image2  .content-top .branch {
    position: absolute;
    width: 250px;
    top: 30px;
    right: 10px;
    color: white;
    text-align: right;
    font-family: 'Kanit';
    font-size: 14px;
}

.box-custom-image2  .content-bottom .bottom-right {
    position: absolute;
    width: 400px;
    bottom: -370px;
    right: 0px;
    border-bottom-right-radius: 3%;
}

.box-custom-image2  .content-bottom .restaurantName {
    position: absolute;
    width: 300px;
    left: 120px;
    bottom: -320px;
    color: #FFD272;
    text-align: left;
    font-family: 'Kanit';
    font-weight: bold;
    font-size: 35px;
    letter-spacing: 0.05em;
}

.box-custom-image2  .content-bottom .caption-menu {
    position: absolute;
    width: 300px;
    left: 125px;
    bottom: -350px;
    color: #fff;
    text-align: left;
    font-family: 'Kanit';
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 0.05em;
}

.parent {
display: grid;
grid-template-columns: repeat(6, 1fr);
grid-template-rows: repeat(4, 1fr);
grid-column-gap: 0px;
grid-row-gap: 0px;
}

.div1 { grid-area: 1 / 2 / 2 / 6; }
.div2 { grid-area: 2 / 1 / 3 / 7; }
.div3 { grid-area: 3 / 1 / 4 / 7; }
.div4 { grid-area: 4 / 1 / 5 / 2; }
.div5 { grid-area: 4 / 3 / 5 / 5; }
.div6 { grid-area: 4 / 6 / 5 / 7; }
.v-label {
    font-size: 12px !important;
}
</style>
