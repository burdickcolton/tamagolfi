/***************************************************************************/
/*                                                                         */
/*  This obfuscated code was created by Javascript Obfuscator Free Version.*/
/*  Javascript Obfuscator Free Version can be downloaded here              */
/*  http://javascriptobfuscator.com                                        */
/*                                                                         */
/***************************************************************************/
var _$_572a=["\x6C\x65\x6E\x67\x74\x68","\x68\x6F\x6C\x65\x4F\x62\x73","\x6F\x62\x6A\x48\x6F\x6C\x65","\x48\x69\x74","\x78","\x79","\x73\x68\x72\x6F\x6F\x6D\x54\x79\x70\x65","\x73\x68\x72\x6F\x6F\x6D\x54\x69\x63\x6B","\x7A","\x62\x61\x6C\x6C\x53\x70\x65\x65\x64","\x53\x65\x74","\x42\x6F\x75\x6E\x63\x65","\x44\x72\x61\x77","\x6B\x61\x62\x6F\x42\x6C\x69\x6E\x6B","\x6B\x61\x62\x6F\x49\x64\x6C\x65","\x6B\x61\x62\x6F\x48\x69\x74","\x53\x74\x6F\x70\x70\x65\x64","\x6F\x62\x73\x4B\x61\x62\x6F","\x62\x61\x6C\x6C\x44\x72\x6F\x70","\x62\x61\x6C\x6C\x44\x72\x6F\x70\x44\x65\x66\x61\x75\x6C\x74","\x62\x61\x6C\x6C\x47\x72\x61\x76","\x73\x68\x6F\x74\x53\x70\x69\x6E","\x6F\x62\x73\x54\x72\x61\x69\x6C","\x67\x68\x6F\x73\x74\x44\x69\x72","\x67\x68\x6F\x73\x74\x42\x6C\x69\x6E\x6B","\x67\x68\x6F\x73\x74\x54\x69\x63\x6B","\x67\x68\x6F\x73\x74\x46\x72\x61\x6D\x65","\x67\x68\x6F\x73\x74\x58","\x67\x68\x6F\x73\x74\x59","\x67\x68\x6F\x73\x74\x42\x61\x6C\x6C","\x41\x63\x74","\x53\x74\x6F\x70","\x53\x74\x72\x6F\x6B\x65","\x73\x68\x6F\x74\x57\x69\x6E\x64","\x62\x61\x6C\x6C\x53\x74\x61\x6C\x6C","\x73\x68\x6F\x74\x48\x69\x74"];function ObsCollision(_0x157E8){for(fi= 0;fi< objControl[_$_572a[2]][_$_572a[1]][_$_572a[0]];fi++){if(objControl[_$_572a[2]][_$_572a[1]][fi][_$_572a[3]](_0x157E8)){return (true)}};return (false)}function ObsMushroom(_0x155CC,_0x15608,_0x163DC){this[_$_572a[4]]= _0x155CC* 32;this[_$_572a[5]]= 80+ (_0x15608* 32);this[_$_572a[6]]= _0x163DC;this[_$_572a[7]]= 0;this[_$_572a[3]]= function(_0x157E8){tD= calcDistance(this[_$_572a[4]]+ 16,this[_$_572a[5]]+ 16,_0x157E8[_$_572a[4]],_0x157E8[_$_572a[5]]);tR= calcDirection(this[_$_572a[4]]+ 16,this[_$_572a[5]]+ 16,_0x157E8[_$_572a[4]],_0x157E8[_$_572a[5]]);if(valueBetween(this[_$_572a[4]],_0x157E8[_$_572a[4]],this[_$_572a[4]]+ 32)&& valueBetween(this[_$_572a[5]],_0x157E8[_$_572a[5]],this[_$_572a[5]]+ 32)&& _0x157E8[_$_572a[8]]>=  -24&& this[_$_572a[7]]<= 0){if(tD>= 16- (_0x157E8[_$_572a[9]]+ 0.5)){_0x157E8[_$_572a[10]]((this[_$_572a[4]]+ 16)+ xDir(15,tR),(this[_$_572a[5]]+ 16)+ yDir(15,tR),_0x157E8[_$_572a[8]])}else {_0x157E8[_$_572a[10]](_0x157E8[_$_572a[4]],_0x157E8[_$_572a[5]],-25)};if(this[_$_572a[6]]== 1){_0x157E8[_$_572a[11]](2.5,180,-2.5)}else {if(this[_$_572a[6]]== 2){_0x157E8[_$_572a[11]](2.5,0,-2.5)}else {_0x157E8[_$_572a[11]](1,calcDirection(0,0,_0x157E8[_$_572a[4]]- (this[_$_572a[4]]+ 16),0),-2.5)}};playSound(snd_gen_bounce);this[_$_572a[7]]= 30;return (true)}else {return (false)}};this[_$_572a[12]]= function(_0x155CC){drawSprite(spr_golf_mushroom,this[_$_572a[6]],gameCourse,this[_$_572a[4]]- _0x155CC,this[_$_572a[5]]- 16);if(this[_$_572a[7]]> 0){this[_$_572a[7]]--}}}function ObsKabodebitchi(_0x155CC,_0x15608){this[_$_572a[4]]= _0x155CC* 32;this[_$_572a[5]]= 80+ (_0x15608* 32);this[_$_572a[13]]= true;this[_$_572a[14]]= 60;this[_$_572a[15]]= 0;this[_$_572a[3]]= function(_0x157E8){if(!_0x157E8[_$_572a[16]]()&& _0x157E8[_$_572a[17]]!= this && valueBetween(this[_$_572a[4]]+ 4,_0x157E8[_$_572a[4]],this[_$_572a[4]]+ 28) && valueBetween(this[_$_572a[5]]+ 4,_0x157E8[_$_572a[5]],this[_$_572a[5]]+ 28) && _0x157E8[_$_572a[8]]>=  -44){this[_$_572a[15]]= getSec(2.5);_0x157E8[_$_572a[17]]= this;_0x157E8[_$_572a[9]]/= 2;_0x157E8[_$_572a[18]]= _0x157E8[_$_572a[19]]/ 2;_0x157E8[_$_572a[20]]= 0;_0x157E8[_$_572a[21]]=  -1;_0x157E8[_$_572a[22]]= 1;playSound(snd_golf_kabodebitchi);return (true)}else {return (false)}};this[_$_572a[12]]= function(_0x155CC){if(this[_$_572a[13]]){drawSprite(spr_player_shadow,0,0,this[_$_572a[4]]+ 5- _0x155CC,this[_$_572a[5]]+ 14);drawSprite(spr_golf_kabodebitchi,0,0,this[_$_572a[4]]+ 2- _0x155CC,this[_$_572a[5]]- 28+ (this[_$_572a[14]]<= 30))};this[_$_572a[13]]= (!this[_$_572a[13]]|| this[_$_572a[15]]<= 0);if(this[_$_572a[14]]> 0){this[_$_572a[14]]--}else {this[_$_572a[14]]= 60};if(this[_$_572a[15]]> 0){this[_$_572a[15]]--}}}function ObsGhost(_0x155CC,_0x15608,_0x15BA8){this[_$_572a[4]]= _0x155CC* 32;this[_$_572a[5]]= 80+ (_0x15608* 32);this[_$_572a[23]]= _0x15BA8;this[_$_572a[24]]= true;this[_$_572a[25]]= 0;this[_$_572a[26]]=  -1;this[_$_572a[27]]= 0;this[_$_572a[28]]= 0;this[_$_572a[29]]= undefined;this[_$_572a[30]]= function(){if(this[_$_572a[25]]> 0){this[_$_572a[25]]--}else {if(this[_$_572a[26]]< 5){this[_$_572a[26]]++};switch(this[_$_572a[26]]){case 0:this[_$_572a[25]]= 4;playSound(snd_golf_backswing);break;case 1:this[_$_572a[25]]= 15;break;case 2:this[_$_572a[25]]= 1;snd_golf_backswing[_$_572a[31]]();playSound(snd_golf_foreswing);break;case 3:this[_$_572a[25]]= 1;this[_$_572a[29]][_$_572a[32]](calcDistance(this[_$_572a[29]][_$_572a[4]],this[_$_572a[29]][_$_572a[5]],this[_$_572a[4]]+ 144,this[_$_572a[5]]+ 16+ (-96+ (96* this[_$_572a[23]]))- 2.5),calcDirection(this[_$_572a[29]][_$_572a[4]],this[_$_572a[29]][_$_572a[5]],this[_$_572a[4]]+ 144,this[_$_572a[5]]+ 16+ (-96+ (96* this[_$_572a[23]]))),4,-2.5);this[_$_572a[29]][_$_572a[33]]= false;this[_$_572a[29]][_$_572a[22]]= 1;playSound(snd_golf_spooked);break;case 4:this[_$_572a[25]]= 1;break;default:}}};this[_$_572a[3]]= function(_0x157E8){if(_0x157E8[_$_572a[16]]()&&  !_0x157E8[_$_572a[34]]&& valueBetween(this[_$_572a[4]],_0x157E8[_$_572a[4]],this[_$_572a[4]]+ 32)&& valueBetween(this[_$_572a[5]],_0x157E8[_$_572a[5]],this[_$_572a[5]]+ 32)){_0x157E8[_$_572a[34]]= true;this[_$_572a[26]]=  -1;this[_$_572a[25]]= 15;this[_$_572a[29]]= _0x157E8;this[_$_572a[27]]= _0x157E8[_$_572a[4]]- 14;this[_$_572a[28]]= _0x157E8[_$_572a[5]]- 22;return (true)}else {return (false)}};this[_$_572a[12]]= function(_0x155CC){if(this[_$_572a[24]]){drawSprite(spr_golf_ghost_pad,this[_$_572a[23]],0,this[_$_572a[4]]- _0x155CC,this[_$_572a[5]])};this[_$_572a[24]]= (!this[_$_572a[24]]);if(this[_$_572a[26]]>  -1){drawSprite(spr_golf_ghost_shadow,this[_$_572a[26]],0,this[_$_572a[27]]- _0x155CC,this[_$_572a[28]]+ 21);drawSprite(spr_golf_ghost_club,this[_$_572a[26]],0,this[_$_572a[27]]- _0x155CC,this[_$_572a[28]])};if(!objControl[_$_572a[35]]){this[_$_572a[25]]= 0;this[_$_572a[26]]=  -1;this[_$_572a[29]]= undefined}else {if(this[_$_572a[26]]< 5&& this[_$_572a[29]]!= undefined){this[_$_572a[30]]()}}}}