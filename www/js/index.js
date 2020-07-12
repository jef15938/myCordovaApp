/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var myApp = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', () => { console.log('cordova deviceready') }, false);
  },

  saySomething: function (text) {
    cordova.plugins.HelloWorld.saySomething(
      text,
      (success) => { alert(success) },
      (error) => { console.error('success: ', error) }
    );
  },

  getBatteryStatus: function () {
    cordova.plugins.HelloWorld.getBattery(
      (success) => {
        console.log('success: ', success);
        document.getElementById("level").innerText = `電量: ${success.level}`;
        document.getElementById("isCharging").innerText = `正在充電: ${!!success.isCharging ? 'Y' : 'N'}`;
      },
      (error) => {
        console.error('error: ', error);
        document.getElementById("level").innerText = '';
        document.getElementById("isCharging").innerText = '';
      }
    );
  }

};

var FirebasePlugin;
var firebase = {

  initialize: function () {
    document.addEventListener('deviceready', () => { this.checkNotificationPermission() }, false);
  },

  checkNotificationPermission: function () {
    FirebasePlugin.hasPermission(hasPermission => {
      if (hasPermission) {
        // Granted
        this.refreshToken();
        this.notificationReceive();
      } else {
        // Denied
        console.error("Notifications won't be shown as permission is denied");
        FirebasePlugin.grantPermission();
      }
    });
  },

  refreshToken: function () {
    FirebasePlugin.onTokenRefresh(token => {
      console.log(token);
      document.getElementById("firebaseToken").innerText = `FirebaseToken: ${token}`;
    });
  },

  notificationReceive: function () {
    FirebasePlugin.onMessageReceived(message => {
      const title = !!message.notification ? message.notification.title : message.title;
      const body = !!message.notification ? message.notification.body : message.body;
      alert(`I got a message!\ntitle: ${title}\nbody: ${body}`);
    });
  }




}

myApp.initialize();
firebase.initialize();