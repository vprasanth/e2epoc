const fetch = require("node-fetch");
const base = "https://morbo.travel0.net/api/v1";

const reset = async (options) => {
  if (!options) {
    options = {
      useAuth0: false,
      useCustomDomains: true,
      usePopupAlways: false,
      disableRefreshTokens: false,
      forceBiometricValidationOnStart: false,
      enableNativeAuthentication: false,
      lastUpdated: Date.now(),
    };
  }

  const res = await fetch(`${base}/features`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });

  return res.json();
};

module.exports = {
  reset,
};
