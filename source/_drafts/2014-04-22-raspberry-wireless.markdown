title: raspberry-wireless
date: 2014-04-22 00:19:21
updated: 2014-04-22 00:19:21
comments: true
comment: true
categories: 生命在于折腾
tags: 树莓派
slug: raspberry-wireless

---
apt-get install wireless-tools



树莓派虽然已经有了有线网卡，但是并未配置无线网卡，移动性不够强，好在机器配备了2个USB口，当然要分一个出来给WIFI无线网卡使用了，这样小派使用起来就更便利了！
我手头有个NetCore磊科NW336无线网卡，非常便宜的那种，好像芯片是Realtek的，插入USB口试试，发现网卡上的指示灯会闪烁，感觉有戏，马上登陆系统折腾：
（一）查看USB设备类型，寻找USB无线网卡是否已经被系统识别。运行lsusb
pi@raspberrypi ~ $ lsusb
Bus 001 Device 002: ID 0424:9512 Standard Microsystems Corp.
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 003: ID 0424:ec00 Standard Microsystems Corp.
Bus 001 Device 004: ID 0bda:8176 Realtek Semiconductor Corp. RTL8188CUS 802.11n WLAN Adapter 《=========
恭喜，我的USB无线网卡竟然已经被正常识别了！

（二）查看内核模块是否支持你的无线网卡。运行lsmod
pi@raspberrypi ~ $ lsmod
Module Size Used by
snd_bcm2835 15846 0
snd_pcm 77560 1 snd_bcm2835
snd_seq 53329 0
snd_timer 19998 2 snd_pcm,snd_seq
snd_seq_device 6438 1 snd_seq
snd 58447 5 snd_bcm2835,snd_timer,snd_pcm,snd_seq,snd_seq_device
snd_page_alloc 5145 1 snd_pcm
leds_gpio 2235 0
led_class 3562 1 leds_gpio
8192cu 489381 0 《========
恭喜，我的无线网卡对应的内核模块已经自动加载了。

（三）查看无线设备配置,运行iwconfig

pi@raspberrypi ~ $ iwconfig
wlan0 unassociated Nickname:”<WIFI@REALTEK>”
Mode:Managed Frequency=2.412 GHz Access Point: Not-Associated
Sensitivity:0/0
Retry:off RTS thr:off Fragment thr:off
Power Management:off
Link Quality:0 Signal level:0 Noise level:0
Rx invalid nwid:0 Rx invalid crypt:0 Rx invalid frag:0
Tx excessive retries:0 Invalid misc:0 Missed beacon:0

lo no wireless extensions.

eth0 no wireless extensions.

（四）配置网络界面设置
利用vi命令或者nano命令编辑/etc/network/interfaces文件内容，最好确保文件内容如以下显示一样。

auto lo
iface lo inet loopback

iface eth0 inet dhcp

auto wlan0
allow-hotplug wlan0
iface wlan0 inet manual
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
iface default inet dhcp

如果你不想设置为Dhcp动态IP，也可以设置静态IP，则文件内容如下：
auto lo
iface lo inet loopback

iface eth0 inet dhcp

allow-hotplug wlan0
iface wlan0 inet manual
address 192.168.1.100
netmask 255.255.255.0
gateway 192.168.1.1
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf

（五）配置无线网卡设置文件
编辑/etc/wpa_supplicant/wpa_supplicant.conf文件，确保内容如下：
注意主要修改IFI接入点名称和WIFI接入密码。

network={
ssid=”WIFI接入点名称”
proto=RSN
key_mgmt=WPA-PSK
pairwise=CCMP TKIP
group=CCMP TKIP
psk=”WIFI接入密码”
}



如果想配置无线网络，可以将这个文件修改为：
auto lo
iface lo inet loopback
iface eth0 inet dhcp
auto wlan0
allow-hotplug wlan0
iface wlan0 inet dhcp
wpa-ssid “无线路由ID”
wpa-psk “无线路由密码”
重启网络：