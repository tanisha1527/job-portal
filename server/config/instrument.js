// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://331edd03b5ff4d89443d3d84a35c862c@o4509464211619840.ingest.us.sentry.io/4509464215420928",
  integrations: [
      Sentry.mongooseIntegration()   
  ],

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

