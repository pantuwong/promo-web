<template>
    <v-container fill-height fluid>
        <v-row no-gutters justify="space-around">
            <v-col md="12" lg="6" class="d-flex justify-center" >
                <div ref="imageDom" class="box-custom-image2">
                    <img ref="imgFood" src="../assets/banner.jpg" height="500" width="500" class="preview">
                </div>
            </v-col>
            <v-col md="12" lg="6" class="d-flex justify-center">
                <v-layout row>
                    <v-btn class="white--text" color="#d70f64" style="width:80%;" @click="uploadClick()">{{ uploadText }}</v-btn>
                    <input
                        ref="uploader"
                        class="d-none"
                        type="file"
                        accept="image/*"
                        @change="onFileChanged"
                    >
                </v-layout>
                <v-layout row>
                    <v-btn class="white--text" color="#d70f64" style="width:40%;" @click="back()">ย้อนกลับ</v-btn>
                    <v-btn ref="save_pic" class="white--text" color="#d70f64" style="width:40%;" @click="toImage()">บันทึกรูปภาพ</v-btn>
                </v-layout>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapActions } from "vuex";
import { toJpeg } from 'html-to-image';
import { saveAs } from 'file-saver';
export default {
    name: "Template1",
    data: () => ({
        uploadText: 'อัพโหลดรูปภาพ'
    }),
    methods: {
        ...mapActions(["setSelectedTemplate"]),
        uploadClick() {
            window.addEventListener('focus', () => {
                this.isSelecting = false
            }, { once: true })
            this.$refs.uploader.click();
        },
        onFileChanged(e) {
            this.uploadText = "เปลี่ยนรูปภาพ";
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files[0]);
            this.$refs.imageDom.style = "border-radius: 3% !important";
            this.$refs.imgFood.style = "border-radius: 3% !important";   
        },
        createImage(file) {

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
        toImage() {
            var isIphone = navigator.userAgent.indexOf("iPhone") != -1;
            var isIpod = navigator.userAgent.indexOf("iPod") != -1;
            var isIpad = navigator.userAgent.indexOf("iPad") != -1;
            console.log(isIphone)
            console.log(isIpod)
            console.log(isIpad)
            if (isIphone || isIpod || isIpad) {
                this.$refs.save_pic.click();
            }
            this.$refs.imageDom.style = "border-radius: 0% !important";
            this.$refs.imgFood.style = "border-radius: 0% !important";   
            let img_sizes = this.$refs.imageDom;
            toJpeg(img_sizes, {
                quality: 0.5,
                canvasWidth: 600,
                canvasHeight: 600
            }).then(function (dataURI) {
                var byteString = atob(dataURI.split(',')[1]);
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                var blob = new Blob([ab], {type: mimeString});
                saveAs(blob, "test.jpg");
            }).catch(function (error) {
                console.log('oops, something went wrong!', error);
            });
        },
        dataURItoBlob(dataURI) {
            // convert base64 to raw binary data held in a string
            // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
            var byteString = atob(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);

            // create a view into the buffer
            var ia = new Uint8Array(ab);

            // set the bytes of the buffer to the correct values
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            // write the ArrayBuffer to a blob, and you're done
            var blob = new Blob([ab], {type: mimeString});
            return blob;

        }
    }
}
</script>
<style scoped>
.preview {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    z-index: 9;
    border-radius: 3%;
    -o-object-fit: cover;
        object-fit: cover;
    opacity: 0.7;
}
.v-btn {
    width: 80%;
}
.box-custom-image2 {
  position: relative;
  width: 500px;
  height: 500px;
  background-color: blanchedalmond;
  overflow: hidden;
  perspective: 1px;
  border-radius:3%;
  margin: 0px;
  padding: 0px;
}
</style>
