import { inject, injectable } from "tsyringe";

import { IDialogueChatBot } from "@spt/helpers/Dialogue/IDialogueChatBot";
import { ISendMessageRequest } from "@spt/models/eft/dialog/ISendMessageRequest";
import { IUserDialogInfo } from "@spt/models/eft/profile/IUserDialogInfo";
import { MemberCategory } from "@spt/models/enums/MemberCategory";
import { MailSendService } from "@spt/services/MailSendService";

//    \/   dont forger this annotation here!
@injectable()
export class CustomChatBot implements IDialogueChatBot
{
    constructor(
        @inject("MailSendService") protected mailSendService: MailSendService,
    )
    {}

    public getChatBot(): IUserDialogInfo
    {
        return {
            _id: "67ef84ce62cf8a878c2281ff",
            aid: 67842477094416,
            Info: {
                Level: 70,
                SelectedMemberCategory: MemberCategory.TRADER,
                MemberCategory: MemberCategory.TRADER,
                Nickname: "Pal",
                Side: "Usec"
            }
        };
    }

    public handleMessage(sessionId: string, request: ISendMessageRequest): string
    {
        this.mailSendService.sendUserMessageToPlayer(
            sessionId,
            this.getChatBot(),
            `Im buddy! I just reply back what you typed to me!:\n${request.text}`
        );
        return request.dialogId;
    }
}
