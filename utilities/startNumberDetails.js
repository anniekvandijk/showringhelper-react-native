function startNumberDetails(ringNumbers, startNumber) {

  if (!ringNumbers) {
    return null;
  }
  const showNumbers = ringNumbers && ringNumbers.filter(x => x.showId === startNumber.showId);
  if (showNumbers.length === 0) {
    return null;
  }
  const arrayOfNumbers = showNumbers && showNumbers[0].ringnumbers;
  if (showNumbers.length === 0) {
    return null;
  }
  const detailValues = arrayOfNumbers && arrayOfNumbers.filter(x => x.number === startNumber.value);
  if (detailValues.length === 0) {
    return null;
  }
  const arrayOfDetails = detailValues && detailValues[0].values;
  if (arrayOfDetails.length === 0) {
    return null;
  }
  return arrayOfDetails;
}

export default startNumberDetails;
