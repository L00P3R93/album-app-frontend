import * as crypto from "node:crypto";

export const getGravatarUrl = (email: string, size = 80) => {
    const trimmedEmail = email.trim().toLowerCase();
    const hash = crypto.createHash("md5").update(trimmedEmail).digest("hex");
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=wavatar&r=r`;
}