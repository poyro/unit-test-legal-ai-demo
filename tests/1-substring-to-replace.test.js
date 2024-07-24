import { vi, describe, it, expect } from "vitest";
import {calculateOverlapPercentage} from "../utils/calculateOverlaps"

/*
This is what we call a CODE-BASED TEST.

We define a function like we would with classic unit testing and use that
to write an assertion.
*/

describe("1. predicted substrings should match expected", () => {
  // This is a design choice
  const minOverlap = 0.8;

  // Create a mock function that detects risky span
  const extractProblematicClauses = vi.fn();
  extractProblematicClauses.mockReturnValue([[216, 347]]); //only one problem clause in section

  it("detects the right risky clause substring in section 4", () => {
    const sectionText = "Customization and integration services will be provided at an hourly rate of $300. The Seller does not cap the total cost for these services, and estimates provided prior to the commencement of work are non-binding. The Buyer agrees to pay for all customization and integration services upon invoice, irrespective of the project completion status.";

    // Compare the actual substring vs. predicted using function
    const actualSubtringIdx = [83, 347];
    const predictedSubstringIdx = extractProblematicClauses(sectionText)[0];
    const percentageOverlap = calculateOverlapPercentage(
      actualSubtringIdx,
      predictedSubstringIdx,
    );

    // Print out results to understand
    const [actualStart, actualEnd] = actualSubtringIdx;
    const [predictedStart, predictedEnd] = predictedSubstringIdx;

    console.log("### ACTUAL SUBSTRING: \n", sectionText.slice(actualStart, actualEnd), "\n");
    console.log("### PREDICTED SUBSTRING: \n", sectionText.slice(predictedStart, predictedEnd), "\n");
    console.log("### OVERLAP PERCENTANGE: \n", percentageOverlap);

    // regular vitest matcher -- this is the actual assertion
    expect(percentageOverlap).toBeGreaterThanOrEqual(minOverlap);

  }, 10000);

});