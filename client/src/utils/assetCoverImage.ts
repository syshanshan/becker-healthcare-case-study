import behavioralHealthCover from "../assets/Behavioral Health Integration.png";
import cfoStrategiesCover from "../assets/CFO Strategies.png";
import cybersecurityCover from "../assets/cybersecurity.png";
import ehrOptimizationCover from "../assets/EHR Optimization.png";
import futureOfAiCover from "../assets/The Future of AI.png";
import improvingPatientExperienceCover from "../assets/Improving Patient Experience.png";
import nursingWorkforceCover from "../assets/Nursing Workforce.png";
import operationalEfficiencyCover from "../assets/Operational Efficiency.png";
import revenueCycleCover from "../assets/Revenue Cycle.png";
import supplyChainResilienceCover from "../assets/Supply Chain Resilience.png";
import type { LeadGenAsset } from "../types";

/** Editorial cover photos keyed by asset title (from API data). */
const COVER_BY_ASSET_NAME: Record<string, string> = {
  "The Future of AI in Clinical Decision Support": futureOfAiCover,
  "CFO Strategies for Capital Investment in 2026": cfoStrategiesCover,
  "Cybersecurity Preparedness for Health Systems": cybersecurityCover,
  "EHR Optimization: Getting More Value from Your Investment": ehrOptimizationCover,
  "Operational Efficiency Through Lean Management in Hospitals":
    operationalEfficiencyCover,
  "Revenue Cycle Optimization in a Post-Pandemic World": revenueCycleCover,
  "Nursing Workforce Crisis: Retention Strategies That Work": nursingWorkforceCover,
  "Supply Chain Resilience for Health Systems": supplyChainResilienceCover,
  "Improving Patient Experience Scores: A Data-Driven Approach":
    improvingPatientExperienceCover,
  "Behavioral Health Integration in Primary Care": behavioralHealthCover,
};

export function assetCoverImage(
  asset: Pick<LeadGenAsset, "name">
): string | undefined {
  return COVER_BY_ASSET_NAME[asset.name];
}
