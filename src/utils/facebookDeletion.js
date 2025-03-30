import express from "express";
import bodyParser from "body-parser";
import crypto from "crypto";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/data-deletion", (req, res) => {
  try {
    const signedRequest = req.body.signed_request;
    const data = parseSignedRequest(signedRequest);

    if (!data) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    const userId = data.user_id;

    // Start data deletion (replace with your actual deletion logic)
    const statusUrl = "https://www.yourwebsite.com/deletion?id=abc123"; // URL to track deletion
    const confirmationCode = "abc123"; // Unique code for the request

    res.json({
      url: statusUrl,
      confirmation_code: confirmationCode,
    });
  } catch (error) {
    res.status(500).send(err.message);
  }
});

function parseSignedRequest(signedRequest) {
  try {
    const [encodedSig, payload] = signedRequest.split(".", 2);
    const secret = "appsecret"; // Use your app secret here

    // Decode the data
    const sig = base64UrlDecode(encodedSig);
    const data = JSON.parse(base64UrlDecode(payload));

    // Verify the signature
    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest();

    if (!crypto.timingSafeEqual(Buffer.from(sig), expectedSig)) {
      console.error("Bad Signed JSON signature!");
      return null;
    }

    return data;
  } catch (error) {
    res.status(500).send(err.message);
  }
}

function base64UrlDecode(input) {
  try {
    return Buffer.from(
      input.replace(/-/g, "+").replace(/_/g, "/"),
      "base64"
    ).toString();
  } catch (error) {
    res.status(500).send(err.message);
  }
}

export default router;
