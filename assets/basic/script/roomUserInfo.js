var mvs = require("Matchvs");
cc.Class({
    extends: cc.Component,
    properties: {
        userName: {
            default: null,
            type: cc.Label
        },
        fangzhuNode: {
            default: null,
            type: cc.Node
        },
        kick: {
            default: null,
            type: cc.Node
        },
        userIcon: {
            default: null,
            type: cc.Sprite
        }
    },

    init: function() {
        this.userName.string = '';
        this.fangzhuNode.active = false;
        this.kick.active = false;
        this.kick.on("click", this.kickPlayer, this);
        this.userId = 0;
        this.userIcon.spriteFrame = null;
        clientEvent.on(clientEvent.eventType.playerAccountGet, this.userInfoSet, this);
    },

    setData: function(userId, ownerId) {
        this.userId = userId;
        if (this.userId === ownerId) {
            this.fangzhuNode.active = true;
        } else {
            this.fangzhuNode.active = false;
        }
        this.userName.string = this.userId;

        if (!GLB.isRoomOwner || this.userId === GLB.userInfo.id) {
            this.kick.active = false;
        } else {
            this.kick.active = true;
        }
        Game.GameManager.userInfoReq(this.userId);
    },

    userInfoSet: function(recvMsg) {
        console.log("recvMsg:" + recvMsg);
        if (recvMsg.account == this.userId) {
            console.log("set user info");
            console.log(recvMsg);
            this.userName.string = recvMsg.userName;
            if (recvMsg.headIcon && recvMsg.headIcon !== "-") {
                cc.loader.load({url: recvMsg.headIcon, type: 'png'}, function(err, texture) {
                    var spriteFrame = new cc.SpriteFrame(texture, cc.Rect(0, 0, texture.width, texture.height));
                    if(this.userIcon) {
                        this.userIcon.spriteFrame = spriteFrame;
                    }
                }.bind(this));
            }
        }
    },

    onDestroy() {
        clientEvent.off(clientEvent.eventType.playerAccountGet, this.userInfoSet, this);
    },

    kickPlayer: function() {
        mvs.engine.kickPlayer(this.userId, "kick");
    }
});
