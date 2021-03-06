import assert from "assert";
import log from "../../common/logger";

const assertSnapshot = async (snapper, testName) => {
  log.verbose("snapshotTest", `checking if image ${testName} exists`);
  if (snapper.exists(testName)) {
    log.verbose("snapshotTest", `awaiting new snapshot for test: ${testName}`);
    await snapper.snap(testName);
    log.verbose("snapshotTest", `snapshot for test: ${testName} taken`);
    const diffCount = await snapper.diff(testName);
    log.verbose("snapshotTest", `image dif count is: ${diffCount}`);
    if (diffCount === 0) {
      assert(true, testName);
    } else {
      assert.equal(
        0,
        diffCount,
        "A mismatch has been detected between the baseline and new snapshot. Please review the new snapshot"
      );
    }
  } else {
    await snapper.snap(testName);
    assert(false, "A new snapshot has been created. Please review it");
  }
};

module.exports = { assertSnapshot };
