import { Sxp } from "../crypto/sxp"
import { Evmos } from "../crypto/evmos"


test("createSign", () => {
    const key = "57c3bd053996699a543254cbcfaff98d8a6986ab6e4184c210c4103ebda0375c";
    const pubkey = Buffer.from("037d1a42e90f42b0d8df3d9ef01a405f336d96af4678a17d5f1cbb79d30713ff9c", "hex");
    const hash = "4f9f7741f163b4d80a5d1cd735a9ebefd12adb83d8d26a70eb7bdd3161329e18";
    const sign = Sxp.signSchnorr(hash,key);
    let b = Sxp.verifySchnorr(hash,sign,pubkey);
    console.log(b);
    console.log("test-sign:",sign)
    console.log("c83e9856d93eb1e0065a5d5bd0d3eaac4fd5c3772763e40e53f6395f4d98ab1cc6e55a382499459ba8b83a002abccdd2779bc15774b28dac43f54219180072ae")
});

test("createEvmosSign", () => {
    // const s = Evmos.signTransaction("evmos1e7xzv2jqw0dz8u407kxqjk9srd55rgrmcrkyy6","evmos1nelrqxjs2ssclpmcjurjk3m2njn65mfyf5x4y7","1000000000000000","aevmos","","2500000000000000",100000,"secp256k1","a14ed172d9900ae696749a2bc9b767a0f38b0d1e1ffdd70230cee3b460799393",1,1860737,"evmos_9001-2");
    const s = Evmos.signSchnorr("evmos1e7xzv2jqw0dz8u407kxqjk9srd55rgrmcrkyy6","evmos1nelrqxjs2ssclpmcjurjk3m2njn65mfyf5x4y7","1000000000000000","aevmos","","2500000000000000",100000,"ethsecp256k1","a14ed172d9900ae696749a2bc9b767a0f38b0d1e1ffdd70230cee3b460799393",1,1860737,"evmos_9001-2");
    console.log(s)
});