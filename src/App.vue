<template>
<div style="">
  <el-row>
    <el-col type="flex" align="middle" :span="9">
      <div class="camera">
        <vue-web-cam
          ref="RGBCam"
          :device-id="firstDeviceId"
          width="100%"
          @started="onStarted"
          @cameras="onCameras"
        />
      </div>
    </el-col>
    <el-col :span="9">
      <div class="camera">
        <vue-web-cam
          ref="infraredCam"
          :device-id="tailDeviceId"
          width="100%"
          @started="onStarted"
          @cameras="onCameras"
        />
      </div>
    </el-col>
    <el-col :span="6">
      <div class="logarea">
        {{ log }}
      </div>
      <div class="button-area">
        <el-button style="width: 100%; height: 50px;"
                   @click="startCheck" type="primary">验证</el-button>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">
      <h2>Captured Image RGB</h2>
      <figure class="figure">
        <img :src="RGBImg" class="img-responsive"/>
      </figure>
    </el-col>
    <el-col :span="12">
      <h2>Captured Image infrared</h2>
      <figure class="figure">
        <img :src="infraredImg" class="img-responsive"/>
      </figure>
    </el-col>
  </el-row>
</div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      RGBImg: null,
      infraredImg: null,
      deviceId: null,
      devices: [],
      log: '运行结果',
      firstDeviceId: null,
      tailDeviceId: null,
    };
  },
  watch: {
    camera: function(id) {
      this.deviceId = id;
    },
    devices: function() {
      // Once we have a list select the first one
      if (this.devices.length >= 1) {
        let first = this.devices[0];
        this.firstDeviceId = first.deviceId;
      }
      if (this.devices.length >= 2) {
        let tail = this.devices[1];
        this.tailDeviceId = tail.deviceId
      }
    }
  },
  methods: {
    onStarted(stream) {
      console.log("On Started Event", stream);
    },
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },
    startCheck() {
      this.RGBImg = this.$refs.RGBCam.capture();
      this.infraredImg = this.$refs.infraredCam.capture();
    }
  }
};
</script>

<style>
.container {
  height: 100vh; 
  width: 100vw; 
  padding: 10px 50px; 
  box-sizing: border-box;
}
.camera {
  padding: 0px 5px; 
  box-sizing: border-box;
}
.logarea {
  margin-top: 0px;
  height: 500px;
  border-width: 2px;
  border-color: rgb(75, 73, 71);
  border-style: solid;
  font-size: 1.2em;
  /* padding: 10px; */
  box-sizing: border-box;
  overflow: auto;
  white-space: pre-wrap;
}
.button-area {
  padding: 10px 0px; 
  box-sizing: border-box;
}
</style>