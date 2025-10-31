// Extracts the media URL from a Sitecore rendering parameter string
export function extractMediaUrl(param: string | undefined): string | undefined {
  const mediaUrlPattern = /mediaurl="([^"]*)"/i;
  if (param && mediaUrlPattern.test(param)) {
    return param.match(mediaUrlPattern)?.[1] || '';
  }
  return undefined;
}
