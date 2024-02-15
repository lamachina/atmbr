const BASE_BYTES = 10;
const INPUT_BYTES_BASE = 148;
const OUTPUT_BYTES_BASE = 34;
const OP_RETURN_BYTES: number = 20;

export interface FeeCalculations {
  commitAndRevealFee: number;
  commitFeeOnly: number;
  revealFeeOnly: number;
}

export const calculateAmountRequiredForReveal = (
  hashLockP2TROutputLen: number,
  satsbyte: number
): number => {
  const ARGS_BYTES = 20;
  const BITWORK_BYTES = 5 + 10 + 4 + 10 + 4 + 10 + 1 + 10;
  const EXTRA_BUFFER = 10;

  return (
    (satsbyte as any) *
    (BASE_BYTES +
      INPUT_BYTES_BASE +
      OP_RETURN_BYTES +
      ARGS_BYTES +
      BITWORK_BYTES +
      EXTRA_BUFFER +
      hashLockP2TROutputLen)
  );
};

export const calculateFeesRequiredForCommit = (satsbyte: number): number => {
  return (satsbyte as any) * (BASE_BYTES + 1 * INPUT_BYTES_BASE + 1 * OUTPUT_BYTES_BASE);
};

export const calculateFeesRequiredForAccumulatedCommitAndReveal = (
  hashLockP2TROutputLen: number,
  satsbyte: number
): FeeCalculations => {
  const revealFee = calculateAmountRequiredForReveal(hashLockP2TROutputLen, satsbyte);
  const commitFee = calculateFeesRequiredForCommit(satsbyte);
  const commitAndRevealFee = commitFee + revealFee;

  const ret = {
    commitAndRevealFee,
    commitFeeOnly: commitFee,
    revealFeeOnly: revealFee,
  };
  return ret;
};
