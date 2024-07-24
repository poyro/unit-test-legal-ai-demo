import { describe, it, expect } from "vitest";
import { outputFulfillsCriterion } from "@poyro/vitest/fn";


describe("3. it should generate acceptable replacement clauses", () => {

  const sectionText = "Customization and integration services will be provided at an hourly rate of $300. The Seller does not cap the total cost for these services, and estimates provided prior to the commencement of work are non-binding. The Buyer agrees to pay for all customization and integration services upon invoice, irrespective of the project completion status.";


  it("3.a. - should return a clause that doesn't contract rest of section", async () => {

    /* In real app this would be created by function leveraging LLM call.
       Note it's the same as above minus the last sentence.
    */
    const sectionTextMinusBadClause = "Customization and integration services will be provided at an hourly rate of $300. The Seller does not cap the total cost for these services, and estimates provided prior to the commencement of work are non-binding.";

    // Again, in real app this comes from the application using LLM call.
    const replacementClause = "The Buyer agrees to pay for all customization and integration services upon invoice, with payment due within 30 days of the invoice date. The Seller will provide binding estimates prior to the commencement of work to ensure cost predictability for the Buyer.";

    await expect(replacementClause).toFulfillCriterion(
      "does not contradict any of the text passed in the additional context",
      sectionTextMinusBadClause,
    );

    /* Under the hood the reasoning:
      {
        "feedback": "The response correctly states that the Seller will provide binding estimates prior to work commencement, which contradicts the original instruction. The instruction mentioned non-binding estimates. Therefore, the response does not meet the criterion.",
        "result": false
      }
    */


  }, 10000);

  it("3.b. - should return a clause that is attributable to a best practice", async () => {
    // In practice this would be pulled from a database or text file of best practices
    const bestPractices = [
      "The contract must establish a structured dispute resolution framework.",
      "The contract must secure comprehensive warranty coverage and support terms.",
      "The contract must ensure financial clarity and planning accuracy regarding costs."
    ]

    // Again, in real app this comes from the application using LLM call.
    const replacementClause = "The Buyer agrees to pay for all customization and integration services upon invoice, with payment due within 30 days of the invoice date. The Seller will provide binding estimates prior to the commencement of work to ensure cost predictability for the Buyer.";

    let matchFound = false;

    for (let bestPractice of bestPractices) {
      /* This function is provided by Poyro. It's the functional version of the matcher.
         Since it's not a matcher it does not fail on assertion failure so we can run in a loop.
      */
      const result = await outputFulfillsCriterion(
        replacementClause,
        "LLM output must be attributable to best practice described in additional context",
        bestPractice
      );
      matchFound = result.result;

      console.log("### Best Practice: ", bestPractice);
      console.log(result);

  
      /* We only care about finding one match. 
         This will match on third best practice.
      */
      if (matchFound) {
        break;
      }
    }
  
    expect(matchFound).toBe(true);

  }, 10000);

});