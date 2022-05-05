import { Sxp } from "../crypto/sxp"
import { Evmos } from "../crypto/evmos"


test("createSign", () => {
    // const key = Buffer.from("57c3bd053996699a543254cbcfaff98d8a6986ab6e4184c210c4103ebda0375c", "hex");
    const pubkey = Buffer.from("037d1a42e90f42b0d8df3d9ef01a405f336d96af4678a17d5f1cbb79d30713ff9c", "hex");
    const hash = Buffer.from("6481838ac998383599ece5ba0e9ca46992f3f75f30a9ad1d328e4fc693af2108", "hex");
    const sign = Sxp.signSchnorr(Buffer.from("6481838ac998383599ece5ba0e9ca46992f3f75f30a9ad1d328e4fc693af2108"),"57c3bd053996699a543254cbcfaff98d8a6986ab6e4184c210c4103ebda0375c");
    let b = Sxp.verifySchnorr(hash,sign,pubkey);
    console.log(b);
    console.log("ec4670f05feb43b060e025321f3c08ce2bcec131eae656558afa0c71e97b9c757d53288538185de87cd4d626a55bbdb9311d83ef492078c7c63d4fdb72ea2b53")
});

test("createEvmosSign", () => {
    // const s = Evmos.signTransaction("evmos1e7xzv2jqw0dz8u407kxqjk9srd55rgrmcrkyy6","evmos1nelrqxjs2ssclpmcjurjk3m2njn65mfyf5x4y7","1000000000000000","aevmos","","2500000000000000",100000,"secp256k1","a14ed172d9900ae696749a2bc9b767a0f38b0d1e1ffdd70230cee3b460799393",1,1860737,"evmos_9001-2");
    const s = Evmos.signTransaction("evmos1e7xzv2jqw0dz8u407kxqjk9srd55rgrmcrkyy6","evmos1nelrqxjs2ssclpmcjurjk3m2njn65mfyf5x4y7","1000000000000000","aevmos","","2500000000000000",100000,"ethsecp256k1","a14ed172d9900ae696749a2bc9b767a0f38b0d1e1ffdd70230cee3b460799393",1,1860737,"evmos_9001-2");
    console.log(s)
});