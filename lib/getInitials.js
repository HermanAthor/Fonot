export function getInitials(name) {
  if (name) {
    name = name.trim();
    const spaceIndex = name.indexOf(" ");
    if (spaceIndex !== -1) {
      return name.charAt(0) + name.charAt(spaceIndex + 1);
    } else {
      return name.substring(0, 2);
    }
  } else {
    return "FO";
  }
}
