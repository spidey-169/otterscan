// reportWebVitals.ts
import type { MetricType } from "web-vitals";

const reportWebVitals = (onPerfEntry?: (metric: MetricType) => void) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    import("web-vitals").then((webVitals) => {
      webVitals.onCLS(onPerfEntry);
      webVitals.onFID(onPerfEntry);
      webVitals.onFCP(onPerfEntry);
      webVitals.onLCP(onPerfEntry);
      webVitals.onTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

