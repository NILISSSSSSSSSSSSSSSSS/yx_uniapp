

export class ProjectConfigConst {
    static remindMsgMessageId = "sys_trends_remind";  // 提醒消息的id
    static systemMsgMessageId = "sys_robot_chat";  // 系统消息的id
    
    static getSysIds() {
        return [this.remindMsgMessageId, this.systemMsgMessageId];
    }
    
    static getNoDealIds() {
        return [this.remindMsgMessageId];
    }
}
