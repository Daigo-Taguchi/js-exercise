export function isEmailAddress(email?: string | null) {
  if (!email) {
    return false;
  }
  // const match = email.match(
  //   /^[A-Za-z0-9!#$%&'*+-/=?^_`{|}~]+(?!\.\.)(\.[A-Za-z0-9!#$%&'*+-/=?^_`{|}~]+)*@/
  // );

  const localPartPattern =
    /^(?!.*\.\.)[A-Za-z0-9!#$%&'*+-/=?^_`{|}~]+(\.[A-Za-z0-9!#$%&'*+-/=?^_`{|}~]+)*@[A-Za-z0-9!#$%&'*+-/=?^_`{|}~]+/;

  const match = email.match(localPartPattern);
  console.log(match);

  if (!match) {
    return false;
  }

  // マッチした文字列を @ で分割して、前方が local-part
  const localPart = match[0].split("@")[0];
  console.log(`localPart ${localPart.length} 文字`);
  const domain = match[0].split("@")[1];
  console.log(`domain ${domain.length} 文字`);

  // local-part は最大64文字
  if (!(localPart.length <= 64)) {
    return false;
  }

  // 全体で最大253文字
  if (!(domain.length <= 253)) {
    return false;
  }

  return true;
}
