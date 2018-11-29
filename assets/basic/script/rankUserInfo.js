cc.Class({
    extends: cc.Component,

    properties: {
        rankCntLb: cc.Label,
        userNameLb: cc.Node,
        userIcon: cc.Sprite,
        userScoreLb: cc.Label,
        spriteBg:cc.Sprite,
        frameBg:cc.SpriteFrame
    },

    setData(rankIndex, data) {
        if (data.selfFlag) {
            this.userNameLb.color = new cc.Color(182,65,24);
            this.spriteBg.spriteFrame = this.frameBg;
        }
        if (this.rankCntLb) {
            this.rankCntLb.string = rankIndex + 1;
        }
        this.userNameLb.getComponent(cc.Label).string = data.nick;
        cc.loader.load({url: data.url, type: 'png'}, function(err, texture) {
            var spriteFrame = new cc.SpriteFrame(texture, cc.Rect(0, 0, texture.width, texture.height));
            if(this.userIcon) {
                this.userIcon.spriteFrame = spriteFrame;
            }
        }.bind(this));
        this.userScoreLb.string = data.score;
    }
});
