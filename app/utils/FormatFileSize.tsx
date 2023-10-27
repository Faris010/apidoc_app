export const formatFileSize = (size: number): string => {
  const units = ['B', 'KB', 'MB'];
  const k = 1024;
  for (const unit of units) {
    if (size <= k) {
      return size.toFixed(2) + ' ' + unit;
    } else {
      size = size / k;
    }
  }
  return '';
};
