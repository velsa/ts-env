import { expect } from "chai";
import env from "./index";

describe("check edge conditions", () => {
  it("checks that no var throws error", () => {
    try {
      env("NO_SUCH_VAR");
    } catch (err) {
      expect(err.message).to.equal(
        "ENV ERROR: NO_SUCH_VAR is not defined and has no default",
      );
    }
  });
  it("checks that not allowed var throws error", () => {
    process.env["VAR_NOT_ALLOWED_VAL"] = "bad value";
    try {
      env("VAR_NOT_ALLOWED_VAL", { allowed: ["good value"] });
    } catch (err) {
      expect(err.message).to.equal(
        'ENV ERROR: VAR_NOT_ALLOWED_VAL not is allowed, "bad value" is not in ["good value"]',
      );
    }
  });
});

describe("checks basic functionality", () => {
  it("assigns correct string values", () => {
    process.env["STRING_VAR"] = "string value";
    const val = env("STRING_VAR");
    expect(val).to.equal("string value");
    expect(val).to.be.string;
  });
  it("assigns correct number values", () => {
    process.env["NUMBER_VAR"] = "12";
    const val = env("NUMBER_VAR", { default: 0 });
    expect(val).to.equal(12);
    expect(typeof val).to.equal("number");
  });
  it("assigns correct boolean values", () => {
    process.env["BOOLEAN_VAR"] = "yes";
    const val = env("BOOLEAN_VAR", { default: false });
    expect(val).to.equal(true);
    expect(typeof val).to.equal("boolean");
  });
  it("uses default", () => {
    const val = env("NO_SUCH_VAR", { default: "cake" });
    expect(val).to.equal("cake");
  });
});
