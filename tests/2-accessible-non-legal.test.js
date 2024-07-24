import { describe, it, expect } from "vitest";

/*
This is what we call an LLM-based test.

We define a criterion in natural language and then use Poyro's matcher
to evaluate it. The matcher uses an LLM to evaluate.
*/

describe("2. understandable to non-legal staff", () => {
  /* This time we define our assertion in natural language. This is
     necessary since it's hard to capture the question of "understanable"
     in code.
  */
  const criterion = "The provided legal reasoning should be understandable to a person with a bachelor's degree, basic business understanding, but without a legal background.";

  /* We provide additional explanation for the criterion. The more specific
     a natural language criterion is the better the LLM will know how to interpret
     it.
  */
  const additionalContext = `Here are some qualities of text accessible to non-legal persons to consider:

- It avoids using legal jargon.
- It uses short sentences that aren't overly structured to convey a precise legal point.
- It should use an approachable tone rather than a terse one.

Here are some qualities of a person with basic business understanding:
- They will understand basic business concepts like buying, selling, contracts, etc.
- They may not understand business jargon.`


  it("original: should create accessible reasoning for section 4", async () => {

    // In a real use case this would come from a function, an LLM call
    const originalReasoning = "Non-binding estimates can lead to significant cost overruns, which may deter the Buyer from engaging in customization and integration services. Providing binding estimates will encourage the Buyer to proceed with these services, benefiting the Seller.";

    // toFulfillCriterion is custom, LLM based matcher from Poyro
    await expect(originalReasoning).toFulfillCriterion(
      criterion,
      additionalContext,
    );

    /* Under the hood this is the returned reasoning:

    {
      "feedback": "The response uses legal jargon ('binding estimates', 'customization and integration services') that may not be understandable to a person with basic business understanding. The tone is also formal, which may not be approachable for non-legal persons. The language is structured and precise, but not overly concise. Overall, the response does not meet the criterion of being understandable to a person with a bachelor's degree, basic business understanding, but without a legal background. False",
      "result": false
    }

    */

  }, 10000);

  it("updated: should create accessible reasoning for section 4", async () => {

    // In a real use case this would come from a function, an LLM call
    const updatedReasoning = "If the seller and buyer do not have a way to agree on the cost of the seller's services ahead of time, the buyer may be relunctant to purchase these services.";

    // toFulfillCriterion is custom, LLM based matcher from Poyro
    await expect(updatedReasoning).toFulfillCriterion(
      criterion,
      additionalContext,
    );

    /* Under the hood this is the returned reasoning:

    {
      "feedback": "The response avoids using legal jargon and uses a clear, concise tone. It also conveys a precise point about the potential reluctance of a buyer to purchase services without prior agreement on cost. The language is approachable and easy to understand for someone with basic business understanding. Therefore, [True].",
      "result": true
    }

    */

  }, 10000);

});