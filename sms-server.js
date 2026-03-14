const http = require("http");
const https = require("https");
const qs = require("querystring");

const AT_KEY  = "atsk_421a93ad27315ef4ba93c320f6a279d8b25f0f314f9c65bd2f1ee3a05631499eed0952a5";
const AT_USER = "xihluke";
const PORT    = process.env.PORT || 3333;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.writeHead(200); res.end(); return; }

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "RescueAI SMS Server running" }));
    return;
  }

  if (req.method === "POST" && req.url === "/send-sms") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        const { to, message } = JSON.parse(body);
        console.log(`\n📡 Sending SMS to ${to}...`);
        const payload = qs.stringify({ username: AT_USER, to, message });
        const options = {
          hostname: "api.africastalking.com",
          path: "/version1/messaging",
          method: "POST",
          headers: {
            "apiKey": AT_KEY,
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
            "Content-Length": Buffer.byteLength(payload)
          }
        };
        const atReq = https.request(options, atRes => {
          let data = "";
          atRes.on("data", c => data += c);
          atRes.on("end", () => {
            console.log("✅ AT Response:", data);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, response: JSON.parse(data) }));
          });
        });
        atReq.on("error", err => {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: err.message }));
        });
        atReq.write(payload);
        atReq.end();
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  res.writeHead(404); res.end("Not found");
});

server.listen(PORT, () => {
  console.log("🚨 RescueAI SMS Server running on port " + PORT);
});
