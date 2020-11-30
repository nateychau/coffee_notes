export const shortName = (name, length) => {
  if(name.length > length){
    return `${name.slice(0, length)}...`;
  } else {
    return name;
  }
}