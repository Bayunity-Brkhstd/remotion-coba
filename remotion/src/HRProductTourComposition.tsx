import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { HRHookScene } from "./components/hr-tour/HRHookScene";
import { HRDashboardOverviewScene } from "./components/hr-tour/HRDashboardOverviewScene";
import { HRClaimLeaveScene } from "./components/hr-tour/HRClaimLeaveScene";
import { HRPayrollTourScene } from "./components/hr-tour/HRPayrollTourScene";
import { HRSplitClaimScene } from "./components/hr-tour/HRSplitClaimScene";
import { HROrgChartScene } from "./components/hr-tour/HROrgChartScene";
import { HRAnalyticsScene } from "./components/hr-tour/HRAnalyticsScene";
import { HREcosystemScene } from "./components/hr-tour/HREcosystemScene";
import { HROutroScene } from "./components/hr-tour/HROutroScene";

export const HRProductTourComposition: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070b14",
        color: "#ffffff",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* Act 1: Hook with UI Card Gap & Radial Zoom Punch (0s - 4.5s) */}
      <Sequence from={0} durationInFrames={135}>
        <HRHookScene />
      </Sequence>

      {/* Act 2: Full Dashboard Tour Overview (4.5s - 9.5s) */}
      <Sequence from={135} durationInFrames={150}>
        <HRDashboardOverviewScene />
      </Sequence>

      {/* Act 3: Claim 1 (Brand Field) - Instant Leave Approvals (9.5s - 14.0s) */}
      <Sequence from={285} durationInFrames={135}>
        <HRClaimLeaveScene />
      </Sequence>

      {/* Act 4: Tour 2 - Live Payroll Calculation & Tax Sync (14.0s - 19.5s) */}
      <Sequence from={420} durationInFrames={165}>
        <HRPayrollTourScene />
      </Sequence>

      {/* Act 5: Claim 2 (52/48 Split Screen) - 1-Click Payroll (19.5s - 24.5s) */}
      <Sequence from={585} durationInFrames={150}>
        <HRSplitClaimScene />
      </Sequence>

      {/* Act 6: Tour 3 - Interactive Org Chart & Talent Node (24.5s - 30.0s) */}
      <Sequence from={735} durationInFrames={165}>
        <HROrgChartScene />
      </Sequence>

      {/* Act 7: Claim 3 - People Analytics Data & Retention (30.0s - 35.5s) */}
      <Sequence from={900} durationInFrames={165}>
        <HRAnalyticsScene />
      </Sequence>

      {/* Act 8: Unified HR Ecosystem Convergence (35.5s - 41.0s) */}
      <Sequence from={1065} durationInFrames={165}>
        <HREcosystemScene />
      </Sequence>

      {/* Act 9: Brand Outro & CTA (41.0s - 45.0s) */}
      <Sequence from={1230} durationInFrames={120}>
        <HROutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
