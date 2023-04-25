import { createHash, randomBytes } from "crypto";
import { PrivacyStatus } from "./privacy-status.enum";
import { BadRequestException, Logger } from "@nestjs/common";
import path from "path";

export class FileMetadata {
    originalName?: string;
    encoding?: string;
    mimetype?: string;
    md5?: string;

    owner: string;
    ownersGroup: string[];
    privacyStatus: PrivacyStatus;
    shareLink: string;


    constructor(file: Express.Multer.File, owner?: string, status?: PrivacyStatus, link?: string){
        this.originalName = file.originalname;
        this.encoding = file.encoding;
        this.mimetype = file.mimetype;
        this.owner = owner ? owner : null;
        this.ownersGroup = owner ? [owner] : null;
        this.privacyStatus = status ? status : PrivacyStatus.PRIVATE;
        this.shareLink = link ? link : null;

        this.createMd5(file.buffer);
    }

    private createMd5(buffer: Buffer): void {
        if(!buffer) {
            Logger.debug("buffer is not definded", `${FileMetadata.name}.${this.createMd5.name}`)
            return;
        }
        
        this.md5 = createHash("md5").update(buffer).digest("hex");
    }
}