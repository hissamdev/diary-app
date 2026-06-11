export async function handleEncryption(data: any[]) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const stringData = JSON.stringify(data);
    const encodedData = new TextEncoder().encode(stringData);

    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        Buffer.from(process.env.ENCRYPTION_KEY as string, "base64"),
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"],
    );

    const encryptedData = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        cryptoKey,
        encodedData,
    );

    return {
        encryptedData: Buffer.from(encryptedData).toString("base64"),
        iv: Buffer.from(iv).toString("base64"),
    };
}

export async function handleDecryption(encryptedData: any, iv: any) {
    const key = await crypto.subtle.importKey(
        "raw",
        Buffer.from(process.env.ENCRYPTION_KEY as string, "base64"),
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"],
    );

    try {
        const decryptedData = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: Buffer.from(iv, "base64"),
            },
            key,
            Buffer.from(encryptedData, "base64"),
        );
        console.log(typeof new TextDecoder().decode(decryptedData));
        const str = new TextDecoder().decode(decryptedData);
        const data = JSON.parse(str);
        return data;
    } catch (err) {
        return JSON.stringify({ payload: null, error: err });
    }
}
